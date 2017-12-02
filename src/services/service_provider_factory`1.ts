/*!
 * This file is part of `services` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import IServiceProvider from "./service_provider`1";

/**
 * 提供关于服务供应程序容器的功能。
 * @interface
 * @version 1.0.0
 */
export default interface IServiceProviderFactory
{
    /**
     * 获取设置默认的服务供应程序。
     * @property
     */
    default: IServiceProvider;
    
    /**
     * 获取指定名称的服务供应程序。
     * @param  {string} name 指定的服务供应程序名称。
     * @returns IServiceProvider 返回指定名称的服务供应程序。
     */
    getProvider(name: string): IServiceProvider;
}