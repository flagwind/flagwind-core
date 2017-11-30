/*!
 * This file is part of `components` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { IDisposable } from "../runtime/disposable";

/**
 * 提供所有组件需要的功能。
 * @interface
 * @version 1.0.0
 */
export interface IComponent extends IDisposable
{
    /**
     * 获取获设置组件的名称。
     * @property
     */
    name?: string;
}
