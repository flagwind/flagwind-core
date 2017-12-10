namespace flagwind
{
    /**
     * 表示工作台的接口，包含对工作台的基本行为特性的定义。
     * @interface
     * @version 1.0.0
     */
    export interface IWorkbench extends IEventProvider
    {
        /**
         * 当工作台正在打开时产生的事件。
         * @event EventArgs
         */
        readonly OPENING: string;
        
        /**
         * 当工作台被打开后产生的事件。
         * @event EventArgs
         */
        readonly OPENED: string;

        /**
         * 当工作台正在取消激活时产生的事件。
         * @event EventArgs
         */
        readonly DEACTIVATING: string;

        /**
         * 当工作台取消激活后产生的事件。
         * @event EventArgs
         */
        readonly DEACTIVATED: string;

        /**
         * 当工作台正在激活时产生的事件。
         * @event EventArgs
         */
        readonly ACTIVATING: string;

        /**
         * 当工作台正在关闭时产生的事件。
         * @event CancelEventArgs
         */
        readonly CLOSING: string;

        /**
         * 当工作台被关闭后产生的事件。
         * @event EventArgs
         */
        readonly CLOSED: string;
        
        /**
         * 当工作台标题被更改后产生的事件。
         * @event EventArgs
         */
        readonly TITLE_CHANGED: string;
        
        /**
         * 获取工作台状态。
         * @property
         */
        status: WorkbenchStatus;

        /**
         * 获取或设置工作台标题。
         * @property
         */
        title: string;
        
        /**
         * 打开工作台。
         * @async
         * @param  {Array<string>} args
         * @returns void
         */
        open(args: Array<string>): Promise<void>;
        
        /**
         * 关闭工作台。
         * @async
         * @returns boolean
         */
        close(): Promise<boolean>;
        
        /**
         * 取消激活工作台。
         * @returns void
         */
        deactivate(): void;
        
        /**
         * 激活工作台。
         * @returns void
         */
        activate(): void;
    }
}
