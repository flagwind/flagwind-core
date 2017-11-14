/**
 * Authors:
 *   @author jason <jasonsoop@gmail.com>
 * 
 * @module test
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

export const enum Gender
{
    /**
     * 先生。
     * @member
     */
    male,

    /**
     * 女士。
     * @member
     */
    female
}

export class Person
{
    public name: string;

    public age: number;

    public gender: Gender;
}

export class Employee extends Person
{
    public salary: number;
    
    public constructor(name: string, age: number)
    {
        super();

        this.name = name;
        this.age = age;
    }
}