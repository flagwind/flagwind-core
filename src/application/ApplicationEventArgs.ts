/// <reference path="../events/EventArgs" />

namespace flagwind
{
    /**
     * 应用程序事件参数类。
     * @class
     * @version 1.0.0
     */
    export class ApplicationEventArgs extends EventArgs
    {
        /**
         * 获取应用程序上下文实例。
         * @member
         */
        public readonly context: ApplicationContextBase;
        
        /**
         * 初始化应用程序事件参数类的新实例。
         * @param  {string} type 事件类型。
         * @param  {ApplicationContextBase} context 应用程序上下文实例。
         */
        public constructor(type: string, context: ApplicationContextBase)
        {
            super(type);
            
            this.context = context;
        }
    }
}
