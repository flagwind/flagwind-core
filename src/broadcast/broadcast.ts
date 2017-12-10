namespace flagwind
{
    /**
     * 表示一条广播信息。
     * @class
     * @version 1.0.0
     */
    export class Broadcast
    {
        private _uri: string;                           // 描述符
        private _scheme: string;                        // 广播方案
        private _action: string;                        // 广播动作
        private _extras: Map<string, any>;              // 携带数据
        
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
         * @returns Map
         */
        public get extras(): Map<string, any>
        {
            return this._extras;
        }
        
        /**
         * 初始化一个广播新实例。
         * @property
         * @param  {string} uri 广播描述符。
         * @param  {Map<string, any>} extras? 携带的数据。
         */
        public constructor(uri: string, extras?: Map<string, any>)
        {
            if(!uri || !RegexUtils.uri.test(uri))
            {
                throw new ArgumentException();
            }
            
            this._uri = uri;
            this._scheme = RegExp.$1;
            this._action = RegExp.$2;
            this._extras = extras || new Map<string, any>();
        }
    }
}
