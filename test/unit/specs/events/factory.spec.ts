/*!
 * This file is part of `events` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import flagwind from "dist/flagwind";
import EventArgs = flagwind.EventArgs;
import EventProvider = flagwind.EventProvider;
import EventProviderFactory = flagwind.EventProviderFactory;

class Button
{

}

class CheckBox
{
    
}

describe("EventProviderFactoryTest", () =>
{
    const button = new Button();
    const checkBox = new CheckBox();
    
    /**
     * 测试获取事件提供程序。
     */
    it("getProviderTest", () =>
    {
        const factory = EventProviderFactory.instance;
        
        const provider1 = factory.getProvider(button);
        const provider2 = factory.getProvider(checkBox);
        
        assert.isNotNull(provider1);
        assert.isNotNull(provider2);

        provider1.addListener("something", (e: EventArgs) => { console.log(e); });

        assert.isTrue(provider1.hasListener("something"));
    });
});
