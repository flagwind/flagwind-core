namespace flagwind
{
    const enum CommandPathState
    {
        none,
        dot,
        doubleDot,
        slash,
        part
    }
    
    const enum CommandPairState
    {
        none,
        slash,
        assign,
        part
    }
    
    /**
     * 提供命令行文本解析功能。
     * @static
     * @class
     * @version 1.0.0
     */
    export class CommandExpressionParser implements ICommandExpressionParser
    {
        /**
         * 获取命令解析器的单实例。
         * @static
         * @member
         */
        public static readonly instance = new CommandExpressionParser();
    
        /**
         * 私有构造。
         * @private
         * @constructor
         */
        protected constructor()
        {
            
        }
    
        /**
         * 将指定的命令行文本解析成命令表达式对象。
         * @param  {string} text 指定的要解析的命令行文本。
         * @returns CommandExpression 返回解析的命令表达式对象，如果解析失败则返回空(null)。
         */
        public parse(text: string): CommandExpression
        {
            if(!text)
            {
                return null;
            }
            
            let result: CommandExpression = null,
                current: CommandExpression = null,
                reader = new StringReader(text);
            
            while(reader.peek() > 0)
            {
                current = this.onParse(reader);
    
                if(result === null)
                {
                    result = current;
                }
                // 线性查找命令表达式的管道链，并更新其指向
                else
                {
                    let previous = result;
    
                    while(previous.next !== null)
                    {
                        previous = previous.next;
                    }
    
                    previous.next = current;
                }
            }
            
            // 释放字符串读取器
            reader.dispose();
    
            return result;
        }
        
        /**
         * 根据字符串读取器解析命令表达式。
         * @protected
         * @virtual
         * @param  {StringReader} reader
         * @returns CommandExpression
         */
        protected onParse(reader: StringReader): CommandExpression
        {
            let args = new Set<string>(),
                options = new Map<string, string>(),
                anchor: PathAnchor,
                name: string,
                path: string;
                    
            // 解析命令表达式中的路径部分，如果表达式有误则该解析方法内部抛出异常
            [anchor, name, path] = CommandExpressionParser.parsePath(reader);
    
            let pair: KeyValuePair<string, string>;
    
            // 依次解析命令表达式中的选项和参数
            while((pair = CommandExpressionParser.parsePair(reader)) !== null)
            {
                if(!pair.key)
                {
                    args.add(pair.value);
                }
                else
                {
                    options.set(pair.key, pair.value);
                }
            }
    
            // 返回一个命令表达式
            return new CommandExpression(anchor, name, path, options, ...args.values());
        }
        
        /**
         * 根据字符串读取器解析路径。
         * @private
         * @static
         * @param  {StringReader} reader
         * @returns PathAnchor
         */
        private static parsePath(reader: StringReader): [PathAnchor, string, string]
        {
            let state: any = CommandPathState.none,
                parts = new Set<string>(),
                valueRead = 0,
                anchor = PathAnchor.none,
                name = "",
                path = "";
            
            while((valueRead = reader.read()) > 0)
            {
                let chr = String.fromCharCode(valueRead);
    
                // 首先对位于路径中间的点号进行转换，以方便后续的处理
                if(chr === "." && state === CommandPathState.part)
                {
                    chr = "/";
                }
    
                if(chr === ".")
                {
                    switch(state)
                    {
                        case CommandPathState.none:
                        {
                            state = CommandPathState.dot;
                            anchor = PathAnchor.current;
    
                            break;
                        }
                        case CommandPathState.dot:
                        {
                            state = CommandPathState.doubleDot;
                            anchor = PathAnchor.parent;
    
                            break;
                        }
                        default:
                        {
                            throw new InvalidOperationException("Invalid anchor of command path.");
                        }
                    }
                }
                else if(chr === "/")
                {
                    if(state === CommandPathState.slash)
                    {
                        throw new InvalidOperationException("Duplicate '/' slash characters.");
                    }
    
                    if(state === CommandPathState.none)
                    {
                        anchor = PathAnchor.root;
                    }
                    else if(state === CommandPathState.part)
                    {
                        parts.add(name);
    
                        name = "";
                    }
    
                    state = CommandPathState.slash;
                }
                else if(CharUtils.isLetterOrDigit(chr) || chr === "_")
                {
                    if(state === CommandPathState.dot || state === CommandPathState.doubleDot)
                    {
                        throw new InvalidOperationException("Missing '/' slash character between dot and letter or digit.");
                    }
                    
                    name += chr;
                    state = CommandPathState.part;
                }
                else if(CharUtils.isWhiteSpace(chr))
                {
                    if(state === CommandPathState.none)
                    {
                        continue;
                    }
                    else
                    {
                        break;
                    }
                }
                else
                {
                    throw new InvalidOperationException(`Contains '${chr}' illegal character(s) in the command path.`);
                }
            }
    
            // 如果路径以斜杠符结尾，即为非法路径格式
            if(state === CommandPathState.slash && ((parts && parts.size > 0) || anchor !== PathAnchor.root))
            {
                throw new InvalidOperationException("The command path can not at the end of '/' character.");
            }
            
            if(parts && parts.size > 0)
            {
                path = parts.values().join(".");
            }
            else if(!name)
            {
                switch(anchor)
                {
                    case PathAnchor.root:
                        name = "/";
                        break;
                    case PathAnchor.current:
                        name = ".";
                        break;
                    case PathAnchor.parent:
                        name = "..";
                        break;
                }
    
                anchor = PathAnchor.none;
            }
    
            return [anchor, name, path];
        }
        
        /**
         * 根据字符串读取器解析参数和选项。
         * @private
         * @static
         * @param  {StringReader} reader
         * @returns KeyValuePair
         */
        private static parsePair(reader: StringReader): KeyValuePair<string, string>
        {
            let quote = "\0",
                isEscaping = false,
                key = "",
                value = "",
                state: any = CommandPairState.none,
                valueRead: number;
            
            while((valueRead = reader.read()) > 0)
            {
                let chr = String.fromCharCode(valueRead);
    
                if(chr === "-" || chr === "/")
                {
                    if(state === CommandPairState.slash)
                    {
                        throw new InvalidOperationException(`Duplicate '${chr}' option indicator of command expression.`);
                    }
    
                    if(state === CommandPairState.none && quote === "\0")
                    {
                        state = CommandPairState.slash;
    
                        continue;
                    }
                }
                else if(chr === ":" || chr === "=")
                {
                    if(key && state === CommandPairState.part && (quote === "\0" && !isEscaping))
                    {
                        state = CommandPairState.assign;
    
                        continue;
                    }
                }
                else if(chr === "|")
                {
                    if(quote === "\0")
                    {
                        if(!key && !value)
                        {
                            return null;
                        }
    
                        return new KeyValuePair<string, string>(key, value);
                    }
                }
                else if(CharUtils.isWhiteSpace(chr))
                {
                    if(state === CommandPairState.slash)
                    {
                        throw new InvalidOperationException("A white-space character at the back of the option indicator.");
                    }
    
                    if(state === CommandPairState.none)
                    {
                        continue;
                    }
                    else if(quote === "\0")
                    {
                        return new KeyValuePair<string, string>(key, value);
                    }
                }
                else if(this.isQuote(chr) && !isEscaping)
                {
                    if(quote !== "\0")
                    {
                        quote = "\0";
    
                        continue;
                    }
                    else if(state !== CommandPairState.part)
                    {
                        quote = chr;
    
                        continue;
                    }
                }
    
                // 设置转义状态：即当前字符为转义符并且当前状态不为转义状态
                isEscaping = chr === "\\" && (!isEscaping);
    
                if(isEscaping)
                {
                    continue;
                }
    
                switch(state)
                {
                    case CommandPairState.slash:
                    {
                        key += chr;
    
                        break;
                    }
                    case CommandPairState.none:
                    case CommandPairState.assign:
                    {
                        value += chr;
    
                        break;
                    }
                    default:
                    {
                        if(!value)
                        {
                            key += chr;
                        }
                        else
                        {
                            value += chr;
                        }
    
                        break;
                    }
                }
    
                state = CommandPairState.part;
            }
    
            if(!key && !value)
            {
                return null;
            }
    
            return new KeyValuePair<string, string>(key, value);
        }
        
        /**
         * 检测一个 char 字符是否为引号。
         * @private
         * @static
         * @param  {string} chr
         * @returns boolean
         */
        private static isQuote(chr: string): boolean
        {
            return (chr === '"' || chr === "\'");
        }
    }
}
