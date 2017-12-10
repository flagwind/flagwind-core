namespace flagwind
{
    /**
     * 提供用于检索广播接收器广播项。
     * @class
     * @version 1.0.0
     */
    export class BroadcastReceiverEntry
    {
        private _contract: BroadcastContract;
        private _receiver: IBroadcastReceiver;
        
        /**
         * 获取广播接收优先级。
         * @property
         * @returns number
         */
        public get priority(): number
        {
            return this._contract.priority;
        }
        
        /**
         * 获取广播契约实例。
         * @property
         * @returns BroadcastContract
         */
        public get contract(): BroadcastContract
        {
            return this._contract;
        }
        
        /**
         * 获取广播接收器实例。
         * @property
         * @returns IBroadcastReceiver
         */
        public get receiver(): IBroadcastReceiver
        {
            return this._receiver;
        }
        
        /**
         * 初始化广播项的新实例。
         * @param  {BroadcastContract} contract 广播契约。
         * @param  {IBroadcastReceiver} receiver 广播接收器。
         */
        public constructor(contract: BroadcastContract, receiver: IBroadcastReceiver)
        {
            this._contract = contract;
            this._receiver = receiver;
        }
    }
}
