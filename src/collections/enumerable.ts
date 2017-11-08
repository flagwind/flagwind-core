/*
 * Authors:
 *   Jason <jasonsoop@gmail.com>
 *
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { IEnumerator } from "./enumerator";

/**
 * 表示实现该接口的是一个可枚举的类型。
 * 
 * @interface
 * @version 1.0.0
 * @author jason
 */
export interface IEnumerable<T>
{
    /**
     * 返回一个循环访问集合的枚举器。
     * @returns IEnumerator
     */
    getEnumerator(): IEnumerator<T>;
    
    /**
     * 对 IEnumerable<T> 进行迭代处理。
     * @param  {(item:T,source:IEnumerable<T>)=>void} callback 每次迭代中执行的回掉函数，当前迭代项将传入该函数。
     * @param  {any} scope? 回掉函数中 this 所引用的对象。
     * @returns void
     */
    forEach(callback: (item: T, source: IEnumerable<T>) => void, scope?: any): void;
}