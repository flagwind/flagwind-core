/*!
 * This file is part of `services` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import Type from "src/runtime/type";
import IWorker from "src/services/worker`1";
import WorkerBase from "src/services/worker_base";
import WorkerStateChangedEventArgs from "src/services/worker_state_changed_event_args";

export default class MessageWorker extends WorkerBase
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
        // todo
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
        // todo
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
        // todo
    }
}
