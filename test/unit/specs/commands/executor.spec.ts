/**
 * @file This file is part of `commands` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import { Promise, polyfill } from "es6-promise";
import { Type } from "../../../../src/runtime/type";
import { SendCommand } from "./sms/send-command";
import { CommandExecutor } from "../../../../src/commands";

polyfill();

describe("CommandExecutorTest", () =>
{
    // 获取默认命令执行器实例
    const executor = CommandExecutor.default;

    // 手工注册一下测试命令
    executor.register("sms/send", new SendCommand());
    
    /**
     * 测试 execute 方法。
     */
    it("executeTest", (done) =>
    {
        let promise = executor.execute("sms.send -template:'register' 18682189878");

        promise.then((identifier) => 
        {
            assert.isNotEmpty(identifier);
            
            done();
        })
        .catch((error) => 
        {
            done(error);
        });
    });
});
