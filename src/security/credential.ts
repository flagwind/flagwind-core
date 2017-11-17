/*!
 * @file This file is part of `security` module. 
 * 
 * Authors:
 *      @author jason <jasonsoop@gmail.com>
 * 
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

/**
 * 表示用户的安全凭证。
 * @interface
 * @version 1.0.0
 */
export interface ICredential
{
    /**
     * 获取安全凭证编号。
     * @member
     * @returns string
     */
    credentialId: string;
    
    /**
     * 获取安全凭证对应的用户编号。
     * @member
     * @returns string
     */
    userId: string;

    /**
     * 获取安全凭证的过期时间。
     * @member
     * @returns Date
     */
    expires: Date;
}
