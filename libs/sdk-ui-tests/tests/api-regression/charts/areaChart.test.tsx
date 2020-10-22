// (C) 2007-2019 GoodData Corporation

import { defSetSorts } from "@gooddata/sdk-model";
import { IAreaChartProps } from "@gooddata/sdk-ui-charts";
import areaScenarios from "../../../scenarios/charts/areaChart";
import { ScenarioAndDescription } from "../../../src";
import { createInsightDefinitionForChart } from "../../_infra/insightFactory";
import { mountChartAndCapture } from "../../_infra/render";
import { mountInsight } from "../../_infra/renderPlugVis";
// import { cleanupCoreChartProps } from "../../_infra/utils";
import flatMap from "lodash/flatMap";

const Chart = "AreaChart";

describe(Chart, () => {
    const Scenarios: Array<ScenarioAndDescription<IAreaChartProps>> = flatMap(areaScenarios, (group) =>
        group.forTestTypes("api").asScenarioDescAndScenario(),
    );

    describe.each(Scenarios)("with %s", (_desc, scenario) => {
        const promisedInteractions = mountChartAndCapture(scenario, (wrapper) => {
            return wrapper.find("CoreAreaChart").props();
        });

        // it("should create expected execution definition", async () => {
        //     const interactions = await promisedInteractions;

        //     expect(interactions.triggeredExecution).toMatchSnapshot();
        // });

        // it("should create expected props for core chart", async () => {
        //     const interactions = await promisedInteractions;

        //     expect(interactions.effectiveProps).toBeDefined();
        //     expect(interactions.effectiveProps!.execution).toBeDefined();
        //     expect(cleanupCoreChartProps(interactions.effectiveProps)).toMatchSnapshot();
        // });

        it("should lead to same execution when rendered as insight via plug viz", async () => {
            const interactions = await promisedInteractions;

            const insight = createInsightDefinitionForChart(Chart, _desc, interactions);

            const plugVizInteractions = await mountInsight(scenario, insight);

            // remove sorts from both original and plug viz exec - simply because plug vis will automatically
            // create sorts
            const originalExecutionWithoutSorts = defSetSorts(interactions.triggeredExecution!);
            const executionWithoutSorts = defSetSorts(plugVizInteractions.triggeredExecution!);

            expect(executionWithoutSorts).toEqual(originalExecutionWithoutSorts);
        });
    });
});
