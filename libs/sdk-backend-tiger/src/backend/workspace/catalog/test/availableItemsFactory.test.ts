// (C) 2019-2020 GoodData Corporation

import { ReferenceRecordings } from "@gooddata/reference-workspace";
import { CatalogItem, uriRef } from "@gooddata/sdk-model";
import { convertResponseToObjRefs, filterAvailableItems } from "../availableItemsFactory";
import { JsonApiId } from "../../../../convertors/fromBackend/afm/ObjRefConverter";

describe("available item filtering", () => {
    describe("response conversion", () => {
        const StringScenarios: Array<[string, string]> = [
            ["label id", "label/some_id"],
            ["attribute id", "attribute/some_id"],
            ["metric", "metric/some_id"],
            ["fact", "fact/some_id"],
        ];

        const ObjectScenarios: Array<[string, JsonApiId]> = [
            ["label id", { id: "id", type: "label" }],
            ["attribute id", { id: "id", type: "attribute" }],
            ["metric", { id: "id", type: "metric" }],
            ["fact", { id: "id", type: "fact" }],
        ];

        it.each(StringScenarios)("should convert %s when it comes as string", (_desc, input) => {
            expect(convertResponseToObjRefs([input])).toMatchSnapshot();
        });

        it.each(ObjectScenarios)("should convert %s when it comes as object", (_desc, input) => {
            expect(convertResponseToObjRefs([input])).toMatchSnapshot();
        });
    });

    describe("item filtering", () => {
        /*
         * Note: reference workspace is created from bear. The 'refs' are thus UriRefs as that's what bear returns;
         * the filtering must thus use uriRefs for available items.
         *
         * This does not diminish the benefit of those tests as they do not verify ref matching itself but rather
         * whether simple objects or composite objects are filtered in correctly.
         */
        const AllItems: CatalogItem[] = ReferenceRecordings.Recordings.metadata.catalog.items;

        it("should return empty result if none match", () => {
            expect(filterAvailableItems([uriRef("nonsense")], AllItems)).toEqual([]);
        });
        it("should filter-in simple object if ref matches", () => {
            expect(
                filterAvailableItems([uriRef("/gdc/md/l32xdyl4bjuzgf9kkqr2avl55gtuyjwf/obj/1267")], AllItems),
            ).toMatchSnapshot();
        });

        it("should filter-in date dataset if attribute ref matches", () => {
            expect(
                filterAvailableItems([uriRef("/gdc/md/l32xdyl4bjuzgf9kkqr2avl55gtuyjwf/obj/827")], AllItems),
            ).toMatchSnapshot();
        });
    });
});