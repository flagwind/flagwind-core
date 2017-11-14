/**
 * @file This file is part of `events` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { IEventProvider } from "./event-provider";

/**
 * 提供关于事件提供程序的功能。
 * @interface
 * @version 1.0.0
 */
export interface IEventProviderFactory
{
    /**
     * 获取指定名称的事件提供程序。
     * @param  {string} name 指定的事件提供程序名称。
     * @returns IEventProdiver 返回指定名称的事件提供程序。
     */
    getProvider(name: string): IEventProvider;
}
