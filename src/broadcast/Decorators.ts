/// <reference path="../collections/Map" />

namespace flagwind
{
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
}
