namespace flagwind
{
    /**
     * 定义用于检索广播接收器对象的机制。
     * @interface
     * @version 1.0.0
     */
    export interface IBroadcastReceiverProvider
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
}
