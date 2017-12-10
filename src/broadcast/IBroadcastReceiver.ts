namespace flagwind
{
    /**
     * 广播接收器接口。
     * @interface
     * @version 1.0.0
     */
    export interface IBroadcastReceiver
    {
        /**
         * 当接收到广播时调用的方法。
         * @param  {BroadcastContext} context 广播上下文实例。
         * @returns void
         */
        receive(context: BroadcastContext): void;
    }
}
