namespace flagwind
{
    /**
     * 提供一种用于释放非托管资源的机制。
     * @interface
     * @version 1.0.0
     */
    export interface IDisposable
    {
        /**
         * 执行与释放或重置非托管资源关联的应用程序定义的任务。
         * @returns void
         */
        dispose(): void;
    }
}
