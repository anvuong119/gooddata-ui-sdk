// (C) 2019 GoodData Corporation
import React from "react";
import { withExecution } from "./withExecution";
import { WithLoadingResult, IWithLoadingEvents } from "./withLoading";
import {
    attributeLocalId,
    AttributeOrMeasure,
    DimensionItem,
    IAttribute,
    IDimension,
    IFilter,
    isAttribute,
    ITotal,
    MeasureGroupIdentifier,
    newDimension,
    newTwoDimensional,
    SortItem,
} from "@gooddata/sdk-model";
import { IAnalyticalBackend, IPreparedExecution } from "@gooddata/sdk-backend-spi";
import isEmpty = require("lodash/isEmpty");
import { withContexts } from "../base";
import { InvariantError } from "ts-invariant";

/**
 * @public
 */
export interface IExecutorProps extends IWithLoadingEvents<IExecutorProps> {
    /**
     * Backend to execute against.
     *
     * Note: the backend must come either from this property or from BackendContext. If you do not specify
     * backend here, then the executor MUST be rendered within an existing BackendContext.
     */
    backend?: IAnalyticalBackend;

    /**
     * Workspace in whose context to perform the execution.
     *
     * Note: the workspace must come either from this property or from WorkspaceContext. If you do not specify
     * workspace here, then the executor MUST be rendered within an existing WorkspaceContext.
     */
    workspace?: string;

    /**
     * Child component to which rendering is delegated. This is a function that will be called
     * every time state of execution and data loading changes.
     *
     * @param executionResult - execution result, indicating state and/or results
     */
    children: (executionResult: WithLoadingResult) => React.ReactElement | null;

    /**
     * Data series will be built using the provided measures that are optionally further scoped for
     * elements of the specified attributes.
     */
    seriesBy: AttributeOrMeasure[];

    /**
     * Optionally slice all data series by elements of these attributes.
     */
    slicesBy?: IAttribute[];

    /**
     * Optionally include these totals among the data slices.
     */
    totals?: ITotal[];

    /**
     * Optional filters to apply on server side.
     */
    filter?: IFilter[];

    /**
     * Optional sorting to apply on server side.
     */
    sortBy?: SortItem[];

    /**
     * Indicates whether the executor should trigger execution and loading right after it is
     * mounted. If not specified defaults to `true`.
     *
     * If set to `false`, then the {@link WithLoadingResult#reload} function needs to be called
     * to trigger the execution and loading.
     */
    loadOnMount?: boolean;
}

type Props = IExecutorProps & WithLoadingResult;

const CoreExecutor: React.FC<Props> = (props: Props) => {
    const { children, error, isLoading, reload, result } = props;

    return children({
        error,
        isLoading,
        reload,
        result,
    });
};

/**
 * When caller desires just data series and no slicing, create a single-dim result.
 */
function seriesOnlyDim(seriesBy: AttributeOrMeasure[]): IDimension[] {
    return [
        newDimension(
            seriesBy
                .filter(isAttribute)
                .map(attributeLocalId)
                .concat(MeasureGroupIdentifier),
        ),
    ];
}

/**
 * When caller desires data series to be sliced further by some attributes (and perhaps with totals as well)
 * then create two-dim result resembling a pivot table:
 *
 * -  slices are in rows (first dim)
 * -  measures & scoping attributes will be in columns (second dim)
 */
function seriesAndSlicesDim(
    seriesBy: AttributeOrMeasure[],
    slices: IAttribute[],
    totals: ITotal[],
): IDimension[] {
    const firstDimItems: DimensionItem[] = slices.map(attributeLocalId);
    firstDimItems.push(...totals);

    return newTwoDimensional(
        firstDimItems,
        seriesBy
            .filter(isAttribute)
            .map(attributeLocalId)
            .concat(MeasureGroupIdentifier),
    );
}

function createExecution(props: IExecutorProps): IPreparedExecution {
    const { backend, workspace, seriesBy, slicesBy = [], filter = [], sortBy = [], totals = [] } = props;

    if (!backend || !workspace) {
        throw new InvariantError(
            "backend and workspace must be either specified explicitly or be provided by context",
        );
    }

    const dimensions = isEmpty(slicesBy)
        ? seriesOnlyDim(seriesBy)
        : seriesAndSlicesDim(seriesBy, slicesBy, totals);

    return backend
        .workspace(workspace)
        .execution()
        .forItems(seriesBy.concat(slicesBy), filter)
        .withSorting(...sortBy)
        .withDimensions(...dimensions);
}

/**
 * The executor provides a more curated experience to obtain and work with data from backends. It is aligned
 * with the `DataAccess` infrastructure which exposes the underlying data as data series that can be
 * optionally sliced by additional attributes.
 *
 * Once the executor finishes, the `DataViewFacade.data()` method will expose the data as series and
 * slices according to the specification to the executor.
 *
 * @remarks see `IDataAccessMethods` for additional documentation
 * @public
 */
export const Executor = withContexts(
    withExecution<IExecutorProps>({
        execution: createExecution,
        events: (props: IExecutorProps) => {
            const { onError, onLoadingChanged, onLoadingFinish, onLoadingStart } = props;

            return {
                onError,
                onLoadingChanged,
                onLoadingFinish,
                onLoadingStart,
            };
        },
        shouldRefetch: (prevProps: IExecutorProps, nextProps: IExecutorProps) => {
            const relevantProps: Array<keyof IExecutorProps> = [
                "seriesBy",
                "slicesBy",
                "totals",
                "filter",
                "sortBy",
                "onError",
                "onLoadingChanged",
                "onLoadingFinish",
                "onLoadingStart",
            ];

            return relevantProps.some(propName => prevProps[propName] !== nextProps[propName]);
        },
        loadOnMount: (props?: IExecutorProps) => {
            const { loadOnMount = true } = props ?? {};

            return loadOnMount;
        },
    })(CoreExecutor),
);
