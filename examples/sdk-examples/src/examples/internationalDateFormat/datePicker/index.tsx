// (C) 2007-2019 GoodData Corporation
/* eslint-disable import/no-unresolved,import/default */
import React from "react";
import { ExampleWithSource } from "../../../components/ExampleWithSource";

import { DatePickerExample_MMDDYYYY } from "./DatePickerExample_MMDDYYYY";
import DatePickerExample_MMDDYYYYSRC from "!raw-loader!./DatePickerExample_MMDDYYYY";
import DatePickerExample_MMDDYYYYSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/datePicker/DatePickerExample_MMDDYYYY";

import { DatePickerExample_DDMMYYYY_Dash } from "./DatePickerExample_DDMMYYYY_Dash";
import DatePickerExample_DDMMYYYY_DashSRC from "!raw-loader!./DatePickerExample_DDMMYYYY_Dash";
import DatePickerExample_DDMMYYYY_DashSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/datePicker/DatePickerExample_DDMMYYYY_Dash";

import { DatePickerExample_DDMMYYYY_Dot } from "./DatePickerExample_DDMMYYYY_Dot";
import DatePickerExample_DDMMYYYY_DotSRC from "!raw-loader!./DatePickerExample_DDMMYYYY_Dot";
import DatePickerExample_DDMMYYYY_DotSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/datePicker/DatePickerExample_DDMMYYYY_Dot";

import { DatePickerExample_DDMMYYYY_Slash } from "./DatePickerExample_DDMMYYYY_Slash";
import DatePickerExample_DDMMYYYY_SlashSRC from "!raw-loader!./DatePickerExample_DDMMYYYY_Slash";
import DatePickerExample_DDMMYYYY_SlashSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/datePicker/DatePickerExample_DDMMYYYY_Slash";

import { DatePickerExample_YYYYMMDD } from "./DatePickerExample_YYYYMMDD";
import DatePickerExample_YYYYMMDDSRC from "!raw-loader!./DatePickerExample_YYYYMMDD";
import DatePickerExample_YYYYMMDDSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/datePicker/DatePickerExample_YYYYMMDD";

import { DatePickerExample_MDYY } from "./DatePickerExample_MDYY";
import DatePickerExample_MDYYSRC from "!raw-loader!./DatePickerExample_MDYY";
import DatePickerExample_MDYYSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/datePicker/DatePickerExample_MDYY";

export const InternationalDatePickerExample: React.FC = () => (
    <div>
        <h1>Date Picker</h1>

        <p>
            This is an example of two custom date picker components filtering a insightView by absolute date
            in MM/dd/yyyy format.
        </p>

        <ExampleWithSource
            for={DatePickerExample_MMDDYYYY}
            source={DatePickerExample_MMDDYYYYSRC}
            sourceJS={DatePickerExample_MMDDYYYYSRCJS}
        />

        <p>
            This is an example of two custom date picker components filtering a insightView by absolute date
            in dd-MM-yyyy format.
        </p>

        <ExampleWithSource
            for={DatePickerExample_DDMMYYYY_Dash}
            source={DatePickerExample_DDMMYYYY_DashSRC}
            sourceJS={DatePickerExample_DDMMYYYY_DashSRCJS}
        />

        <p>
            This is an example of two custom date picker components filtering a insightView by absolute date
            in dd.MM.yyyy format.
        </p>

        <ExampleWithSource
            for={DatePickerExample_DDMMYYYY_Dot}
            source={DatePickerExample_DDMMYYYY_DotSRC}
            sourceJS={DatePickerExample_DDMMYYYY_DotSRCJS}
        />

        <p>
            This is an example of two custom date picker components filtering a insightView by absolute date
            in dd/MM/yyyy format.
        </p>

        <ExampleWithSource
            for={DatePickerExample_DDMMYYYY_Slash}
            source={DatePickerExample_DDMMYYYY_SlashSRC}
            sourceJS={DatePickerExample_DDMMYYYY_SlashSRCJS}
        />

        <p>
            This is an example of two custom date picker components filtering a insightView by absolute date
            in yyyy-MM-dd format.
        </p>

        <ExampleWithSource
            for={DatePickerExample_YYYYMMDD}
            source={DatePickerExample_YYYYMMDDSRC}
            sourceJS={DatePickerExample_YYYYMMDDSRCJS}
        />

        <p>
            This is an example of two custom date picker components filtering a insightView by absolute date
            in M/d/yy format.
        </p>

        <ExampleWithSource
            for={DatePickerExample_MDYY}
            source={DatePickerExample_MDYYSRC}
            sourceJS={DatePickerExample_MDYYSRCJS}
        />
    </div>
);
