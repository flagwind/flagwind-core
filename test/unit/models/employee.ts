/*!
 * @file This file is part of `test` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { Person } from "./person";
import { Department } from "./department";

/**
 * 表示一个员工实体类型。
 * @class
 */
export class Employee extends Person
{
    private _employeeId: string;
    private _salary: number;
    private _department: Department;
    
    /**
     * 获取或设置员工编号。
     * @property
     * @returns string
     */
    public get employeeId(): string
    {
        return this._employeeId;
    }

    public set employeeId(value: string)
    {
        this._employeeId = value;
    }
    
    /**
     * 获取或设置员工所在部门。
     * @property
     * @returns Department
     */
    public get department(): Department
    {
        return this._department;
    }

    public set department(value: Department)
    {
        this._department = value;
    }
    
    /**
     * 获取或设置员工薪水。
     * @property
     * @returns number
     */
    public get salary(): number
    {
        return this._salary;
    }

    public set salary(value: number)
    {
        this._salary = value;
    }
}
