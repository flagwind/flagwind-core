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
 * 表示一个部门实体类型。
 * @class
 */
export default class Department
{
    private _name: string;
    private _departmentId: string;
    private _corporationId: string;
    
    /**
     * 获取或设置部门名称。
     * @property
     * @returns string
     */
    public get name(): string
    {
        return this._name;
    }
    
    public set name(value: string)
    {
        if(!value)
        {
            throw new Error();
        }
        
        this._name = value;
    }
    
    /**
     * 获取或设置部门编号。
     * @property
     * @returns string
     */
    public get departmentId(): string
    {
        return this._departmentId;
    }

    public set departmentId(value: string)
    {
        this._departmentId = value;
    }

    /**
     * 获取或设置企业编号。
     * @property
     * @returns string
     */
    public get corporationId(): string
    {
        return this._departmentId;
    }
    
    public set corporationId(value: string)
    {
        this._departmentId = value;
    }
}
