/*!
 * This file is part of `commands` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import { Promise, polyfill } from "es6-promise";
import flagwind from "dist/flagwind";
import Type = flagwind.Type;
import CommandExecutor = flagwind.CommandExecutor;
import SendCommand from "./sms/send-command";

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
    it("executeTest", (done: Function) =>
    {
        let promise = executor.execute("sms.send -template:'register' 18682189878");

        promise.then((identifier: string) =>
        {
            assert.isNotEmpty(identifier);
            
            done();
        })
        .catch((error: any) =>
        {
            done(error);
        });
    });
});
