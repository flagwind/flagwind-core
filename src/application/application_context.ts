/*!
 * @file This file is part of `application` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { ISet, Set } from "../collections/set";
import { IMap, Map } from "../collections/map";
import { ArgumentException } from "../exceptions/argument_exception";
import { InvalidOperationException } from "../exceptions/invalid_operation_exception";
import { IServiceProviderFactory, ServiceProviderFactory } from "../services/service_provider_factory";
import { IPrincipal } from "../security/principal";
import { IApplicationModule } from "./application_module";
import { IWorkbench } from "./workbench";

/**
 * 表示实现该抽象类的是一个应用程序上下文。
 * @class
 * @version 1.0.0
 */
export abstract class ApplicationContextBase
{
    private _applicationId: string;                             // 应用程序唯一代号
    private _title: string;                                     // 应用程序标题
    private _modules: ISet<IApplicationModule>;                 // 应用程序的模块集合
    private _states: IMap<string, any>;                         // 当前应用的状态字典
    private _workbench: IWorkbench;                             // 工作台实例
    private _principal: IPrincipal;                             // 当前应用的安全主体
    
    /**
     * 获取或设置当前应用程序唯一代号。
     * @summary 注意：本属性一旦被设置则不能被更改。
     * @property
     * @returns string
     */
    public get applicationId(): string
    {
        return this._applicationId;
    }
    
    public set applicationId(value: string)
    {
        if(!value)
        {
            throw new ArgumentException("value");
        }

        if(this._applicationId)
        {
            throw new InvalidOperationException("The ApplicationId has specified already.");
        }

        this._applicationId = value.trim();
    }
    
    /**
     * 获取或设置当前应用程序的标题。
     * @property
     * @returns string
     */
    public get title(): string
    {
        return this._title;
    }

    public set title(value: string)
    {
        this._title = value || "";
    }
        
    /**
     * 获取当前应用程序的服务管理对象。
     * @property
     * @returns IServiceProviderFactory
     */
    public get serviceFactory(): IServiceProviderFactory
    {
        return ServiceProviderFactory.instance;
    }
    
    /**
     * 获取当前应用程序的模块集合。
     * @property
     * @returns ISet
     */
    public get modules(): ISet<IApplicationModule>
    {
        if(!this._modules)
        {
            this._modules = new Set<IApplicationModule>();
        }
        
        return this._modules;
    }
    
    /**
     * 获取或设置当前应用程序的安全主体。
     * @property
     * @returns IPrincipal
     */
    public get principal(): IPrincipal
    {
        return this._principal;
    }
    
    public set principal(value: IPrincipal)
    {
        this._principal = value;
    }
    
    /**
     * 获取当前应用的状态字典。
     * @property
     * @returns IMap
     */
    public get states(): IMap<string, any>
    {
        if(!this._states)
        {
            this._states = new Map<string, any>();
        }

        return this._states;
    }

    /**
     * 获取当前应用程序的工作台(主界面)。
     * 必须使用 Application 类的 start 方法，启动应用程序后才能使用该属性获取到创建成功的工作台对象。
     * @property
     * @returns IWorkbench
     */
    public get workbench(): IWorkbench
    {
        return this._workbench;
    }
    
    /**
     * 初始化应用程序上下文的新实例。
     * @protected
     * @param  {string} applicationId? 应用程序的唯一代号。
     */
    protected constructor(applicationId?: string)
    {
        if(applicationId)
        {
            this._applicationId = applicationId;
        }
    }
    
    /**
     * 返回当前应用程序的工作台(主界面)。
     * @param  {Array<string>} args 初始化的参数。
     * @returns IWorkbench 返回新建或已创建的工作台对象。
     */
    public getWorkbench(args: Array<string>): IWorkbench
    {
        if(!this._workbench)
        {
            // 创建工作台对象
            this._workbench = this.createWorkbench(args);
        }

        return this._workbench;
    }
    
    /**
     * 创建一个主窗体对象。
     * 通常子类中实现的该方法只是创建空的工作台对象，并没有构建出该工作台下面的子构件。
     * 具体构建工作台子构件的最佳时机通常在 Workbench 类的 Open 方法内进行。
     * @abstract
     * @returns IWorkbench
     */
    protected abstract createWorkbench(args: Array<string>): IWorkbench;
}
