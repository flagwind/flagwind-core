/**
 * @file This file is part of `runtime` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import { Type } from "../../../../src/runtime/type";
import { Employee, Person, Gender } from "../../models/person";

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
     * 测试 getClassType 方法。
     */
    it("getClassTypeTest", () => 
    {
        let employeType = Type.getClassType(employee);
        
        assert.isTrue(employeType === Employee);
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
