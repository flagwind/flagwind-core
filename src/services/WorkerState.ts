namespace flagwind
{
    /**
     * 关于工作器的状态信息。
     * @enum
     * @version 1.0.0
     */
    export const enum WorkerState
    {
        /**
         * 未运行/已停止。
         * @member
         */
        stopped = 0,
        
        /**
         * 正在启动中。
         * @member
         */
        starting = 1,
        
        /**
         * 运行中。
         * @member
         */
        running = 2,

        /**
         * 正在暂停中。
         * @member
         */
        pausing = 3,

        /**
         * 已暂停。
         * @member
         */
        paused = 4,
        
        /**
         * 正在恢复中。
         * @member
         */
        resuming = 5,

        /**
         * 正在停止中。
         * @member
         */
        stopping = 6
    }
}
