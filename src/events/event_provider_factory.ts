/*!
 * @file This file is part of `events` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { ArgumentException } from "../exceptions/argument_exception";
import { IMap, Map } from "../collections/map";
import { IEventProvider, EventProvider } from "./event_provider";

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
 * @class
 * @version 1.0.0
 */
export class EventProviderFactory implements IEventProviderFactory
{
    private _providers: Map<any, IEventProvider>;
    private static _instance: EventProviderFactory;
    
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
     * 获取事件提供程序工厂的单实例。
     * @static
     * @property
     * @returns EventProviderFactory
     */
    public static get instance(): EventProviderFactory
    {
        if(!this._instance)
        {
            this._instance = new EventProviderFactory();
        }
        
        return this._instance;
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
        if(!source)
        {
            throw new ArgumentException();
        }

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
     * @virtual
     * @param  {any} source IEventProvider 所抛出事件对象的源对象。
     * @returns IEventProvider 事件提供程序实例。
     */
    protected createProvider(source: any): IEventProvider
    {
        return new EventProvider(source);
    }
}
