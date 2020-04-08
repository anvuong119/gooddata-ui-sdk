// (C) 2019-2020 GoodData Corporation
import {
    IAttributeDescriptor,
    IDataView,
    IDimensionDescriptor,
    IMeasureDescriptor,
    IMeasureGroupDescriptor,
    IResultAttributeHeader,
    IResultHeader,
    IResultMeasureHeader,
    isAttributeDescriptor,
    isMeasureGroupDescriptor,
    isResultAttributeHeader,
    isResultMeasureHeader,
} from "@gooddata/sdk-backend-spi";
import { dataViewDimensionItems, dataViewHeaders, measureGroupItems } from "./utils";
import { attributeLocalId, IAttribute, IMeasure, measureLocalId } from "@gooddata/sdk-model";
import keyBy = require("lodash/keyBy");
//
//
//

export type DataSeriesDigest = {
    /**
     * Index of dimension that contains data series
     */
    dimIdx: number;

    /**
     * All measure descriptors in the series dimension.
     */
    fromMeasures: IMeasureDescriptor[];

    /**
     * Definitions of measures in the series dimension. The order of appearance matches
     * the order of appearance in the `fromMeasures` array.
     */
    fromMeasuresDef: IMeasure[];

    /**
     * All series-scoping attribute descriptors in series dimension.
     */
    scopingAttributes: IAttributeDescriptor[];

    /**
     * Definitions of scoping attributes in the series dimension. The order of appearance matches
     * the order of appearance in the `scopingAttributes`
     */
    scopingAttributesDef: IAttribute[];

    /**
     * All measure headers in the series dimension
     */
    measureHeaders: IResultMeasureHeader[];

    /**
     * All attribute headers in the series dimension - kept in order of their original appearance.
     */
    allAttributeHeaders: IResultAttributeHeader[][];

    /**
     * Count of data series - this is equal to number of measure headers (= all occurrences of all scoped measures)
     */
    count: number;
};

export type DataSlicesDigest = {
    /**
     * Index of dimension that contains data slices
     */
    dimIdx: number;

    /**
     * All attribute descriptors & totals definitions for the slices dimension.
     */
    descriptors: IAttributeDescriptor[];

    /**
     * Definitions of all attributes in the slices dimension. The order of appearance matches the
     * order of the descriptors.
     */
    descriptorsDef: IAttribute[];

    /**
     * All headers in the slices dimension.
     */
    headerItems: IResultHeader[][];

    /**
     * Total number of slices
     */
    count: number;
};

export type AttributeIndex = { [localId: string]: IAttribute };
export type MeasureIndex = { [localId: string]: IMeasure };

export type ExecutionDefinitionDigest = {
    /**
     * Attributes indexed by their local identifier
     */
    attributesIndex: AttributeIndex;

    /**
     * Measures indexed by their local identifier
     */
    measuresIndex: MeasureIndex;
};

/**
 * Data Access Digest contains categorized information and pointers to various parts of execution result
 * and the data view. The information from this digest is then used for more ergonomic creation of the
 * actual data series and slices and their descriptors.
 */
export type DataAccessDigest = {
    /**
     * Information about series. If series property is not in digest, then data view does not contain any
     * data series - which is valid invariant.
     */
    series?: DataSeriesDigest;

    /**
     * Information about slices. If slices property is not in digest, then data view does not contain any
     * data slices - which is valid invariant.
     */
    slices?: DataSlicesDigest;

    /**
     * Information extracted from execution definition
     */
    def: ExecutionDefinitionDigest;
};

//
//
//

/**
 * @internal
 */
type ResultDescriptor = {
    /**
     * Indexes in data series and data slices dimensions (in this order). If the result does not
     * have series or slices, then the respective index is -1.
     */
    locations: [number, number];

    /**
     * Data series are in the dimension which contains measure group. If there are data series in the result,
     * then this property will contain the located measure group.
     */
    measureGroup?: IMeasureGroupDescriptor;
};

/**
 * Given data view dimensions, this function identifies dimensions where data series and
 * data slices are laid out. The returned result always contains
 */
