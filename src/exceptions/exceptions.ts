/*
 * Authors:
 *   Jason <jasonsoop@gmail.com>
 *
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

/**
 * 表示在应用程序执行期间发生的错误。
 * 
 * @class
 * @version 1.0.0
 * @author jason
 */
export class Exception extends Error
{
    public constructor(message?: string)
    {
        super(message);
    }
}

/**
 * 当向方法提供的参数之一无效时引发的异常。
 * 
 * @class
 * @version 1.0.0
 * @author jason
 */
export class ArgumentException extends Exception
{
    public constructor(message?: string)
    {
        super(message);
    }
}

/**
 * 当方法调用对于对象的当前状态无效时引发的异常。
 * 
 * @class
 * @version 1.0.0
 * @author jason
 */
export class InvalidOperationException extends Exception
{
    public constructor(message?: string)
    {
        super(message);
    }
}
