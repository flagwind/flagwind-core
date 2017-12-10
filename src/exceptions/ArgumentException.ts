/// <reference path="./Exception" />

namespace flagwind
{
    /**
     * 当向方法提供的参数之一无效时引发的异常。
     * @class
     * @version 1.0.0
     */
    export class ArgumentException extends Exception
    {
        public constructor(message?: string)
        {
            super(message);
        }
    }
}
