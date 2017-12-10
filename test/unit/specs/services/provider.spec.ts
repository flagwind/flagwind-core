/*!
 * This file is part of `services` module. 
 * 
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-2017 Flagwind Inc. All rights reserved. 
 */

import { assert } from "chai";
import flagwind from "dist/flagwind";
import Type = flagwind.Type;
import Set = flagwind.Set;
import ServiceProvider = flagwind.ServiceProvider;
import ServiceProviderFactory = flagwind.ServiceProviderFactory;
import IWorker = flagwind.IWorker;
import WorkerBase = flagwind.WorkerBase;
import BroadcastWorker from "./workers/broadcast_worker";
import HeartbeatWorker from "./workers/heartbeat_worker";
import MessageWorker from "./workers/message_worker";
import { Department, Employee, Person, Address } from "../../models";

describe("ServiceProviderTest", () =>
{
    const provider1 = new ServiceProvider();
    const provider2 = new ServiceProvider();
    const provider3 = new ServiceProvider();
    const defaultProvider = ServiceProviderFactory.instance.default;

    defaultProvider.register("string", "I'm a service.");
    defaultProvider.register("number", 1000);
    
    provider1.register("WK1", new BroadcastWorker());
    provider1.register(Address);
    
    provider2.register("WK2", new HeartbeatWorker());
    provider2.register(Department);

    provider3.register("WK3", new MessageWorker());
    provider3.register(Employee);

    /**
     * 服务解析测试。
     */
    it("resolveTest", () =>
    {
        let worker: IWorker;
        
        // 测试以类型的方式获取服务
        worker = provider1.resolve<IWorker>(WorkerBase);
        assert.isNotNull(worker);
        assert.equal("broadcast", worker.name);

        // 测试以名称的方式获取服务
        worker = provider1.resolve<IWorker>("WK1");
        assert.isNotNull(worker);
        assert.equal("broadcast", worker.name);

        // 测试不能跨容器获取服务
        worker = provider1.resolve<IWorker>("WK2");
        assert.isNull(worker);

        // 测试当前容器获取不到，则从默认容器中获取
        assert.isNotNull(provider1.resolve("string"));
        assert.isNotNull(provider2.resolve("string"));
        assert.isNotNull(provider3.resolve("string"));

        // 将二号服务容器加入到一号服务容器中
        provider1.register(provider2);
        
        // 测试从子容器中查找
        worker = provider1.resolve<IWorker>("WK2");
        assert.isNotNull(worker);
        assert.equal("heartbeat", worker.name);

        // 测试不能跨容器获取服务
        worker = provider1.resolve<IWorker>("WK3");
        assert.isNull(worker);

        // 将三号服务容器加入到二号服务容器中
        provider2.register(provider3);
            
        // 将一号服务容器加入到三号服务容器中（形成循环链）
        provider3.register(provider1);

        worker = provider1.resolve<IWorker>("WK3");
        assert.isNotNull(worker);
        assert.equal("message", worker.name);

        let address = provider1.resolve<Address>(Address);
        assert.isNotNull(address);

        let department = provider1.resolve<Department>(Department);
        assert.isNotNull(department);

        let employee = provider1.resolve<Employee>(Employee);
        assert.isNotNull(employee);

        assert.isNotNull(provider1.resolve<number>(Number));
        assert.isNotNull(provider2.resolve<number>(Number));
        assert.isNotNull(provider3.resolve<number>(Number));

        // 测试不存在的服务
        assert.isNull(provider1.resolve<Set<number>>(Set));
        assert.isNull(provider1.resolve("NoExisted"));
    });
});
