namespace flagwind
{
    /**
     * 提供用于检索广播接收器对象的机制。
     * @class
     * @version 1.0.0
     */
    export class BroadcastReceiverProvider implements IBroadcastReceiverProvider
    {
        private _entries: Map<string, Set<BroadcastReceiverEntry>>;
        
        /**
         * 初始化广播接收器提供程序的新实例。
         * @constructor
         */
        public constructor()
        {
            this._entries = new Map<string, Set<BroadcastReceiverEntry>>();
        }
        
        /**
         * 注册一个广播接收器至容器中。
         * @param  {BroadcastContract} contract 广播契约。
         * @param  {IBroadcastReceiver} receiver 广播接收器。
         * @returns void
         */
        public register(contract: BroadcastContract, receiver: IBroadcastReceiver): void
        {
            if(!contract || !receiver)
            {
                throw new ArgumentException();
            }
            
            contract.actions.forEach((action: string) =>
            {
                // 根据契约 scheme + action 组合成 uri 注册
                let uri = contract.scheme.concat(action),
                    set = this._entries.get(uri);
                
                if(!set)
                {
                    set = new Set<BroadcastReceiverEntry>();

                    this._entries.set(uri, set);
                }

                set.add(new BroadcastReceiverEntry(contract, receiver));
            });
        }

        /**
         * 移除指定契约的广播接收器。
         * @param  {BroadcastContract} contract 广播契约。
         * @returns void
         */
        public unregister(contract: BroadcastContract): void
        {
            if(!contract)
            {
                throw new ArgumentException();
            }
            
            contract.actions.forEach((action: string) =>
            {
                // 根据契约 scheme + action 组合成 uri 注册
                let uri = contract.scheme.concat(action);

                if(this._entries.has(uri))
                {
                    this._entries.delete(uri);
                }
            });
        }
        
        /**
         * 根据指定广播实例获取所有广播接收器实例。
         * @param  {Broadcast} broadcast 广播实例。
         * @returns IEnumerable<IBroadcastReceiver>
         */
        public resolve(broadcast: Broadcast): IEnumerable<IBroadcastReceiver>
        {
            if(this._entries.has(broadcast.uri))
            {
                let entries = this._entries.get(broadcast.uri),
                    receivers = new Set<IBroadcastReceiver>();
                
                // 根据优先级排序
                entries.sort((a, b) => b.priority - a.priority);
                
                // 追加至返回列表中
                entries.forEach(entry => receivers.add(entry.receiver));
                
                return receivers;
            }

            return new Set<IBroadcastReceiver>();
        }
    }
}
