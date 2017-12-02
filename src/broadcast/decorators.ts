/*!
 * This file is part of `broadcast` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import IBroadcastReceiver from "./broadcast_receiver`1";
import InvalidOperationException from "../exceptions/invalid_operation_exception";
import Map from "../collections/map";
import Activator from "../reflection/activator";
import BroadcastContract from "./broadcast_contract";
import BroadcastManager from "./broadcast_manager";

const receivers = new Map<Function, IBroadcastReceiver>();

/**
 * 标注当前类型是一个广播接收器。
 * @param  {string} uri 广播描述符。
 * @param  {number} priority? 广播优先级。
 */
export function receivable(uri: string, priority?: number)
{
    if(!uri)
    {
        throw new InvalidOperationException("The broadcast uri is empty.");
    }

    return function(receiverType: Function)
    {
        let receiver = receivers.get(receiverType),
            contract = new BroadcastContract(uri);
        
        // 设置优先级
        if(priority)
        {
            contract.priority = priority;
        }

        // 生成接收器实例
        if(!receiver)
        {
            receiver = Activator.createInstance(receiverType) as IBroadcastReceiver;
            
            receivers.set(receiverType, receiver);
        }

        // 注册至管理器中
        BroadcastManager.instance.register(contract, receiver);
    };
}
