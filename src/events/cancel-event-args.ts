/**
 * Authors:
 *   @author jason <jasonsoop@gmail.com>
 * 
 * @module events
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { EventArgs } from "./event-args";

/**
 * 为可取消的事件提供数据。
 * @class
 * @version 1.0.0
 */
export class CancelEventArgs extends EventArgs
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
    
    /**
     * 获取或设置指示是否应取消事件。
     * @property
     * @param  {boolean} value
     */
    public set cancel(value: boolean)
    {
        this._cancel = value;
    }
}
