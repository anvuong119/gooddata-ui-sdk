// (C) 2007-2019 GoodData Corporation
/* eslint-disable import/no-unresolved,import/default */
import React from "react";

import { ExampleWithSource } from "../../../components/ExampleWithSource";

import { DateFilterComponentExample_MMDDYYYY } from "./DateFilterComponentExample_MMDDYYYY";
import DateFilterComponentExample_MMDDYYYYSRC from "!raw-loader!./DateFilterComponentExample_MMDDYYYY";
import DateFilterComponentExample_MMDDYYYYSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/dateFilter/DateFilterComponentExample_MMDDYYYY";

import { DateFilterComponentExample_DDMMYYYY_Dash } from "./DateFilterComponentExample_DDMMYYYY_Dash";
import DateFilterComponentExample_DDMMYYYY_DashSRC from "!raw-loader!./DateFilterComponentExample_DDMMYYYY_Dash";
import DateFilterComponentExample_DDMMYYYY_DashSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/dateFilter/DateFilterComponentExample_DDMMYYYY_Dash";

import { DateFilterComponentExample_DDMMYYYY_Dot } from "./DateFilterComponentExample_DDMMYYYY_Dot";
import DateFilterComponentExample_DDMMYYYY_DotSRC from "!raw-loader!./DateFilterComponentExample_DDMMYYYY_Dot";
import DateFilterComponentExample_DDMMYYYY_DotSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/dateFilter/DateFilterComponentExample_DDMMYYYY_Dot";

import { DateFilterComponentExample_DDMMYYYY_Slash } from "./DateFilterComponentExample_DDMMYYYY_Slash";
import DateFilterComponentExample_DDMMYYYY_SlashSRC from "!raw-loader!./DateFilterComponentExample_DDMMYYYY_Slash";
import DateFilterComponentExample_DDMMYYYY_SlashSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/dateFilter/DateFilterComponentExample_DDMMYYYY_Slash";

import { DateFilterComponentExample_YYYYMMDD } from "./DateFilterComponentExample_YYYYMMDD";
import DateFilterComponentExample_YYYYMMDDSRC from "!raw-loader!./DateFilterComponentExample_YYYYMMDD";
import DateFilterComponentExample_YYYYMMDDSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/dateFilter/DateFilterComponentExample_YYYYMMDD";

import { DateFilterComponentExample_MDYY } from "./DateFilterComponentExample_MDYY";
import DateFilterComponentExample_MDYYSRC from "!raw-loader!./DateFilterComponentExample_MDYY";
import DateFilterComponentExample_MDYYSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/dateFilter/DateFilterComponentExample_MDYY";

import { DateFilterWithColumnChartExample_MMDDYYYY } from "./DateFilterWithColumnChartExample_MMDDYYYY";
import DateFilterWithColumnChartExample_MMDDYYYYSRC from "!raw-loader!./DateFilterWithColumnChartExample_MMDDYYYY";
import DateFilterWithColumnChartExample_MMDDYYYYSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/dateFilter/DateFilterWithColumnChartExample_MMDDYYYY";

import { DateFilterWithColumnChartExample_DDMMYYYY_Dash } from "./DateFilterWithColumnChartExample_DDMMYYYY_Dash";
import DateFilterWithColumnChartExample_DDMMYYYY_DashSRC from "!raw-loader!./DateFilterWithColumnChartExample_DDMMYYYY_Dash";
import DateFilterWithColumnChartExample_DDMMYYYY_DashSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/dateFilter/DateFilterWithColumnChartExample_DDMMYYYY_Dash";

import { DateFilterWithColumnChartExample_DDMMYYYY_Dot } from "./DateFilterWithColumnChartExample_DDMMYYYY_Dot";
import DateFilterWithColumnChartExample_DDMMYYYY_DotSRC from "!raw-loader!./DateFilterWithColumnChartExample_DDMMYYYY_Dot";
import DateFilterWithColumnChartExample_DDMMYYYY_DotSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/dateFilter/DateFilterWithColumnChartExample_DDMMYYYY_Dot";

import { DateFilterWithColumnChartExample_DDMMYYYY_Slash } from "./DateFilterWithColumnChartExample_DDMMYYYY_Slash";
import DateFilterWithColumnChartExample_DDMMYYYY_SlashSRC from "!raw-loader!./DateFilterWithColumnChartExample_DDMMYYYY_Slash";
import DateFilterWithColumnChartExample_DDMMYYYY_SlashSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/dateFilter/DateFilterWithColumnChartExample_DDMMYYYY_Slash";

import { DateFilterWithColumnChartExample_YYYYMMDD } from "./DateFilterWithColumnChartExample_YYYYMMDD";
import DateFilterWithColumnChartExample_YYYYMMDDSRC from "!raw-loader!./DateFilterWithColumnChartExample_YYYYMMDD";
import DateFilterWithColumnChartExample_YYYYMMDDSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/dateFilter/DateFilterWithColumnChartExample_YYYYMMDD";

import { DateFilterWithColumnChartExample_MDYY } from "./DateFilterWithColumnChartExample_MDYY";
import DateFilterWithColumnChartExample_MDYYSRC from "!raw-loader!./DateFilterWithColumnChartExample_MDYY";
import DateFilterWithColumnChartExample_MDYYSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/dateFilter/DateFilterWithColumnChartExample_MDYY";

