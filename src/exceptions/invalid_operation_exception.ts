/*!
 * This file is part of `exceptions` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Exception from "./exception";

/**
 * 当方法调用对于对象的当前状态无效时引发的异常。
 * @class
 * @version 1.0.0
 */
export default class InvalidOperationException extends Exception
{
    public constructor(message?: string)
    {
        super(message);
    }
}