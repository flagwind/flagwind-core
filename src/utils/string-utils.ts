/**
 * Authors:
 *   @author jason <jasonsoop@gmail.com>
 * 
 * @module utils
 * @license Licensed under the MIT License.
 * @copyright Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

const chars = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

export class StringUtils
{
    public static trim(text: string, ...chars: Array<string>): string
    {
        for(let char of chars)
        {
            text = text.replace(new RegExp("^" + char + "+|" + char + "+$", "g"), "");
        }

        return text.trim();
    }

    public static isMobile(text: string)
    {
        return /^1[34578]\d{9}$/.test(text);
    }
    
    public static isPassword(text: string)
    {
        // tslint:disable-next-line:no-magic-numbers
        return text.length >= 6 && text.length <= 16;
    }
    
    public static generateRandom(count: number): string
    {
        let result = "";
        
        for(let i = 0; i < count; i ++)
        {
            // tslint:disable-next-line:no-magic-numbers
            let id = Math.ceil(Math.random() * 35);
            
            result += chars[id];
        }

        return result;
    }
}
