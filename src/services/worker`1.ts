/*!
 * This file is part of `services` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import IEventProvider from "../events/event_provider`1";
import WorkerState from "./worker_state";

/**
 * 关于工作器的接口。
 * @interface
 * @version 1.0.0
 */
export default interface IWorker extends IEventProvider
{
    /**
     * 表示当工作器状态改变后产生的事件。
     * @event WorkerStateChangedEventArgs
     */
    readonly STATE_CHANGED: string;

    /**
     * 获取当前工作器的名称。
     * @property
     */
    name: string;
    
    /**
     * 获取当前工作器的状态。
     * @property
     */
    state: WorkerState;
    
    /**
     * 获取或设置是否禁用工作器。
     * @property
     */
    disabled: boolean;

    /**
     * 获取工作器是否允许暂停和继续。
     * @property
     */
    canPauseAndContinue: boolean;

    /**
     * 启动工作器。
     * @param  {Array<string>} ...args 启动的参数。
     * @returns void
     */
    start(...args: Array<string>): void;
    
    /**
     * 停止工作器。
     * @param  {Array<string>} ...args 停止的参数。
     * @returns void
     */
    stop(...args: Array<string>): void;
    
    /**
     * 暂停工作器。
     * @returns void
     */
    pause(): void;
    
    /**
     * 恢复工作器，继续运行。
     * @returns void
     */
    resume(): void;
}
