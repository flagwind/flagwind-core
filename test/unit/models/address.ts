/*!
 * This file is part of `test` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

/**
 * 表示一个地址实体类型。
 * @class
 */
export default class Address
{
    private _province: string;
    private _city: string;
    private _detail: string;
    
    /**
     * 获取或设置省份。
     * @property
     * @returns string
     */
    public get province(): string
    {
        return this._province;
    }

    public set province(value: string)
    {
        this._province = value;
    }
    
    /**
     * 获取或设置城市。
     * @property
     * @returns string
     */
    public get city(): string
    {
        return this._city;
    }

    public set city(value: string)
    {
        this._city = value;
    }
    
    /**
     * 获取或设置详细地址。
     * @property
     * @returns string
     */
    public get detail(): string
    {
        return this._detail;
    }
    
    public set detail(value: string)
    {
        this._detail = value;
    }
}
