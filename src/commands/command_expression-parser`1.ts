/*!
 * This file is part of `commands` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import CommandExpression from "./command_expression";

/**
 * 提供命令行文本解析功能。
 * @interface
 * @version 1.0.0
 */
export default interface ICommandExpressionParser
{
    /**
     * 将指定的命令行文本解析成命令表达式对象。
     * @param  {string} text 指定的要解析的命令行文本。
     * @returns CommandExpression 返回解析的命令表达式对象，如果解析失败则返回空(null)。
     */
    parse(text: string): CommandExpression;
}
