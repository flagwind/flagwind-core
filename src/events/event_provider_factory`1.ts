/*!
 * This file is part of `events` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import IEventProvider from "./event_provider`1";

/**
 * 提供关于事件提供程序的功能。
 * @interface
 * @version 1.0.0
 */
export default interface IEventProviderFactory
{
    /**
     * 获取指定事件源的事件提供程序。
     * @param  {any} source IEventProvider 所抛出事件对象的源对象。
     * @returns IEventProdiver 返回指定名称的事件提供程序。
     */
    getProvider(source: any): IEventProvider;
}
