/*!
 * @file This file is part of `runtime` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { IView } from "../components/view";

/**
 * 表示工作空间的定义。
 * @interface
 * @version 1.0.0
 */
export interface IWorkspace
{
    /**
     * 添加一个试图。
     * @param  {IView} view 试图实例。
     * @returns IView
     */
    addView(view: IView): IView;
    
    /**
     * 从工作空间中移除指定试图。
     * @param  {string|IView} name 试图名称或试图实例。
     * @returns void
     */
    removeView(name: string | IView): void;
    
    /**
     * 根据指定的名称获取一个试图实例。
     * @param  {string} name 试图名称。
     * @returns IView
     */
    getView(name: string): IView;
}
