namespace flagwind
{
    /**
     * 广播在传播过程中使用的上下文参数。
     * @class
     * @version 1.0.0
     */
    export class BroadcastContext
    {
        private _manager: BroadcastManager;             // 广播管理器
        private _uri: string;                           // 描述符
        private _scheme: string;                        // 广播方案
        private _action: string;                        // 广播动作
        private _extras: Map<string, any>;              // 携带数据
        private _aborted: boolean;                      // 是否阻止广播继续传播
        
        /**
         * 获取广播所在的广播管理器实例。
         * @property
         * @returns BroadcastManager
         */
        public get manager(): BroadcastManager
        {
            return this._manager;
        }

        /**
         * 获取广播的方案。
         * @property
         * @returns string
         */
        public get scheme(): string
        {
            return this._scheme;
        }

        /**
         * 获取广播的动作。
         * @property
         * @returns string
         */
        public get action(): string
        {
            return this._action;
        }
        
        /**
         * 获取广播的标识符。
         * @property
         * @returns string
         */
        public get uri(): string
        {
            return this._uri;
        }
        
        /**
         * 获取广播携带的数据。
         * @property
         * @returns Map<string, any>
         */
        public get extras(): Map<string, any>
        {
            return this._extras;
        }
        
        /**
         * 表示是否阻止广播继续传播。
         * @property
         * @returns boolean
         */
        public get aborted(): boolean
        {
            return this._aborted;
        }

        /**
         * 初始化广播上下文的新实例。
         * @param  {BroadcastManager} manager 广播管理器。
         * @param  {Broadcast} broadcast 广播实例。
         */
        public constructor(manager: BroadcastManager, broadcast: Broadcast)
        {
            if(!manager || !broadcast)
            {
                throw new ArgumentException();
            }
            
            this._manager = manager;
            this._scheme = broadcast.scheme;
            this._action = broadcast.action;
            this._uri = broadcast.uri;
            this._extras = broadcast.extras;
            this._aborted = false;
        }
        
        /**
         * 阻止广播在本次传播中继续进行传播。
         * @returns void
         */
        public abort(): void
        {
            this._aborted = true;
        }
    }
}
