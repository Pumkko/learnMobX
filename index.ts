import { observable } from "mobx";
import { TasksStoreService } from "./app/tasks.store.service";
import { TokenStoreService } from "./app/token.store.service";
import { WebService } from "./app/web.service";

console.log('running');

testMobXWithTokenService();

console.log('done running');

function testMobXWithTokenService() {
    const tokenStoreService = new TokenStoreService();
    const tasksStore = new TasksStoreService();

    const webService = new WebService(tokenStoreService, tasksStore);

    tasksStore.addTask('coding');
    tasksStore.addTask('compiling');
    tokenStoreService.setToken("valid token number 1");

    webService.sendRequest();

    tokenStoreService.setToken("valid token number 2");
    webService.sendRequest();    

    // Everything will be done after the previous sendRequest, the following instructions are just here to ensure that 
    // only the autorun for setToken is called. After the previous statement webService should complete dispose of its autorun for the tasks Store

    tasksStore.addTask('debugging');
    tokenStoreService.setToken("valid token number 3");
    webService.sendRequest();

}

