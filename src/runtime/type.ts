/**
 * @file This file is part of `runtime` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

/**
 * 提供一些常用类型检测与反射相关的方法。
 * @static
 * @class
 * @version 1.0.0
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
     * @static
     * @param  {any} value
     * @returns boolean
     */
    public static isArray(value: any): boolean
    {
        return this.getTypeString(value) === "array";
    }

    /**
     * 检测一个值是否为对象。
     * @static
     * @param  {any} value
     * @returns boolean
     */
    public static isObject(value: any): boolean
    {
        return this.getTypeString(value) === "object";
    }

    /**
     * 检测一个值是否为字符串。
     * @static
     * @param  {any} value
     * @returns boolean
     */
    public static isString(value: any): boolean
    {
        return typeof value === "string";
    }

    /**
     * 检测一个值是否为日期。
     * @static
     * @param  {any} value
     * @returns boolean
     */
    public static isDate(value: any): boolean
    {
        return this.getTypeString(value) === "date";
    }

    /**
     * 检测一个值是否为正则表达式。
     * @static
     * @param  {any} value
     * @returns boolean
     */
    public static isRegExp(value: any): boolean
    {
        return this.getTypeString(value) === "regexp";
    }

    /**
     * 检测一个值是否为函数。
     * @static
     * @param  {any} value
     * @returns boolean
     */
    public static isFunction(value: any): boolean
    {
        return typeof value === "function";
    }

    /**
     * 检测一个值是否为布尔值。
     * @static
     * @param  {any} value
     * @returns boolean
     */
    public static isBoolean(value: any): boolean
    {
        return typeof value === "boolean";
    }

    /**
     * 检测一个值是否为数值。
     * @static
     * @param  {any} value
     * @returns boolean
     */
    public static isNumber(value: any): boolean
    {
        return typeof value === "number";
    }

    /**
     * 检测一个值是否为 null。
     * @static
     * @param  {any} value
     * @returns boolean
     */
    public static isNull(value: any): boolean
    {
        return value === null;
    }

    /**
     * 检测一个值是否为 undefined。
     * @static
     * @param  {any} value
     * @returns boolean
     */
    public static isUndefined(value: any): boolean
    {
        return typeof value === "undefined";
    }

    /**
     * 检测一个值是否为 null 或 undefined。
     * @static
     * @param  {any} value
     * @returns boolean
     */
    public static isEmptyObject(value: any): boolean
    {
        return Type.isNull(value) || Type.isUndefined(value);
    }

    /**
     * 表示一个字符串值是否为 null 或 undefined 或 空值。
     * @static
     * @param  {string} value 要检测的字符串实例。
     * @returns boolean
     */
    public static isEmptyString(value: string): boolean
    {
        return Type.isEmptyObject(value) || value.trim() === "";
    }
    
    /**
     * 返回 value 参数指定的对象的类名。
     * @param  {any} value 需要取得类名称的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型（如number)和类对象。
     * @returns string 类名称的字符串。
     */
    public static getClassName(value: any): string
    {
        let className = this.getQualifiedClassName(value).split(".");

        return className[className.length - 1];
    }
    
    /**
     * 返回 value 参数指定的对象的完全限定类名。
     * @static
     * @param  {any} value 需要取得完全限定类名称的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型（如number)和类对象。
     * @returns string 包含完全限定类名称的字符串。
     */
    public static getQualifiedClassName(value: any): string
    {
        let type = typeof value;

        if(!value || (type !== "object" && !value.prototype))
        {
            return type;
        }

        let prototype: any = value.prototype ? value.prototype : Object.getPrototypeOf(value);

        if(prototype.hasOwnProperty("__class__"))
        {
            return prototype["__class__"];
        }

        let constructorString: string = prototype.constructor.toString().trim();
        let index: number = constructorString.indexOf("(");
        // tslint:disable-next-line:no-magic-numbers
        let className: string = constructorString.substring(9, index);

        Object.defineProperty
        (
            prototype,
            "__class__",
            {
                value: className,
                enumerable: false,
                writable: true
            }
        );
        
        return className;
    }
    
    /**
     * 返回 value 参数指定的对象的基类的类名。
     * @param  {any} value 需要取得父类类名称的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型（如number）和类对象。
     * @returns string 基类名称，或 null（如果不存在基类名称）。
     */
    public static getSuperclassName(value: any): string
    {
        let className = this.getQualifiedSuperclassName(value).split(".");
        
        return className[className.length - 1];
    }
    
    /**
     * 返回 value 参数指定的对象的基类的完全限定类名。
     * @param  {any} value 需要取得父类完全限定类名称的对象，可以将任何 JavaScript 值传递给此方法，包括所有可用的 JavaScript 类型、对象实例、原始类型（如number）和类对象。
     * @returns string 完全限定的基类名称，或 null（如果不存在基类名称）。
     */
    public static getQualifiedSuperclassName(value: any): string
    {
        if(!value || (typeof value !== "object" && !value.prototype))
        {
            return null;
        }

        let prototype: any = value.prototype ? value.prototype : Object.getPrototypeOf(value);
        let superProto = Object.getPrototypeOf(prototype);

        if(!superProto)
        {
            return null;
        }

        let superClass = this.getQualifiedClassName(superProto.constructor);

        if(!superClass)
        {
            return null;
        }

        return superClass;
    }
    
    /**
     * 获取指定值的类型字符串(小写)。
     * @private
     * @static
     * @param  {any} value
     * @returns string
     */
    private static getTypeString(value: any): string
    {
        // tslint:disable-next-line:no-magic-numbers
        return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
    }
}
