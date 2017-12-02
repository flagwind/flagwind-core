/*!
 * This file is part of `common` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

/**
 * 正则表达式常用工具类。
 * @static
 * @class
 * @version 1.0.0
 */
export default class RegexUtils
{
    /**
     * 表示一个 URI 正则表达式。
     * @static
     * @member
     */
    public static readonly uri = /^([a-zA-Z0-9\.]+:\/\/)(.+)$/;
    
    /**
     * 表示一个 Scheme 正则表达式。
     * @static
     * @member
     */
    public static readonly scheme = /^([a-zA-Z0-9\.]+:\/\/)$/;
}
