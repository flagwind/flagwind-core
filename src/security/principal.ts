/*!
 * @file This file is part of `security` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { ArgumentException } from "../exceptions";
import { LocalStorage } from "../io";
import { ICredential } from "./credential";

const CREDENTIAL_SYMBOL: string = "__principal__";

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

/**
 * 定义用户对象的基本功能。
 * @class
 * @version 1.0.0
 */
export class Principal implements IPrincipal
{
    private _credential: ICredential;                           // 安全凭证
    
    /**
     * 初始化凭票的新实例。
     * @constructor
     * @param  {ICredential} credential
     */
    public constructor(credential: ICredential)
    {
        if(!credential || !credential.credentialId || !credential.expires)
        {
            throw new ArgumentException();
        }
        
        // 保存安全凭证
        this._credential = credential;

        // 将安全凭证存入 LocalStorage 中
        LocalStorage.set(CREDENTIAL_SYMBOL, credential);
    }
    
    /**
     * 获取当前用户的凭证。
     * @property
     * @return string
     */
    public get credential(): ICredential
    {
        // 如果内存没有安全凭证，则从 LocalStorage 中获取
        if(!this._credential)
        {
            this._credential = LocalStorage.get<ICredential>(CREDENTIAL_SYMBOL);
        }
        
        return this._credential;
    }
    
    /**
     * 获取当前用户是否为有效。
     * @property
     * @return boolean
     */
    public get isAuthenticated(): boolean
    {
        let credential = this.credential;
        
        return credential && credential.expires && new Date() < credential.expires;
    }
}
