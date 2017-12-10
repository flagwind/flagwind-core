namespace flagwind
{
    /**
     * 表示一个广播契约。
     * @class
     * @version 1.0.0
     */
    export class BroadcastContract
    {
        private _scheme: string;                             // 协议方案
        private _priority: number;                           // 优先级
        private _actions: Set<string>;                       // 协议动作
        
        /**
         * 获取广播契约的方案。
         * @property
         * @returns string
         */
        public get scheme(): string
        {
            return this._scheme;
        }
        
        /**
         * 获取或设置广播接收时的优先顺序。
         * @property
         * @returns number
         */
        public get priority(): number
        {
            return this._priority;
        }
        
        public set priority(value: number)
        {
            this._priority = value;
        }

        /**
         * 获取广播契约所拥有的动作。
         * @property
         * @returns Set
         */
        public get actions(): Set<string>
        {
            if(!this._actions)
            {
                this._actions = new Set<string>();
            }

            return this._actions;
        }
        
        /**
         * 初始化广播契约的新实例。
         * @constructor
         * @param  {string} scheme 协议方案。
         * @param  {Array<string>} actions 协议包含的动作。
         */
        public constructor(scheme: string, actions: Array<string>);
        /**
         * 初始化广播契约的新实例。
         * @constructor
         * @param  {string} uri 协议URI。
         */
        public constructor(uri: string);
        public constructor()
        {
            let args = arguments;
            
            // 匹配签名: constructor(uri: string)
            if(args.length === 1)
            {
                let uri = args[0];

                if(!RegexUtils.uri.test(uri))
                {
                    throw new ArgumentException();
                }

                this._scheme = RegExp.$1;

                this.actions.add(RegExp.$2);
            }
            // 匹配签名: constructor(scheme: string, actions: Array<string>)
            else
            {
                let scheme = args[0],
                    actions = args[1];

                if(!scheme || !RegexUtils.scheme.test(scheme) || !actions)
                {
                    throw new ArgumentException();
                }
                
                // 保存协议方案
                this._scheme = scheme;
                
                // 保存协议动作
                for(let method of actions)
                {
                    this.actions.add(method);
                }
            }

            // 设置默认优先级
            this._priority = BroadcastPriority.normal;
        }
    }
}
