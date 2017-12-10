namespace flagwind
{
    /**
     * 定义用于添加或删除事件侦听器的方法，检查是否已注册特定类型的事件侦听器，并调度事件。
     * @interface
     * @version 1.0.0
     */
    export interface IEventProvider
    {
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
        addListener(type: string, listener: Function, scope?: any, once?: boolean): void;

        /**
         * 移除侦听器。如果没有注册任何匹配的侦听器，则对此方法的调用没有任何效果。
         * @param  {string} type 事件类型。
         * @param  {Function} listener 处理事件的侦听器函数。
         * @param  {any} scope? 侦听函数绑定的 this 对象。
         * @returns void
         */
        removeListener(type: string, listener: Function, scope?: any): void;
        
        /**
         * 检查是否为特定事件类型注册了侦听器。
         * @param  {string} type 事件类型。
         * @returns boolean 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
         */
        hasListener(type: string): boolean;
        
        /**
         * 派发一个指定类型的事件。
         * @param  {string} type 事件类型。
         * @param  {any} data? 事件数据。
         * @returns void
         */
        dispatchEvent(type: string, data?: any): void;
        
        /**
         * 派发一个指定参数的事件。
         * @param  {EventArgs} eventArgs 事件参数实例。
         * @returns void
         */
        dispatchEvent(args: EventArgs): void;
    }
}
