/*!
 * This file is part of `exceptions` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

/**
 * 表示在应用程序执行期间发生的错误。
 * @class
 * @version 1.0.0
 */
export class Exception extends Error
{
    public constructor(message?: string)
    {
        super(message);
    }
}
