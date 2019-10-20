// (C) 2019 GoodData Corporation

import { newTotal, totalIsNative } from "../totals";
import { Account, Won } from "../../../__mocks__/model";
import { InvariantError } from "ts-invariant";

describe("newTotal", () => {
    const Scenarios: Array<[string, any, any, any, any]> = [
        ["create total with measure and attr objects", "sum", Won, Account.Default, undefined],
        ["create total with measure and attr ids", "sum", "measureLocalId", "attrLocalId", undefined],
        ["create total with mix of object and ids", "sum", Won, "attrLocalId", undefined],
        ["create total with alias", "sum", Won, Account.Default, "My Total"],
    ];

    it.each(Scenarios)("should %s", (_desc, typeArg, measureArg, attrArg, aliasArg) => {
        expect(newTotal(typeArg, measureArg, attrArg, aliasArg)).toMatchSnapshot();
    });

    const InvalidScenarios: Array<[string, any, any, any]> = [
        ["type undefined", undefined, Won, Account.Default],
        ["measure undefined", "sum", undefined, Account.Default],
        ["attribute undefined", "sum", Won, undefined],
        ["type null", null, Won, Account.Default],
        ["measure null", "sum", null, Account.Default],
        ["attribute null", "sum", Won, null],
    ];

    it.each(InvalidScenarios)(
        "should throw InvariantError when %s",
        (_desc, typeArg, measureArg, attrArg) => {
            expect(() => newTotal(typeArg, measureArg, attrArg)).toThrowError(InvariantError);
        },
    );
});

describe("isNativeTotal", () => {
    const Scenarios: Array<[boolean, string, any]> = [
        [true, "native total", newTotal("nat", Won, Account.Default)],
        [false, "non-native total", newTotal("sum", Won, Account.Default)],
        [false, "undefined total", undefined],
    ];

    it.each(Scenarios)("should return %s for %s", (expectedResult, _desc, input) => {
        expect(totalIsNative(input)).toEqual(expectedResult);
    });
});
