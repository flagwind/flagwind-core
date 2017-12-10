/*!
 * This file is part of `runtime` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import flagwind from "dist/flagwind";
import StringUtils = flagwind.StringUtils;
import CommandBase = flagwind.CommandBase;
import CommandContext = flagwind.CommandContext;

export default class SendCommand extends CommandBase<CommandContext>
{
    /**
     * 验证码短信模板(如：注册或找回密码)。
     * @static
     * @member
     */
    public static readonly TEMPLATE_OPTION: string  = "template";
    
    /**
     * 初始化验证码发送命令。
     * @constructor
     */
    public constructor()
    {
        super("send");
    }
    
    /**
     * 当执行命令时调用。
     * @protected
     * @override
     * @async
     * @param  {newlife.CommandContext} context 执行命令的上下文对象。
     * @returns any 执行的返回结果。
     */
    protected async onExecute(context: CommandContext): Promise<any>
    {
        // 解析手机号、模板、模板参数
        let mobile = context.expression.arguments[0],
            template = context.expression.options.get(SendCommand.TEMPLATE_OPTION),
            parameter = context.parameter;
        
        // 生成本次发送标识符号
        let identifier = StringUtils.generateRandom(8);
        
        // 调用短信接口发送
        return identifier;
    }
}
