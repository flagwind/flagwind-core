namespace flagwind
{
    /**
     * 命令表达式类，提供命令的名称路径与参数选项等信息。
     * @class
     * @version 1.0.0
     */
    export class CommandExpression
    {
        private _name: string;
        private _path: string;
        private _fullPath: string;
        private _anchor: PathAnchor;
        private _options: CommandOptionCollection;
        private _arguments: Array<string>;
        private _next: CommandExpression = null;
        
        /**
         * 获取命令名称。
         * @property
         * @returns string
         */
        public get name(): string
        {
            return this._name;
        }
        
        /**
         * 获取命令的路径(不包含名称)。
         * @property
         * @returns string
         */
        public get path(): string
        {
            return this._path;
        }
        
        /**
         * 获取命令的完整路径(包含名称)。
         * @property
         * @returns string
         */
        public get fullPath(): string
        {
            return this._fullPath;
        }
        
        /**
         * 获取命令的锚定点。
         * @property
         * @returns PathAnchor
         */
        public get anchor(): PathAnchor
        {
            return this._anchor;
        }

        /**
         * 获取命令的所有选项。
         * @property
         * @returns CommandOptionCollection
         */
        public get options(): CommandOptionCollection
        {
            return this._options;
        }
        
        /**
         * 获取命令的所有参数。
         * @property
         * @returns string
         */
        public get arguments(): Array<string>
        {
            return this._arguments;
        }
        
        /**
         * 获取获设置当前命令的下一个串联命令表达式。
         * @property
         * @returns CommandExpression
         */
        public get next(): CommandExpression
        {
            return this._next;
        }
        
        /**
         * 获取或设置当前命令的下一个串联命令表达式。
         * @property
         * @param  {CommandExpression} value
         */
        public set next(value: CommandExpression)
        {
            this._next = value;
        }
        
        /**
         * 初始化命令表达式的新实例。
         * @param  {PathAnchor} anchor 锚定点。
         * @param  {string} name 命令名称。
         * @param  {string} path 命令路径。
         * @param  {Map} options 命令选项。
         * @param  {string[]} ...args 命令参数。
         */
        public constructor(anchor: PathAnchor, name: string, path: string, options: Map<string, string>, ...args: Array<string>)
        {
            if(!name)
            {
                throw new ArgumentException("name");
            }
            
            // 修缮传入的路径参数值
            path = StringUtils.trim(path, "/", " ", "\t", "\r", "\n");

            this._anchor = anchor;
            this._name = name.trim();

            switch(anchor)
            {
                case PathAnchor.root:
                {
                    if(!path)
                    {
                        this._path = "/";
                    }
                    else
                    {
                        this._path = "/" + path + "/";
                    }

                    break;
                }
                case PathAnchor.current:
                {
                    if(!path)
                    {
                        this._path = "./";
                    }
                    else
                    {
                        this._path = "./" + path + "/";
                    }

                    break;
                }
                case PathAnchor.parent:
                {
                    if(!path)
                    {
                        this._path = "../";
                    }
                    else
                    {
                        this._path = "../" + path + "/";
                    }

                    break;
                }
                default:
                {
                    if(!path)
                    {
                        this._path = "";
                    }
                    else
                    {
                        this._path = path + "/";
                    }

                    break;
                }
            }
            
            this._fullPath = this._path + this._name;
            this._options = new CommandOptionCollection(options);
            this._arguments = args || new Array<string>();
        }
        
        /**
         * 将指定的文本解析为一个命令表达式。
         * @static
         * @param  {string} text 命令文本。
         * @returns CommandExpression 命令表达式。
         */
        public static parse(text: string): CommandExpression
        {
            return CommandExpressionParser.instance.parse(text);
        }
    }
}
