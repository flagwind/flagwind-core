/*!
 * This file is part of `reflection` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Type from "../runtime/type";
import Map from "../collections/map";

/**
 * 提供对象实例创建的方法。
 * @static
 * @class
 * @version 1.0.0
 */
export default class Activator
{
    private static readonly _types = new Map<string, Function>();
    
    /**
     * 私有构造方法，使类型成为静态类。
     * @private
     */
    private constructor()
    {
    }

    /**
     * 创建指定类型的实例。
     * @param  {string|Function} type 类型字符串或类型构造函数。
     * @param  {any[]} ...params 需要传递给构造函数的参数。
     * @returns T
     */
    public static createInstance<T>(type: string | Function, ...params: Array<any>): T
    {
        let types = this._types,
            ctor: any;
        
        if(Type.isString(type))
        {
            type = <string>type;

            // 先从缓存中获取类型，如果不存在则动态解析并加入缓存
            if(!types.has(type))
            {
                ctor = Type.getClassType(type);

                if(ctor === String)
                {
                    throw new TypeError(`Can not found the type '${type}'.`);
                }
                
                // 只有解析到的类型不是字符串，而是真实的类型时才往下走
                types.set(type, ctor);
            }
            else
            {
                ctor = types.get(type);
            }
        }
        else if(Type.isFunction(type))
        {
            ctor = type;
        }

        return new ctor(...params);
    }
}
