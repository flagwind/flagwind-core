/**
 * @file This file is part of `components` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { IDisposable } from "../runtime";

/**
 * 定义组件的基础功能。
 * @interface
 * @version 1.0.0
 */
export interface IComponent extends IDisposable
{
    /**
     * 获取获设置组件的名称。
     * @property
     */
    name: string;
}
