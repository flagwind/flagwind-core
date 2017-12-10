/*!
 * This file is part of `common` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import flagwind from "dist/flagwind";
import EnumEntry = flagwind.EnumEntry;
import EnumUtils = flagwind.EnumUtils;
import Gender from "../../models/gender";

describe("EnumTest", () =>
{
    /**
     * 测试 getEntry 方法。
     */
    it("getEntryTest", () =>
    {
        let entry = EnumUtils.getEntry(Gender.female, Gender);
        assert.equal("female", entry.name);
        assert.equal(Gender.female, entry.value);
        assert.equal("F", entry.alias);
        assert.equal("女士", entry.description);

        entry = EnumUtils.getEntry(Gender.male, Gender);
        assert.equal("male", entry.name);
        assert.equal(0, entry.value);
        assert.equal("M", entry.alias);
        assert.equal("男士", entry.description);
    });
    
    /**
     * 测试 getEntries 方法。
     */
    it("getEntriesTest", () =>
    {
        let entryies = EnumUtils.getEntries(Gender);
        assert.equal(2, entryies.length);
        assert.equal("male", entryies[0].name);
        assert.equal("female", entryies[1].name);
    });
});
