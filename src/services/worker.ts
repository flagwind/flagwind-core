/*!
 * @file This file is part of `services` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { InvalidOperationException } from "../exceptions";
import { EventArgs } from "../events";

/**
 * 关于工作器的状态信息。
 * @enum
 * @version 1.0.0
 */
export const enum WorkerState
{
    /**
     * 未运行/已停止。
     * @member
     */
    stopped = 0,
    
    /**
     * 正在启动中。
     * @member
     */
    starting = 1,
    
    /**
     * 运行中。
     * @member
     */
    running = 2,

    /**
     * 正在暂停中。
     * @member
     */
    pausing = 3,

    /**
     * 已暂停。
     * @member
     */
    paused = 4,
    
    /**
     * 正在恢复中。
     * @member
     */
    resuming = 5,

    /**
     * 正在停止中。
     * @member
     */
    stopping = 6
}

/**
 * 表示工作器状态改变后的事件参数。
 * @class
 * @version 1.0.0
 */
export class WorkerStateChangedEventArgs extends EventArgs
{
    /**
     * 操作名称。
     * @readonly
     * @member
     */
    public readonly actionName: string;

    /**
     * 发生改变的状态。
     * @readonly
     * @member
     */
    public readonly state: WorkerState;

    /**
     * 表示在发生状态改变时产生的异常。
     * @readonly
     * @member
     */
    public readonly error: Error;
    
    /**
     * 初始化 WorkerStateChangedEventArgs 类的新实例。
     * @param {string} type 事件类型。
     * @param  {any} source 事件源。
     * @param  {string} actionName 操作名称。
     * @param  {WorkerState} state 发生改变的状态。
     * @param  {Error} error? 发生状态改变时产生的异常。
     */
    public constructor(type: string, source: any, actionName: string, state: WorkerState, error?: Error)
    {
        super(type, source);
        
        this.actionName = actionName;
        this.state = state;
        this.error = error;
    }
}

/**
 * 关于工作器的接口。
 * @interface
 * @version 1.0.0
 */
export interface IWorker
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

/**
 * 关于工作器的抽象类。
 * 实现子类应当重写 onStart onStop 这两个方法。
 * 
 * @abstract
 * @class
 * @version 1.0.0
 * @author jason
 */
export abstract class WorkerBase implements IWorker
{
    private _name: string;                                          // 工作器名称
    private _state: WorkerState;                                    // 工作器状态
    private _disabled: boolean;                                     // 是否被禁用
    private _canPauseAndContinue: boolean;                          // 是否能暂停恢复
    
    /**
     * 表示当工作器状态改变后产生的事件。
     * @event WorkerStateChangedEventArgs
     */
    public readonly STATE_CHANGED: string = "stateChanged";
    
    /**
     * 获取当前工作器的名称。
     * @property
     * @returns string
     */
    public get name(): string
    {
        return this._name;
    }

    /**
     * 获取工作器的状态。
     * @property
     * @returns WorkerState
     */
    public get state(): WorkerState
    {
        return this._state;
    }

    /**
     * 获取或设置是否禁用工作器。
     * @property
     * @returns boolean
     */
    public get disabled(): boolean
    {
        return this._disabled;
    }

    public set disabled(value: boolean)
    {
        if(this._disabled === value)
        {
            return;
        }
        
        this._disabled = value;

        if(value)
        {
            this.stop();
        }
    }
    
    /**
     * 获取工作器是否允许暂停和继续。
     * @property
     * @returns boolean
     */
    public get canPauseAndContinue(): boolean
    {
        return this._canPauseAndContinue;
    }
    
    public set canPauseAndContinue(value: boolean)
    {
        if(this._state !== WorkerState.stopped)
        {
            throw new InvalidOperationException();
        }
        
        this._canPauseAndContinue = value;
    }

    /**
     * 初始化工作器的新实例。
     * @constructor
     * @param  {string} name 工作器名称。
     */
    protected constructor(name: string)
    {
        this._name = name;
        this._disabled = false;
        this._canPauseAndContinue = false;
        this._state = WorkerState.stopped;
    }

    /**
     * 启动工作器。
     * @param  {Array<string>} ...args 启动的参数。
     * @returns void
     */
    public start(...args: Array<string>): void
    {
        if(this._disabled || this._state !== WorkerState.stopped)
        {
            return;
        }

        // 更新当前状态为“启动中”
        this._state = WorkerState.starting;

        try
        {
            // 调用启动抽象方法，已执行实际的启动操作
            this.onStart(...args);

            // 更新当前状态为“运行中”
            this._state = WorkerState.running;
            
            // 激发“StateChanged”事件
            this.onStateChanged(new WorkerStateChangedEventArgs(this.STATE_CHANGED, this, "start", WorkerState.running));
        }
        catch(ex)
        {
            this._state = WorkerState.stopped;

            // 激发“StateChanged”事件
            this.onStateChanged(new WorkerStateChangedEventArgs(this.STATE_CHANGED, this, "start", WorkerState.stopped, ex));

            throw ex;
        }
    }

