/**
 * @file This file is part of `components` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { IComponent } from "./component";
 
/**
 * 表示视图的状态。
 * @enum
 * @version 1.0.0
 */
export const enum ViewStatus
{
    /**
     * 未进入或已暂停。
     * @member
     */
    none = 0,
    
    /**
     * 进入中。
     * @member
     */
    entering = 1,

    /**
     * 运行中。
     * @member
     */
    running = 2,

    /**
     * 离开中。
     * @member
     */
    leaving = 3
}

/**
 * 定义视图的基础功能。
 * @interface
 * @version 1.0.0
 */
export interface IView extends IComponent
{
    /**
     * 当正在进入视图时产生的事件。
     * @event EventArgs
     */
    readonly ENTERING: string;
    
    /**
     * 当进入视图后产生的事件。
     * @event EventArgs
     */
    readonly ENTERED: string;
    
    /**
     * 当正在离开视图时产生的事件。
     * @event CancelEventArgs
     */
    readonly LEAVING: string;

    /**
     * 当离开视图后产生的事件。
     * @event EventArgs
     */
    readonly LEAVED: string;
    
    /**
     * 获取场景的状态。
     * @property
     */
    status: ViewStatus;
    
    /**
     * 进入视图。
     * @async
     * @param  {Array<any>} ...args 可选参数。
     * @returns void
     */
    enter(...args: Array<any>): Promise<void>;
    
    /**
     * 离开视图。
     * @async
     * @param  {Array<any>} ...args 可选参数。
     * @returns void
     */
    leave(...args: Array<any>): Promise<void>;
}
