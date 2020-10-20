// (C) 2020 GoodData Corporation
import parse from "date-fns/parse";
import { UnexpectedError } from "@gooddata/sdk-backend-spi";
import { dateFormats, DEFAULT_DATE_FORMAT } from "@gooddata/sdk-model";

/**
 * Parses a string representation of a date of a given date format to a Date object.
 * @param value - value to parse.
 * @param dateFormat - dateFormat to assume when parsing the value.
 * @internal
 */
export const parseDateValue = (value: string, dateFormat: string = DEFAULT_DATE_FORMAT): Date => {
    if (!dateFormats.includes(dateFormat)) {
        throw new UnexpectedError(
            `Unsupported date format "${dateFormat}". Supported date formats are ${dateFormats}`,
        );
    }
    return parse(value, dateFormat, new Date());
};
