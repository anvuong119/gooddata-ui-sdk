// (C) 2020 GoodData Corporation
import parse from "date-fns/parse";
import { UnexpectedError } from "@gooddata/sdk-backend-spi";

const dateFormats = ["MM/DD/YYYY", "DD/MM/YYYY", "DD-MM-YYYY", "YYYY-MM-DD", "M/D/YY", "DD.MM.YYYY"];

/**
 * Normalizes dateFormat replacing:
 *  - D (uppercase) with d (lowercase) for formatting day of a month.
 *  - Y (uppercase) with y (lowercase) for formatting year.
 * @param dateFormat - dateFormat to be normalized.
 * @internal
 */
export const normalizeDateFormat = (dateFormat: string): string => {
    return dateFormat && dateFormat.replace(/D/g, "d").replace(/Y/g, "y");
};

/**
 * Parses a string representation of a date of a given date format to a Date object.
 * @param value - value to parse.
 * @param dateFormat - dateFormat to assume when parsing the value.
 * @internal
 */
export const parseDateValue = (value: string, dateFormat: string = "MM/DD/YYYY"): Date => {
    if (!dateFormats.includes(dateFormat)) {
        throw new UnexpectedError(
            `Unsupported date format "${dateFormat}". Supported date formats are ${dateFormats}`,
        );
    }
    return parse(value, normalizeDateFormat(dateFormat), new Date());
};
