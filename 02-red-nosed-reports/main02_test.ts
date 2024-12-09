import { assertEquals } from "@std/assert/equals";
import { isSafeReport, isSafeReportWithRemoveOneItem } from "./main02.ts";
import { assertFalse } from "@std/assert/false";
import { assert } from "@std/assert";

Deno.test("isSafeReport", () => {
    assertEquals(isSafeReport([1, 2, 3, 4, 5]), true);
    assertEquals(isSafeReport([1, -1, 3, 4, 6]), false);
    assertEquals(isSafeReport([1, 3, 6, 7, 9]), true, "example 03");
});

Deno.test("isSafeReportWithRemoveOneItem", () => {
    assertEquals(isSafeReportWithRemoveOneItem([1, 2, 3, 4, 5]), true, "example 01");
    assertEquals(isSafeReportWithRemoveOneItem([7, 6, 4, 2, 1]), true, "example 02");
    assertFalse(isSafeReportWithRemoveOneItem([9, 7, 6, 2, 1]), "example 03");
    assert(isSafeReportWithRemoveOneItem([1, 3, 2, 4, 5]), "example 04");
    assert(isSafeReportWithRemoveOneItem([8, 6, 4, 4, 1]), "example 05");
    assert(isSafeReportWithRemoveOneItem([1, 3, 6, 7, 9]), "example 06");
});