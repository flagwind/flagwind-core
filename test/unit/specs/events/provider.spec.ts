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
import { Promise } from "es6-promise";
import flagwind from "dist/flagwind";
import EventProvider = flagwind.EventProvider;
import EventArgs = flagwind.EventArgs;

class Button extends EventProvider
{
    
}

describe("EventProviderTest", () =>
{
    const button = new Button();
    const provider = new EventProvider();
    const provider1 = new EventProvider();

    /**
     * 测试事件源。
     */
    it("sourceTest", () =>
    {
        const task1 = new Promise((resolve: Function) =>
        {
            button.addListener("something", (e: EventArgs) =>
            {
                assert.equal(e.source, button);
                
                resolve();
            });

            button.dispatchEvent("something", "from button");
        });

        const task2 = new Promise((resolve: Function) =>
        {
            provider.addListener("something", (e: EventArgs) =>
            {
                assert.equal(e.source, provider);

                resolve();
            });

            provider.dispatchEvent("something", "from provider");
        });

        return Promise.all([task1, task2]);
    });

    /**
     * 测试作用域。
     */
    it("scopeTest", () =>
    {
        return new Promise((resolve, reject) =>
        {
            const listener = function(e: EventArgs)
            {
                assert.equal(this, button);

                resolve();
            };
            
            provider1.addListener("something2", listener, button);

            provider1.dispatchEvent("something2");
        });
    });

    /**
     * 测试单次监听事件。
     */
    it("onceTest", () =>
    {
        const listener = (e: EventArgs) =>
        {
            // todo
        };
        
        provider1.addListener("something", listener, undefined, true);

        assert.isTrue(provider1.hasListener("something"));
        
        provider1.dispatchEvent(new EventArgs("something", "data"));

        assert.isFalse(provider1.hasListener("something"));
    });
});
