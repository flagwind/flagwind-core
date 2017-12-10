namespace flagwind
{
    /**
     * 表示工作器状态改变后的事件参数。
     * @class
     * @version 1.0.0
     */
    export class WorkerStateChangedEventArgs extends EventArgs
    {
        /**
         * 操作名称。
         * @readonly
         * @member
         */
        public readonly actionName: string;

        /**
         * 发生改变的状态。
         * @readonly
         * @member
         */
        public readonly state: WorkerState;

        /**
         * 表示在发生状态改变时产生的异常。
         * @readonly
         * @member
         */
        public readonly error: Error;
        
        /**
         * 初始化 WorkerStateChangedEventArgs 类的新实例。
         * @param {string} type 事件类型。
         * @param  {string} actionName 操作名称。
         * @param  {WorkerState} state 发生改变的状态。
         * @param  {Error} error? 发生状态改变时产生的异常。
         */
        public constructor(type: string, actionName: string, state: WorkerState, error?: Error)
        {
            super(type);
            
            this.actionName = actionName;
            this.state = state;
            this.error = error;
        }
    }
}
