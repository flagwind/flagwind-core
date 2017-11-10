/*
 * Authors:
 *   Jason <jasonsoop@gmail.com>
 *
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import { Type } from "../../../../src/reflection/Type";

describe("TypeTest", () =>
{
    const nullValue = null;
    const undefinedValue = undefined;
    const dynamicArray = [1, 2, 3];
    const typedArray = new Array<string>("hello", "word");
    const objectValue = {};
    const stringValue = "hello word";
    const numberValue = 1;
    const booleanValue = true;
    const regexValue = /^hello$/;
    
    it("isArrayTest", () =>
    {
        assert.isTrue(Type.isArray(dynamicArray));
        assert.isTrue(Type.isArray(typedArray));

        assert.isFalse(Type.isArray(nullValue));
        assert.isFalse(Type.isArray(undefinedValue));
        assert.isFalse(Type.isArray(objectValue));
        assert.isFalse(Type.isArray(stringValue));
        assert.isFalse(Type.isArray(numberValue));
        assert.isFalse(Type.isArray(booleanValue));
        assert.isFalse(Type.isArray(regexValue));
    })
});