function findSlicesAndSeriesDims(dimensions: IDimensionDescriptor[]): ResultDescriptor {
    if (dimensions.length === 0) {
        return {
            locations: [-1, -1],
        };
    }

    /*
     * possible valid locations of series and slices. rows and cols OR cols and rows.
     */
    const possibleLocations: Array<[number, number]> = [
        [0, 1],
        [1, 0],
    ];

    for (const locations of possibleLocations) {
        const [seriesIdx, slicesIdx] = locations;

        const dimension = dimensions[seriesIdx];

        if (!dimension) {
            continue;
        }

        const measureGroup = dimension.headers.find(isMeasureGroupDescriptor);

        if (measureGroup) {
            if (!dimensions[slicesIdx]) {
                return {
                    locations: [seriesIdx, -1],
                    measureGroup,
                };
            }

            return {
                locations,
                measureGroup,
            };
        }
    }

    return {
        locations: [-1, 0],
    };
}

function createDataSeriesDigest(
    dataView: IDataView,
    resultDesc: ResultDescriptor,
    def: ExecutionDefinitionDigest,
): DataSeriesDigest | undefined {
    const { measureGroup, locations } = resultDesc;

    if (!measureGroup) {
        return;
    }

    const dimIdx = locations[0];
    const headerItems = dataViewHeaders(dataView, dimIdx);
    const measureHeaders: IResultMeasureHeader[] = headerItems.find(headers =>
        isResultMeasureHeader(headers[0]),
    ) as any;
    const allAttributeHeaders: IResultAttributeHeader[][] = headerItems.filter(headers =>
        isResultAttributeHeader(headers[0]),
    ) as any;
    const count = measureHeaders ? measureHeaders.length : 0;
    const fromMeasures: IMeasureDescriptor[] = measureGroupItems(measureGroup);
    const fromMeasuresDef: IMeasure[] = fromMeasures.map(
        m => def.measuresIndex[m.measureHeaderItem.localIdentifier],
    );
    const scopingAttributes: IAttributeDescriptor[] = dataViewDimensionItems(dataView, dimIdx).filter(
        isAttributeDescriptor,
    );
    const scopingAttributesDef: IAttribute[] = scopingAttributes.map(
        a => def.attributesIndex[a.attributeHeader.localIdentifier],
    );

    return {
        dimIdx,
        fromMeasures,
        fromMeasuresDef,
        scopingAttributes,
        scopingAttributesDef,
        measureHeaders,
        allAttributeHeaders,
        count,
    };
}

function createDataSlicesDigest(
    dataView: IDataView,
    resultDesc: ResultDescriptor,
    def: ExecutionDefinitionDigest,
): DataSlicesDigest | undefined {
    const { locations } = resultDesc;
    const dimIdx = locations[1];

    if (dimIdx < 0) {
        return;
    }

    const headerItems = dataViewHeaders(dataView, dimIdx);
    const count = headerItems.length > 0 ? headerItems[0].length : 0;
    const descriptors: IAttributeDescriptor[] = dataViewDimensionItems(dataView, dimIdx).filter(
        isAttributeDescriptor,
    );
    const descriptorsDef: IAttribute[] = descriptors.map(
        d => def.attributesIndex[d.attributeHeader.localIdentifier],
    );

    return {
        dimIdx,
        descriptors,
        descriptorsDef,
        headerItems,
        count,
    };
}

function createExecutionDefinitionDigest(dataView: IDataView): ExecutionDefinitionDigest {
    const { definition } = dataView;
    const attributesIndex: AttributeIndex = keyBy(definition.attributes, attributeLocalId);
    const measuresIndex: MeasureIndex = keyBy(definition.measures, measureLocalId);

    return {
        attributesIndex,
        measuresIndex,
    };
}

/**
 * Creates digest for the provided data view. The digest includes references to various parts of the
 * data view. The digest never copies any data from the input data view.
 *
 * @param dataView - data view to calculate digest for
 * @returns new digest
 */
export function createDataAccessDigest(dataView: IDataView): DataAccessDigest {
    const resultDesc = findSlicesAndSeriesDims(dataView.result.dimensions);
    const def = createExecutionDefinitionDigest(dataView);

    const series = createDataSeriesDigest(dataView, resultDesc, def);
    const slices = createDataSlicesDigest(dataView, resultDesc, def);

    return {
        series,
        slices,
        def,
    };
}
