namespace flagwind
{
    /**
     * 表示一个事件项。
     * @internal
     * @class
     * @version 1.0.0
     */
    class EventEntry
    {
        /**
         * 获取事件的字符串类型值。
         * @readonly
         * @member
         * @returns string
         */
        public readonly type: string;
        
        /**
         * 获取事件的侦听函数。
         * @readonly
         * @member
         * @returns Function
         */
        public readonly listener: Function;

        /**
         * 获取事件侦听函数的 this 对象。
         * @readonly
         * @member
         * @returns any
         */
        public readonly scope: any;

        /**
         * 获取一个布尔值，表示是否为仅回调一次的事件项。
         * @readonly
         * @member
         * @returns boolean
         */
        public readonly once: boolean;
        
        /**
         * 初始化事件项的新实例。
         * @param  {string} type 事件类型。
         * @param  {Function} listener 侦听函数。
         * @param  {any} scope 侦听函数中的 this 对象。
         * @param  {boolean} scope 是否为仅回掉一次。
         */
        public constructor(type: string, listener: Function, scope: any, once: boolean)
        {
            this.type = type;
            this.listener = listener;
            this.scope = scope;
            this.once = once;
        }
    }

    /**
     * 事件提供程序类。
     * @description 用于添加或删除事件侦听器的方法，检查是否已注册特定类型的事件侦听器，并调度事件。
     * @class
     * @version 1.0.0
     */
    export class EventProvider implements IEventProvider
    {
        private _source: any;                                               // 事件源
        private _events: Map<string, Array<EventEntry>>;                    // 事件监听器字典
        
        /**
         * 初始化事件提供程序的新实例。
         * @param  {any} source? 事件源实例。
         */
        public constructor(source?: any)
        {
            // 保存事件源对象
            this._source = source || this;
            
            // 初始化事件字典
            this._events = new Map<string, Array<EventEntry>>();
        }

        /**
         * 为指定的事件类型注册一个侦听器，以使侦听器能够接收事件通知。
         * @summary 如果不再需要某个事件侦听器，可调用 removeListener() 删除它，否则会产生内存问题。
         * 由于垃圾回收器不会删除仍包含引用的对象，因此不会从内存中自动删除使用已注册事件侦听器的对象。
         * @param  {string} type 事件类型。
         * @param  {Function} 处理事件的侦听器函数。
         * @param  {any} scope? 侦听函数绑定的 this 对象。
         * @param  {boolean} once? 是否添加仅回调一次的事件侦听器，如果此参数设为 true 则在第一次回调时就自动移除监听。
         * @returns void
         */
        public addListener(type: string, listener: Function, scope: any = this, once: boolean = false): void
        {
            if(!type || !listener)
            {
                throw new ArgumentException();
            }
            
            let entries = this._events.get(type);

            if(!entries)
            {
                entries = new Array<EventEntry>();
                
                this._events.set(type, entries);
            }

            for(let entry of entries)
            {
                // 防止添加重复的侦听函数
                if(entry.listener === listener && entry.scope === scope)
                {
                    return;
                }
            }

            entries.push(new EventEntry(type, listener, scope, once));
        }
        
        /**
         * 移除侦听器。如果没有注册任何匹配的侦听器，则对此方法的调用没有任何效果。
         * @param  {string} type 事件类型。
         * @param  {Function} listener 处理事件的侦听器函数。
         * @param  {any} scope? 侦听函数绑定的 this 对象。
         * @returns void
         */
        public removeListener(type: string, listener: Function, scope: any = this): void
        {
            if(!type || !listener)
            {
                throw new ArgumentException();
            }

            let entries = this._events.get(type);

            if(!entries)
            {
                return;
            }

            for(let i = 0, len = entries.length; i < len; i++)
            {
                let entry = entries[i];

                if(entry.listener === listener && entry.scope === scope)
                {
                    entries.splice(i, 1);

                    break;
                }
            }

            // 如果事件项为空，则需要释放资源
            if(entries.length === 0)
            {
                this._events.delete(type);
            }
        }
        
        /**
         * 检查是否为特定事件类型注册了侦听器。
         * @param  {string} type 事件类型。
         * @returns boolean 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
         */
        public hasListener(type: string): boolean
        {
            let entries = this._events.get(type);

            return !!entries && entries.length > 0;
        }
        
        /**
         * 派发一个指定类型的事件。
         * @param  {string} type 事件类型。
         * @param  {any} data? 事件数据。
         * @returns void
         */
        public dispatchEvent(type: string, data?: any): void;

        /**
         * 派发一个指定参数的事件。
         * @param  {EventArgs} eventArgs 事件参数实例。
         * @returns void
         */
        public dispatchEvent(args: EventArgs): void;
        public dispatchEvent(): void
        {
            let params = arguments,
                args: EventArgs;
            
            switch(params.length)
            {
                // 重载匹配: 
                // dispatchEvent(args: EventArgs): void;
                // dispatchEvent(type: string): void;
                case 1:
                {
                    if(params[0] instanceof EventArgs)
                    {
                        // 参数匹配: args: EventArgs
                        args = params[0];
                    }
                    else if(Type.isString(params[0]))
                    {
                        // 参数匹配: type: string
                        args = new EventArgs(params[0]);
                    }

                    break;
                }
                // 重载匹配:
                // dispatchEvent(type: string, data: any): void;
                case 2:
                {
                    // 参数匹配: type: string, data: any
                    args = new EventArgs(params[0], params[1]);

                    break;
                }
            }

            // 设置事件源
            args.source = this._source;
            
            // 根据事件类型获取所有事件项
            let entries = this._events.get(args.type);

            if(!entries || entries.length === 0)
            {
                return;
            }
            
            // 临时数组用于保存只回掉一次的事件项
            let onces = new Array<EventEntry>();

            for(let entry of entries)
            {
                entry.listener.call(entry.scope, args);

                if(entry.once)
                {
                    onces.push(entry);
                }
            }

            // 清除所有只回调一次的事件项
            while(onces.length)
            {
                let entry = onces.pop();

                this.removeListener(entry.type, entry.listener, entry.scope);
            }
        }
    }
}
