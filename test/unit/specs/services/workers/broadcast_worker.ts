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
import flagwind from "dist/flagwind";
import Type = flagwind.Type;
import IWorker = flagwind.IWorker;
import WorkerBase = flagwind.WorkerBase;
import WorkerStateChangedEventArgs = flagwind.WorkerStateChangedEventArgs;

export default class BroadcastWorker extends WorkerBase
{
    public constructor()
    {
        super("broadcast");
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