export const InternationalDateFilterExample: React.FC = () => (
    <div>
        <h1>Date Filter</h1>

        <p>
            These examples show how to pass dateFormat property to a DateFilter component so that dates can be
            displayed in the desired format.
        </p>

        <hr className="separator" />

        <h2>Date Filter with dates displayed in MM/dd/yyyy format</h2>
        <p>This example shows a full-featured date filter component.</p>
        <ExampleWithSource
            for={DateFilterComponentExample_MMDDYYYY}
            source={DateFilterComponentExample_MMDDYYYYSRC}
            sourceJS={DateFilterComponentExample_MMDDYYYYSRCJS}
        />

        <h2>Date Filter with dates displayed in dd-MM-yyyy format</h2>
        <p>This example shows a full-featured date filter component.</p>
        <ExampleWithSource
            for={DateFilterComponentExample_DDMMYYYY_Dash}
            source={DateFilterComponentExample_DDMMYYYY_DashSRC}
            sourceJS={DateFilterComponentExample_DDMMYYYY_DashSRCJS}
        />

        <h2>Date Filter with dates displayed in dd.MM.yyyy format</h2>
        <p>This example shows a full-featured date filter component.</p>
        <ExampleWithSource
            for={DateFilterComponentExample_DDMMYYYY_Dot}
            source={DateFilterComponentExample_DDMMYYYY_DotSRC}
            sourceJS={DateFilterComponentExample_DDMMYYYY_DotSRCJS}
        />

        <h2>Date Filter with dates displayed in dd/MM/yyyy format</h2>
        <p>This example shows a full-featured date filter component.</p>
        <ExampleWithSource
            for={DateFilterComponentExample_DDMMYYYY_Slash}
            source={DateFilterComponentExample_DDMMYYYY_SlashSRC}
            sourceJS={DateFilterComponentExample_DDMMYYYY_SlashSRCJS}
        />

        <h2>Date Filter with dates displayed in yyyy-MM-dd format</h2>
        <p>This example shows a full-featured date filter component.</p>
        <ExampleWithSource
            for={DateFilterComponentExample_YYYYMMDD}
            source={DateFilterComponentExample_YYYYMMDDSRC}
            sourceJS={DateFilterComponentExample_YYYYMMDDSRCJS}
        />

        <h2>Date Filter with dates displayed in M/d/yy format</h2>
        <p>This example shows a full-featured date filter component.</p>
        <ExampleWithSource
            for={DateFilterComponentExample_MDYY}
            source={DateFilterComponentExample_MDYYSRC}
            sourceJS={DateFilterComponentExample_MDYYSRCJS}
        />

        <h2>Filtering a report with dates displayed in MM/dd/yyyy format</h2>
        <p>
            This example shows how to add date filter component into a report. Presets and floating range form
            is restricted to years.
        </p>
        <ExampleWithSource
            for={DateFilterWithColumnChartExample_MMDDYYYY}
            source={DateFilterWithColumnChartExample_MMDDYYYYSRC}
            sourceJS={DateFilterWithColumnChartExample_MMDDYYYYSRCJS}
        />

        <h2>Filtering a report with dates displayed in dd-MM-yyyy format</h2>
        <p>
            This example shows how to add date filter component into a report. Presets and floating range form
            is restricted to years.
        </p>
        <ExampleWithSource
            for={DateFilterWithColumnChartExample_DDMMYYYY_Dash}
            source={DateFilterWithColumnChartExample_DDMMYYYY_DashSRC}
            sourceJS={DateFilterWithColumnChartExample_DDMMYYYY_DashSRCJS}
        />

        <h2>Filtering a report with dates displayed in dd.MM.yyyy format</h2>
        <p>
            This example shows how to add date filter component into a report. Presets and floating range form
            is restricted to years.
        </p>
        <ExampleWithSource
            for={DateFilterWithColumnChartExample_DDMMYYYY_Dot}
            source={DateFilterWithColumnChartExample_DDMMYYYY_DotSRC}
            sourceJS={DateFilterWithColumnChartExample_DDMMYYYY_DotSRCJS}
        />

        <h2>Filtering a report with dates displayed in dd/MM/yyyy format</h2>
        <p>
            This example shows how to add date filter component into a report. Presets and floating range form
            is restricted to years.
        </p>
        <ExampleWithSource
            for={DateFilterWithColumnChartExample_DDMMYYYY_Slash}
            source={DateFilterWithColumnChartExample_DDMMYYYY_SlashSRC}
            sourceJS={DateFilterWithColumnChartExample_DDMMYYYY_SlashSRCJS}
        />

        <h2>Filtering a report with dates displayed in yyyy-MM-dd format</h2>
        <p>
            This example shows how to add date filter component into a report. Presets and floating range form
            is restricted to years.
        </p>
        <ExampleWithSource
            for={DateFilterWithColumnChartExample_YYYYMMDD}
            source={DateFilterWithColumnChartExample_YYYYMMDDSRC}
            sourceJS={DateFilterWithColumnChartExample_YYYYMMDDSRCJS}
        />

        <h2>Filtering a report with dates displayed in M/d/yy format</h2>
        <p>
            This example shows how to add date filter component into a report. Presets and floating range form
            is restricted to years.
        </p>
        <ExampleWithSource
            for={DateFilterWithColumnChartExample_MDYY}
            source={DateFilterWithColumnChartExample_MDYYSRC}
            sourceJS={DateFilterWithColumnChartExample_MDYYSRCJS}
        />
    </div>
);
