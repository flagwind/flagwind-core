/**
 * @file This file is part of `services` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import { Type } from "../../../../src/runtime/type";
import { ServiceProvider, ServiceProviderFactory } from "../../../../src/services";

import { Employee, Person, Gender } from "../../models/person";

describe("ServiceProviderTest", () =>
{
    const provider1 = new ServiceProvider();
    const provider2 = new ServiceProvider();
    const provider3 = new ServiceProvider();

     /**
     * 服务解析测试。
     */
    it("resolveTest", () =>
    {
        console.warn("aaaa");
    });
});