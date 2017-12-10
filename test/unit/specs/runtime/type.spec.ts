/*!
 * This file is part of `runtime` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import flagwind from "dist/flagwind";
import Type = flagwind.Type;
import { Employee, Person, Gender } from "../../models";

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
    const employee = new Employee("jason", 18);
    
    /**
     * 测试 isArray 方法。
     */
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
    });
    
    /**
     * 测试 getClassType 方法。
     */
    it("getClassTypeTest", () =>
    {
        let type = Type.getClassType(nullValue);
        assert.isNull(type);
        
        type = Type.getClassType(undefined);
        assert.isUndefined(type);

        type = Type.getClassType(numberValue);
        assert.equal(type, Number);

        type = Type.getClassType(booleanValue);
        assert.equal(type, Boolean);

        type = Type.getClassType(dynamicArray);
        assert.equal(type, Array);

        type = Type.getClassType(typedArray);
        assert.equal(type, Array);

        type = Type.getClassType(objectValue);
        assert.equal(type, Object);

        type = Type.getClassType(regexValue);
        assert.equal(type, RegExp);

        type = Type.getClassType(employee);
        assert.equal(type, Employee);

        type = Type.getClassType(stringValue);
        assert.equal(type, String);

        type = Type.getClassType("Array");
        assert.equal(type, Array);

        type = Type.getClassType("Number");
        assert.equal(type, Number);
    });

    /**
     * 测试 getClassName 方法。
     */
    it("getClassNameTest", () =>
    {
        // 获取类型名称
        const className = Type.getClassName(employee);
        
        assert.equal(className, "Employee");
    });
    
    /**
     * 测试 getSuperclassName 方法。
     */
    it("getSuperclassNameTest", () =>
    {
        // 获取基类名称
        const superClassName = Type.getSuperclassName(employee);

        assert.equal(superClassName, "Person");
    });

    /**
     * 测试 isAssignableFrom 方法。
     */
    it("isAssignableFromTest", () =>
    {
        assert.isTrue(Type.isAssignableFrom(Person, Employee));
        assert.isTrue(Type.isAssignableFrom("Person", Employee));
    });
});
