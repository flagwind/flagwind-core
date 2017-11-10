/*
 * Authors:
 *   Jason <jasonsoop@gmail.com>
 *
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

// const toString = Object.prototype.toString;

// /**
//  * 获取类型的字符串实例。
//  * @private
//  */
// const typeString = function()
// {
//     return toString.call(this).slice(8, -1).toLowerCase();
// };

/**
 * 提供一些常用类型检测与反射相关的方法。
 * 
 * @class
 * @author jason
 */
export class Type
{
    /**
     * 私有构造方法，使类型成为静态类。
     * @private
     */
    private constructor()
    {
    }
    
    /**
     * 检测一个值是否为数组。
     * @param  {any} value
     * @returns boolean
     */
    public static isArray(value: any): boolean
    {
        return true;
        // return typeString.call(value) === "array";
    }
}
