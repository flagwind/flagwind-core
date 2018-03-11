namespace flagwind
{
    /**
     * 应用程序类，负责整个应用的启动和退出。
     * @static
     * @class
     * @version 1.0.0
     */
    export class Application
    {
        private static _isStarted: boolean = false;                         // 标识应用程序是否启动完成
        private static _context: ApplicationContextBase = null;             // 应用程序上下文实例
        private static _eventProvider: IEventProvider;                      // 事件提供程序
        
        /**
         * 获取一个事件提供程序实例。
         * @private
         * @property
         * @returns IEventProvider
         */
        private static get eventProvider(): IEventProvider
        {
            if(!this._eventProvider)
            {
                this._eventProvider = new EventProvider(this);
            }

            return this._eventProvider;
        }

        /** 
         * 获取一个布尔值，表示当前应用是否启动完成。
         * @static
         * @property
         * @returns boolean
         */
        public static get isStarted(): boolean
        {
            return this._isStarted;
        }
        
        /**
         * 获取应用程序上下文实例。
         * @static
         * @property
         * @returns ApplicationContextBase
         */
        public static get context(): ApplicationContextBase
        {
            return this._context;
        }
        
        /**
         * 当应用程序启动时产生的事件。
         * @event ApplicationEventArgs
         */
        public static STARTING: string = "starting";
        
        /**
         * 当应用程序启动后产生的事件。
         * @event ApplicationEventArgs
         */
        public static STARTED: string = "started";
        
        /**
         * 当应用程序即将退出时产生的事件。
         * @event CancelEventArgs
         */
        public static EXITING: string = "exiting";
        
        /**
         * 启动应用程序。
         * @static
         * @param  {ApplicationContextBase} context 应用程序上下文实例。
         * @param  {Array<string>} args 启动参数。
         * @returns void
         */
        public static start(context: ApplicationContextBase, args?: Array<string>): void
        {
            if(!context)
            {
                throw new ArgumentException("context");
            }
            
            if(this._isStarted)
            {
                return;
            }
            
            // 激发 "starting" 事件
            this.dispatchEvent(new ApplicationEventArgs(this.STARTING, context));
            
            try
            {
                // 保存应用程序上下文
                this._context = context;
                
                // 将应用上下文对象注册到默认服务容器中
                context.serviceFactory.default.register("applicationContext", context);

                // 初始化全局模块
                this.initializeGlobalModules(context);
                
                // 获取工作台对象
                let workbench = context.getWorkbench(args);

                // 如果工作台对象不为空则运行工作台
                if(workbench)
                {
                    // 挂载工作台打开事件
                    workbench.addListener(workbench.OPENED, (e: EventArgs) =>
                    {
                        // 标识应用程序启动完成
                        this._isStarted = true;
                        
                        // 激发 "started" 事件
                        this.dispatchEvent(new ApplicationEventArgs(this.STARTED, context));
                    });

                    // 挂载工作台关闭事件
                    workbench.addListener(workbench.CLOSED, (e: EventArgs) =>
                    {
                        this.exit();
                    });

                    // 启动工作台
                    workbench.open(args);
                }
            }
            catch(ex)
            {
                // 应用无法启动，写入日志
                Logger.error(this, ex);
                
                // 重抛异常
                throw ex;
            }
        }
        
        /**
         * 关闭当前应用程序。
         * @static
         * @returns void
         */
        public static exit(): void
        {
            let context = this._context;

            // 如果上下文对象为空，则表示尚未启动
            if(!context)
            {
                return;
            }

            // 重置启动标记
            this._isStarted = false;

            // 创建取消事件参数
            let args = new CancelEventArgs(this.EXITING, this);

            // 激发 "exiting" 事件
            this.dispatchEvent(args);

            // 判断是否取消退出，如果是则退出
            if(args.cancel)
            {
                return;
            }

            // 关闭工作台
            if(context.workbench)
            {
                context.workbench.close();
            }
            
            // 卸载全局模块
            this.disposeGlobalModules(context);

            // 释放应用程序上下文
            this._context = null;
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
        public static addListener(type: string, listener: Function, scope?: any, once?: boolean): void
        {
            this.eventProvider.addListener(type, listener, scope, once);
        }
        
        /**
         * 移除侦听器。如果没有注册任何匹配的侦听器，则对此方法的调用没有任何效果。
         * @param  {string} type 事件类型。
         * @param  {Function} listener 处理事件的侦听器函数。
         * @param  {any} scope? 侦听函数绑定的 this 对象。
         * @returns void
         */
        public static removeListener(type: string, listener: Function, scope?: any): void
        {
            this.eventProvider.removeListener(type, listener, scope);
        }
        
        /**
         * 派发一个指定参数的事件。
         * @param  {EventArgs} eventArgs 事件参数实例。
         * @returns void
         */
        public static dispatchEvent(args: EventArgs): void
        {
            this.eventProvider.dispatchEvent(args);
        }
        
        /**
         * 初始化全局模块。
         * @private
         * @static
         * @param  {ApplicationContextBase} context
         * @returns void
         */
        private static initializeGlobalModules(context: ApplicationContextBase): void
        {
            context.modules.forEach((module, modules) =>
            {
                if(module)
                {
                    module.initialize(context);
                }
            });
        }
        
        /**
         * 卸载全局模块。
         * @private 
         * @static
         * @param  {ApplicationContextBase} context
         * @returns void
         */
        private static disposeGlobalModules(context: ApplicationContextBase): void
        {
            context.modules.forEach((module, modules) =>
            {
                if(module)
                {
                    module.dispose();
                }
            });
        }
    }
}
