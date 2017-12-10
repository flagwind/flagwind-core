/*!
 * This file is part of `test` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Gender from "./gender";
import Address from "./address";

/**
 * 表示一个人员实体类型。
 * @class
 */
export default class Person
{
    private _name: string;
    private _age: number;
    private _gender: Gender;
    private _address: Address;
    
    /**
     * 获取或设置姓名。
     * @property
     * @returns string
     */
    public get name(): string
    {
        return this._name;
    }
    
    public set name(value: string)
    {
        this._name = value;
    }
    
    /**
     * 获取或设置年龄。
     * @property
     * @returns number
     */
    public get age(): number
    {
        return this._age;
    }

    public set age(value: number)
    {
        this._age = value;
    }
    
    /**
     * 获取或设置性别。
     * @property
     * @returns Gender
     */
    public get gender(): Gender
    {
        return this._gender;
    }

    public set gender(value: Gender)
    {
        this._gender = value;
    }
    
    /**
     * 获取或设置联络地址。
     * @property
     * @returns Address
     */
    public get address(): Address
    {
        return this._address;
    }

    public set address(value: Address)
    {
        this._address = value;
    }
    
    /**
     * 初始化人员信息的新实例。
     * @constructor
     * @param  {string} name 姓名。
     * @param  {number} age 年龄。
     */
    public constructor(name: string, age: number)
    {
        this.name = name;
        this.age = age;
    }
}
