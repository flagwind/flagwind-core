/*!
 * @file This file is part of `commands` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { InvalidOperationException } from "../exceptions";
import { Type } from "../runtime";
import { Activator } from "../reflection";
import { ICommand, CommandBase } from "./command";
import { CommandExecutor } from "./command_executor";

// tslint:disable-next-line:only-arrow-functions
export function command(path: string)
{
    // tslint:disable-next-line:only-arrow-functions
    return function(commandType: Function)
    {
        if(!Type.isAssignableFrom(CommandBase, commandType))
        {
            throw new InvalidOperationException(`The class '${Type.getQualifiedClassName(commandType)}' is not a command type.`);
        }
        
        // 生成命令实例
        let command = <ICommand>Activator.createInstance(commandType);
        
        // 注册至默认的执行器中
        CommandExecutor.default.register(path, command);
    };
}
