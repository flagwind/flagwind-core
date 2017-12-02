/*!
 * This file is part of `common` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import Type from "../runtime/type";

export default class CharUtils
{
    public static isChar(char: string): boolean
    {
        return Type.isString(char) && char.length === 1;
    }
    
    public static isLatin(char: string): boolean
    {
        return char.charCodeAt(0) <= 255;
    }

    public static isAscii(char: string): boolean
    {
        return char.charCodeAt(0) <= 127;
    }
    
    public static isLetterOrDigit(char: string): boolean
    {
        if(!this.isChar(char))
        {
            return false;
        }
        
        let regex = /^[0-9a-zA-Z]*$/g;

        return regex.test(char);
    }

    public static isWhiteSpace(char: string): boolean
    {
        if(!this.isChar(char))
        {
            return false;
        }
        
        let code = char.charCodeAt(0);

        return code === 32 || code >= 9 && code <= 13 || code === 160 || code === 133;
    }
}
