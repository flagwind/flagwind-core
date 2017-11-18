/*!
 * @file This file is part of `services` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import { Type } from "../../../../../src/runtime/type";
import { IWorker, WorkerBase, WorkerStateChangedEventArgs } from "../../../../../src/services";

export class MessageWorker extends WorkerBase
{
    public constructor()
    {
        super("message");
    }
    
    /**
     * 当工作器启动时调用。
     * @protected
     * @override
     * @param  {Array<string>} ...args
     * @returns void
     */
    protected onStart(...args: Array<string>): void
    {
        
    }
    
    /**
     * 当工作器停止时调用。
     * @protected
     * @override
     * @param  {Array<string>} ...args
     * @returns void
     */
    protected onStop(...args: Array<string>): void
    {
        
    }

    /**
     * 当工作器状态发生改变时调用。
     * @protected
     * @override
     * @param  {WorkerStateChangedEventArgs} args 事件参数。
     * @returns void
     */
    protected onStateChanged(args: WorkerStateChangedEventArgs): void
    {
        
    }
}