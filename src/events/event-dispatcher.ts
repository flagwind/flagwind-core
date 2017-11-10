/*
 * Authors:
 *   Jason <jasonsoop@gmail.com>
 *
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

/**
 * 定义用于添加或删除事件侦听器的方法，检查是否已注册特定类型的事件侦听器，并调度事件。
 * 
 * @interface
 * @author jason
 */
export interface IEventDispatcher
{
    /**
     * 
     * @param  {string} type
     * @param  {Function} listener
     * @param  {boolean} once?
     * @returns void
     */
    addListener(type: string, listener: Function, once?: boolean): void;

    removeListener(type: string, listener: Function): void;

    hasListener(type: string): boolean;

    dispatch(type: string, data?: any): void;
}
