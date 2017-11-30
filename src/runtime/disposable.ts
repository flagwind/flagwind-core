/*!
 * This file is part of `runtime` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

/**
 * 提供一种用于释放非托管资源的机制。
 * @interface
 * @version 1.0.0
 */
export interface IDisposable
{
    /**
     * 执行与释放或重置非托管资源关联的应用程序定义的任务。
     * @returns void
     */
    dispose(): void;
}
