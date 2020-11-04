// (C) 2007-2019 GoodData Corporation
/* eslint-disable import/no-unresolved,import/default */
import React from "react";
import { ExampleWithSource } from "../../../components/ExampleWithSource";

import { DatePickerExample_DDMMYYYY } from "./DatePickerExample_DDMMYYYY";
import DatePickerExample_DDMMYYYYSRC from "!raw-loader!./DatePickerExample_DDMMYYYY";
import DatePickerExample_DDMMYYYYSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/datePicker/DatePickerExample_DDMMYYYY";

import { DatePickerExample_MDYY } from "./DatePickerExample_MDYY";
import DatePickerExample_MDYYSRC from "!raw-loader!./DatePickerExample_MDYY";
import DatePickerExample_MDYYSRCJS from "!raw-loader!../../../../examplesJS/internationalDateFormat/datePicker/DatePickerExample_MDYY";

export const InternationalDatePickerExample: React.FC = () => (
    <div>
        <h1>Date Picker</h1>

        <h3>
            If a format (for more details about date formats, please see{" "}
            <a href="https://date-fns.org/v2.0.0-alpha.27/docs/format">here</a>) is passed to Datepicker
            components via dateFormat property, the dates will be displayed in that format
        </h3>

        <p>
            This is an example of two custom date picker components filtering a insightView by absolute date
            in dd/MM/yyyy format.
        </p>

        <ExampleWithSource
            for={DatePickerExample_DDMMYYYY}
            source={DatePickerExample_DDMMYYYYSRC}
            sourceJS={DatePickerExample_DDMMYYYYSRCJS}
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
