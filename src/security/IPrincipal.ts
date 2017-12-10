namespace flagwind
{
    /**
     * 定义用户对象的基本功能。
     * @interface
     * @version 1.0.0
     */
    export interface IPrincipal
    {
        /**
         * 获取当前用户的凭证。
         * @property
         * @return string
         */
        credential: ICredential;

        /**
         * 获取当前用户是否为有效。
         * @property
         * @return boolean
         */
        isAuthenticated: boolean;
    }
}
