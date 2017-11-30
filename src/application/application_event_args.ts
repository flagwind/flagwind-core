/*!
 * This file is part of `application` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { EventArgs } from "../events/event_args";
import { ApplicationContextBase } from "./application_context";

/**
 * 应用程序事件参数类。
 * @class
 * @version 1.0.0
 */
export class ApplicationEventArgs extends EventArgs
{
    /**
     * 获取应用程序上下文实例。
     * @member
     */
    public readonly context: ApplicationContextBase;
    
    /**
     * 初始化应用程序事件参数类的新实例。
     * @param  {string} type 事件类型。
     * @param  {ApplicationContextBase} context 应用程序上下文实例。
     */
    public constructor(type: string, context: ApplicationContextBase)
    {
        super(type);
        
        this.context = context;
    }
}
