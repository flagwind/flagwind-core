/*!
 * @file This file is part of `events` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { IMap, Map } from "../collections/map";
import { IEventProvider } from "./event_provider";

/**
 * 提供关于事件提供程序的功能。
 * @interface
 * @version 1.0.0
 */
export interface IEventProviderFactory
{
    /**
     * 获取指定事件源的事件提供程序。
     * @param  {any} source IEventProvider 所抛出事件对象的源对象。
     * @returns IEventProdiver 返回指定名称的事件提供程序。
     */
    getProvider(source: any): IEventProvider;
}

/**
 * 提供关于事件提供程序的功能。
 * @abstract
 * @class
 * @version 1.0.0
 */
export abstract class EventProviderFactoryBase implements IEventProviderFactory
{
    private _providers: Map<any, IEventProvider>;
    
    /**
     * 获取所有事件提供程序。
     * @property
     * @returns IMap<any, IEventProvider>
     */
    protected get providers(): IMap<any, IEventProvider>
    {
        return this._providers;
    }
    
    /**
     * 初始化事件提供程序工厂的新实例。
     * @constructor
     */
    public constructor()
    {
        this._providers = new Map<any, IEventProvider>();
    }
    
    /**
     * 获取指定事件源的事件提供程序。
     * @param  {any} source IEventProvider 所抛出事件对象的源对象。
     * @returns IEventProdiver 返回指定名称的事件提供程序。
     */
    public getProvider(source: any): IEventProvider
    {
        let provider = this._providers.get(source);

        if(!provider)
        {
            provider = this.createProvider(source);

            this._providers.set(source, provider);
        }

        return provider;
    }
    
    /**
     * 根据指定事件源创建一个事件提供程序。
     * @abstract
     * @param  {any} source IEventProvider 所抛出事件对象的源对象。
     * @returns IEventProvider 事件提供程序实例。
     */
    protected abstract createProvider(source: any): IEventProvider;
}
