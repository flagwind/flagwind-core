/*!
 * This file is part of `security` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import ICredential from "./credential`1";

/**
 * 定义用户对象的基本功能。
 * @interface
 * @version 1.0.0
 */
export default interface IPrincipal
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
