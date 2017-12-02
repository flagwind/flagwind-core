/*!
 * This file is part of `events` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import EventArgs from "./event_args";

/**
 * 为可取消的事件提供数据。
 * @class
 * @version 1.0.0
 */
export default class CancelEventArgs extends EventArgs
{
    private _cancel: boolean = false;
    
    /**
     * 获取或设置指示是否应取消事件。
     * @property
     * @returns boolean
     */
    public get cancel(): boolean
    {
        return this._cancel;
    }
    
    public set cancel(value: boolean)
    {
        this._cancel = value;
    }
}