    /**
     * 停止工作器。
     * @param  {Array<string>} ...args 停止的参数。
     * @returns void
     */
    public stop(...args: Array<string>): void
    {
        // 保存原来的状态s
        let originalState = this._state;

        if(this._disabled || originalState === WorkerState.stopping || originalState === WorkerState.stopped)
        {
            return;
        }

        // 更新当前状态为“正在停止中”
        this._state = WorkerState.stopping;

        try
        {
            // 调用停止抽象方法，以执行实际的停止操作
            this.onStop(...args);

            // 更新当前状态为"已停止"
            this._state = WorkerState.stopped;

            // 激发“StateChanged”事件
            this.onStateChanged(new WorkerStateChangedEventArgs(this.STATE_CHANGED, this, "stop", WorkerState.stopped));
        }
        catch(ex)
        {
            // 还原状态
            this._state = originalState;

            // 激发“StateChanged”事件
            this.onStateChanged(new WorkerStateChangedEventArgs(this.STATE_CHANGED, this, "stop", originalState, ex));

            throw ex;
        }
    }

    /**
     * 暂停工作器。
     * @returns void
     */
    public pause(): void
    {
        // 保存原来的状态
        let originalState = this._state;

        if(this._disabled || !this._canPauseAndContinue)
        {
            return;
        }

        if(originalState !== WorkerState.running)
        {
            return;
        }

        // 更新当前状态为"正在暂停中"
        this._state = WorkerState.pausing;

        try
        {
            // 执行暂停操作
            this.onPause();

            // 更新当前状态为"已经暂停"
            this._state = WorkerState.paused;

            // 激发“StateChanged”事件
            this.onStateChanged(new WorkerStateChangedEventArgs(this.STATE_CHANGED, this, "pause", WorkerState.paused));
        }
        catch(ex)
        {
            // 还原状态
            this._state = originalState;

            // 激发“StateChanged”事件
            this.onStateChanged(new WorkerStateChangedEventArgs(this.STATE_CHANGED, this, "pause", originalState, ex));

            throw ex;
        }
    }

    /**
     * 恢复工作器，继续运行。
     * @returns void
     */
    public resume(): void
    {
        // 保存原来的状态
        let originalState = this._state;

        if(this._disabled || !this._canPauseAndContinue)
        {
            return;
        }

        if(originalState !== WorkerState.paused)
        {
            return;
        }

        // 更新当前状态为"正在恢复中"
        this._state = WorkerState.resuming;

        try
        {
            // 执行恢复
            this.onResume();

            // 更新当前状态为"运行中"
            this._state = WorkerState.running;
            
            // 激发“StateChanged”事件
            this.onStateChanged(new WorkerStateChangedEventArgs(this.STATE_CHANGED, this, "resume", WorkerState.running));
        }
        catch(e)
        {
            // 还原状态
            this._state = originalState;

            // 激发“StateChanged”事件
            this.onStateChanged(new WorkerStateChangedEventArgs(this.STATE_CHANGED, this, "resume", originalState, e));

            throw e;
        }
    }

    /**
     * 当工作器启动时调用。
     * @protected
     * @abstract
     * @param  {Array<string>} ...args
     * @returns void
     */
    protected abstract onStart(...args: Array<string>): void;
    
    /**
     * 当工作器停止时调用。
     * @protected
     * @abstract
     * @param  {Array<string>} ...args
     * @returns void
     */
    protected abstract onStop(...args: Array<string>): void;
    
    /**
     * 当工作器暂停时调用。
     * @protected
     * @virtual
     * @returns void
     */
    // tslint:disable-next-line:no-empty
    protected onPause(): void {}

    /**
     * 当工作器恢复时调用。
     * @protected
     * @virtual
     * @returns void
     */
    // tslint:disable-next-line:no-empty    
    protected onResume(): void {}
    
    /**
     * 当工作器状态发生改变时调用。
     * @protected
     * @abstract
     * @param  {WorkerStateChangedEventArgs} args 事件参数。
     * @returns void
     */
    protected abstract onStateChanged(args: WorkerStateChangedEventArgs): void;
}
