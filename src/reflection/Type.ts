/*
 * Authors:
 *   Jason <jasonsoop@gmail.com>
 *
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

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
        return this.getTypeString(value) === "array";
    }

    /**
     * 检测一个值是否为对象。
     * @param  {any} value
     * @returns boolean
     */
    public static isObject(value: any): boolean
    {
        return this.getTypeString(value) === "object";
    }

    /**
     * 检测一个值是否为字符串。
     * @param  {any} value
     * @returns boolean
     */
    public static isString(value: any): boolean
    {
        return typeof value === "string";
    }

    /**
     * 检测一个值是否为日期。
     * @param  {any} value
     * @returns boolean
     */
    public static isDate(value: any): boolean
    {
        return this.getTypeString(value) === "date";
    }

    /**
     * 检测一个值是否为正则表达式。
     * @param  {any} value
     * @returns boolean
     */
    public static isRegExp(value: any): boolean
    {
        return this.getTypeString(value) === "regexp";
    }

    /**
     * 检测一个值是否为函数。
     * @param  {any} value
     * @returns boolean
     */
    public static isFunction(value: any): boolean
    {
        return typeof value === "function";
    }

    /**
     * 检测一个值是否为布尔值。
     * @param  {any} value
     * @returns boolean
     */
    public static isBoolean(value: any): boolean
    {
        return typeof value === "boolean";
    }

    /**
     * 检测一个值是否为数值。
     * @param  {any} value
     * @returns boolean
     */
    public static isNumber(value: any): boolean
    {
        return typeof value === "number";
    }

    /**
     * 检测一个值是否为 null
     * @param  {any} value
     * @returns boolean
     */
    public static isNull(value: any): boolean
    {
        return value === null;
    }

    /**
     * 检测一个值是否为 undefined。
     * @param  {any} value
     * @returns boolean
     */
    public static isUndefined(value: any): boolean
    {
        return typeof value === "undefined";
    }

    /**
     * 检测一个值是否为 null 或 undefined。
     * @param  {any} value
     * @returns boolean
     */
    public static isEmptyObject(value: any): boolean
    {
        return Type.isNull(value) || Type.isUndefined(value);
    }

    /**
     * 表示一个字符串值是否为 null 或 undefined 或 空值。
     * @param  {string} value 要检测的字符串实例。
     * @returns boolean
     */
    public static isEmptyString(value: string): boolean
    {
        return Type.isEmptyObject(value) || value.trim() === "";
    }
    
    /**
     * 获取指定值的类型字符串(小写)。
     * @private
     * @param  {any} value
     * @returns string
     */
    private static getTypeString(value: any): string
    {
        // tslint:disable-next-line:no-magic-numbers
        return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    }
}
