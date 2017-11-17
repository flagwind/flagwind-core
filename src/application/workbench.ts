/*!
 * @file This file is part of `application` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { IEventProvider } from "../events";
import { IWorkspace } from "./workspace";

/**
 * 表示工作台的运行状态。
 * @enum
 * @version 1.0.0
 */
export const enum WorkbenchStatus
{
    /**
     * 未开始或已关闭。
     * @member
     */
    closed = 0,
    
    /**
     * 正在打开中。
     * @member
     */
    opening = 1,

    /**
     * 正常运行。
     * @member
     */
    running = 2,
    
    /**
     * 取消激活中。
     * @member
     */
    deactivating = 3,

    /**
     * 已被取消激活。
     * @member
     */
    deactivated = 4,
    
    /**
     * 正在激活中。
     * @member
     */
    activating = 5,

    /**
     * 正在关闭中。
     * @member
     */
    closing = 6
}

/**
 * 表示工作台的接口，包含对工作台的基本行为特性的定义。
 * @interface
 * @version 1.0.0
 */
export interface IWorkbench extends IEventProvider
{
    /**
     * 当工作台正在打开时产生的事件。
     * @event EventArgs
     */
    readonly OPENING: string;
    
    /**
     * 当工作台被打开后产生的事件。
     * @event EventArgs
     */
    readonly OPENED: string;

    /**
     * 当工作台正在取消激活时产生的事件。
     * @event EventArgs
     */
    readonly DEACTIVATING: string;

    /**
     * 当工作台取消激活后产生的事件。
     * @event EventArgs
     */
    readonly DEACTIVATED: string;

    /**
     * 当工作台正在激活时产生的事件。
     * @event EventArgs
     */
    readonly ACTIVATING: string;

    /**
     * 当工作台正在关闭时产生的事件。
     * @event CancelEventArgs
     */
    readonly CLOSING: string;

    /**
     * 当工作台被关闭后产生的事件。
     * @event EventArgs
     */
    readonly CLOSED: string;
    
    /**
     * 当工作台标题被更改后产生的事件。
     * @event EventArgs
     */
    readonly TITLE_CHANGED: string;
    
    /**
     * 获取工作台状态。
     * @property
     */
    status: WorkbenchStatus;

    /**
     * 获取或设置工作台标题。
     * @property
     */
    title: string;

    /**
     * 获取工作空间实例。
     * @property
     */
    workspace: IWorkspace;
    
    /**
     * 打开工作台。
     * @async
     * @param  {Array<string>} ...args
     * @returns void
     */
    open(args: Array<string>): Promise<void>;
    
    /**
     * 关闭工作台。
     * @async
     * @returns boolean
     */
    close(): Promise<boolean>;
    
    /**
     * 取消激活工作台。
     * @returns void
     */
    deactivate(): void;
    
    /**
     * 激活工作台。
     * @returns void
     */
    activate(): void;
}
