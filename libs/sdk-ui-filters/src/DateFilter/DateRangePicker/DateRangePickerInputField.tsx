// (C) 2007-2019 GoodData Corporation
import React from "react";
import cx from "classnames";
import format from "date-fns/format";
import parse from "date-fns/parse";
import isValid from "date-fns/isValid";
import { DayPickerInputProps, InputClassNames } from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateRangePickerInputFieldBody } from "./DateRangePickerInputFieldBody";

const getInputClassNames = (className?: string, classNameCalendar?: string): InputClassNames => ({
    container: cx("gd-date-range-picker-input", className),
    overlay: cx("gd-date-range-picker-picker", classNameCalendar),
    overlayWrapper: undefined,
});

interface IDateRangePickerInputFieldProps extends DayPickerInputProps {
    className?: string;
    classNameCalendar?: string;
}

function formatDate(date: Date, dateFormat: string): string {
    return format(date, dateFormat);
}

let matchLength: number = 0;

function findMatchLength(dateFormat: string): number {
    let minMatchLength = 0;
    if (dateFormat.includes("d")) {
        minMatchLength += 2;
    }
    if (dateFormat.includes("M")) {
        minMatchLength += 2;
    }
    const dateFormatLength = dateFormat.length;
    for (let i = 0; i < dateFormatLength; i += 1) {
        const ch = dateFormat.charAt(i);
        if (ch !== "d" && ch !== "M") {
            minMatchLength += 1;
        }
    }
    return Math.max(dateFormatLength, minMatchLength);
}

function parseDate(str: string, dateFormat: string): Date | undefined {
    try {
        // parse only when the input string fully matches with the desired format.
        // this is to make sure that the picker input is not overwritten in the middle of writing.
        // e.g, let's consider a case where dateFormat is "dd/MM/yyyy" and the DayPickerInput has already been filled with a valid string "13/09/2020",
        // then an user wants to change only the month "13/09/2020" -> "13/11/2020" by removing "09" and typing "11".
        // in such case the parsing should wait until the user completes typing "11" (otherwise if parsing is done right after the first "1" is typed,
        // the cursor automatically moves to the end of the string in the middle of writing, causing a bad experience for the user).
        if (str && str.length < matchLength) {
            return;
        }
        const parsedDate: Date = parse(str, dateFormat, new Date());
        // parse only dates with 4-digit years. this mimics moment.js behavior - it parses only dates above 1900
        // this is to make sure that the picker input is not overwritten in the middle of writing the year with year "0002" when writing 2020
        if (isValid(parsedDate) && parsedDate.getFullYear() >= 1000) {
            return parsedDate;
        }
        return;
    } catch {
        return;
    }
}

// eslint-disable-next-line react/display-name
export const DateRangePickerInputField = React.forwardRef<DayPickerInput, IDateRangePickerInputFieldProps>(
    (props: IDateRangePickerInputFieldProps, ref: any) => {
        if (!Array.isArray(props.format)) {
            matchLength = findMatchLength(props.format);
        }
        return (
            <DayPickerInput
                {...props}
                ref={ref}
                formatDate={formatDate}
                parseDate={parseDate}
                classNames={getInputClassNames(props.className, props.classNameCalendar)}
                component={DateRangePickerInputFieldBody}
                hideOnDayClick={false}
            />
        );
    },
);
