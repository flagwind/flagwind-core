/**
 * @file This file is part of `events` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { ArgumentException } from "../exceptions";

/**
 * EventArgs 类作为创建事件参数的基类，当发生事件时，EventArgs 实例将作为参数传递给事件侦听器。
 * @class
 * @version 1.0.0
 */
export class EventArgs
{
    private _type: string;                      // 事件类型
    private _data: any;                         // 事件关联的数据
    
    /**
     * 获取一个字符串值，表示事件的类型。
     * @property
     * @returns string
     */
    public get type(): string
    {
        return this._type;
    }
    
    /**
     * 获取或设置与事件关联的可选数据。
     * @property
     * @returns any
     */
    public get data(): any
    {
        return this._data;
    }
   
    public set data(value: any)
    {
        this._data = value;
    }
    
    /**
     * 初始化 EventArgs 类的新实例。
     * @constructor
     * @param  {string} type 事件类型。
     */
    public constructor(type: string)
    {
        if(!type)
        {
            throw new ArgumentException();
        }
        
        this._type = type;
    }
}
