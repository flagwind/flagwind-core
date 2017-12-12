namespace flagwind
{
    /**
     * 标注当前类型是一个可通过命令执行器执行的命令。
     * @param  {string} path
     */
    export function command(path: string)
    {
        if(!path)
        {
            throw new InvalidOperationException("The command path is empty.");
        }
        
        return function(commandType: Function)
        {
            if(!Type.isAssignableFrom(CommandBase, commandType))
            {
                throw new InvalidOperationException(`The class '${Type.getQualifiedClassName(commandType)}' is not a command type.`);
            }
            
            // 生成命令实例
            let command = <ICommand>Activator.createInstance(commandType);
            
            // 注册至默认的执行器中
            CommandExecutor.default.register(path, command);
        };
    }
}
