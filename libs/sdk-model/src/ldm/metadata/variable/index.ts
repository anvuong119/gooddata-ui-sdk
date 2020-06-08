// (C) 2020 GoodData Corporation
import { IMetadataObject, isMetadataObject } from "../types";

/**
 * Variable metadata object
 *
 * @public
 */
export interface IVariableMetadataObject extends IMetadataObject {
    type: "variable";
}

/**
 * Tests whether the provided object is of type {@link IVariableMetadataObject}.
 *
 * @param obj - object to test
 * @public
 */
export function isVariableMetadataObject(obj: any): obj is IVariableMetadataObject {
    return isMetadataObject(obj) && obj.type === "variable";
}
