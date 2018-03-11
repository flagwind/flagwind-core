namespace flagwind
{
    /**
     * 提供用于广播注册发布等功能。
     * @class
     * @version 1.0.0
     */
    export class BroadcastManager
    {
        private _eventProvider: IEventProvider;                         // 事件提供程序
        private _receiverProvider: IBroadcastReceiverProvider;          // 广播接收器提供程序
        private static _instance: BroadcastManager;                     // 静态单实例
        
        /**
         * 获取一个事件提供程序。
         * @protected
         * @property
         * @returns IEventProvider
         */
        protected get eventProvider(): IEventProvider
        {
            return this._eventProvider;
        }
        
        /**
         * 获取一个广播接收器提供程序。
         * @protected
         * @property
         * @returns IBroadcastReceiverProvider
         */
        protected get receiverProvider(): IBroadcastReceiverProvider
        {
            return this._receiverProvider;
        }

        /**
         * 获取广播管理器的单实例。
         * @static
         * @returns BroadcastManager
         */
        public static get instance(): BroadcastManager
        {
            if(!this._instance)
            {
                this._instance = new BroadcastManager();
            }
            
            return this._instance;
        }
        
        /**
         * 初始化广播管理器的新实例。
         * @param  {IBroadcastReceiverProvider} receiverProvider? 广播接收器提供程序。
         */
        protected constructor(receiverProvider?: IBroadcastReceiverProvider)
        {
            this._eventProvider = new EventProvider(this);
            this._receiverProvider = receiverProvider || new BroadcastReceiverProvider();
        }
        
        /**
         * 基于指定的契约注册一个广播接收程序。
         * @param  {BroadcastContract} contract 广播契约。
         * @param  {IBroadcastReceiver} receiver 接收程序。
         * @returns void
         */
        public register(contract: BroadcastContract, receiver: IBroadcastReceiver): void
        {
            // 将协议注册至事件提供程序中
            if(!this.eventProvider.hasListener(contract.scheme))
            {
                this.eventProvider.addListener(contract.scheme, this.onReceive, this);
            }

            // 将接收程序注册至服务提供程序中
            this.receiverProvider.register(contract, receiver);
        }
        
        /**
         * 移除指定契约的广播接收器。
         * @param  {BroadcastContract} contract 广播契约。
         * @returns void
         */
        public unregister(contract: BroadcastContract): void
        {
            this.receiverProvider.unregister(contract);
        }
        
        /**
         * 发送一条广播信息。
         * @param  {Broadcast} broadcast 广播实例。
         * @returns void
         */
        public send(broadcast: Broadcast): void
        {
            if(!broadcast)
            {
                throw new ArgumentException();
            }
            
            this.eventProvider.dispatchEvent(broadcast.scheme, broadcast);
        }
        
        /**
         * 当接收广播时调用。
         * @protected
         * @virtual
         * @returns any
         */
        protected onReceive(request: any): void
        {
            let broadcast = request.data as Broadcast,
                receivers = this.receiverProvider.resolve(broadcast),
                enumerator = receivers.getEnumerator(),
                context = this.createBroadcastContext(broadcast);
            
            while(enumerator.next())
            {
                let receiver = enumerator.current;
                
                try
                {
                    if(context.aborted)
                    {
                        return;
                    }
                    
                    receiver.receive(context);
                }
                catch(ex)
                {
                    Logger.error(this, ex);
                }
            }
        }
        
        /**
         * 创建广播上下文实例。
         * @protected
         * @virtual
         * @param  {Broadcast} broadcast
         * @returns BroadcastContext
         */
        protected createBroadcastContext(broadcast: Broadcast): BroadcastContext
        {
            return new BroadcastContext(this, broadcast);
        }
    }
}
