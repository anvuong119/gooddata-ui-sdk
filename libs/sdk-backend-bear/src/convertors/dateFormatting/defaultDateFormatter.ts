// (C) 2020 GoodData Corporation
import format from "date-fns/format";
import { UnexpectedError } from "@gooddata/sdk-backend-spi";

import { DateFormatter } from "./types";
import { normalizeDateFormat } from "./dateValueParser";

const dateFormats = ["MM/DD/YYYY", "DD/MM/YYYY", "DD-MM-YYYY", "YYYY-MM-DD", "M/D/YY", "DD.MM.YYYY"];

/**
 * Creates a default date formatting function.
 * @public
 */
export const createDefaultDateFormatter = (dateFormat: string = "MM/DD/YYYY"): DateFormatter => {
    return (value: Date, targetDateFormat: string = dateFormat): string => {
        if (!dateFormats.includes(targetDateFormat)) {
            throw new UnexpectedError(
                `Unsupported date format "${targetDateFormat}". Supported date formats are ${dateFormats}`,
            );
        }
        return format(value, normalizeDateFormat(targetDateFormat));
    };
};
