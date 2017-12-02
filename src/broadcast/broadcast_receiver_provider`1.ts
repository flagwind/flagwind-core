/*!
 * This file is part of `broadcast` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import IEnumerable from "../collections/enumerable`1";
import IBroadcastReceiver from "./broadcast_receiver`1";
import Broadcast from "./broadcast";
import BroadcastContract from "./broadcast_contract";

/**
 * 定义用于检索广播接收器对象的机制。
 * @interface
 * @version 1.0.0
 */
export default interface IBroadcastReceiverProvider
{
    /**
     * 注册一个广播接收器至容器中。
     * @param  {BroadcastContract} contract 广播契约。
     * @param  {IBroadcastReceiver} receiver 广播接收器。
     * @returns void
     */
    register(contract: BroadcastContract, receiver: IBroadcastReceiver): void;
    
    /**
     * 移除指定契约的广播接收器。
     * @param  {BroadcastContract} contract 广播契约。
     * @returns void
     */
    unregister(contract: BroadcastContract): void;

    /**
     * 根据指定广播实例获取所有广播接收器实例。
     * @param  {Broadcast} broadcast 广播实例。
     * @returns IEnumerable<IBroadcastReceiver>
     */
    resolve(broadcast: Broadcast): IEnumerable<IBroadcastReceiver>;
}
