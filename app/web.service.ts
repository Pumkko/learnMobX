import { action, autorun, makeObservable, observable, observe } from "mobx";
import { TasksStoreService } from "./tasks.store.service";
import { TokenStoreService } from "./token.store.service";

export class WebService {

    private token = "";

    constructor(private readonly tokenStoreService: TokenStoreService, private readonly taskStoreService: TasksStoreService) {

        autorun(() => {

            // This autorun will not be called until a change has been detected in the state of TokenStoreService

            console.log('just got a new token');
            this.token = this.tokenStoreService.token;
        })

        autorun((c) => {

            // This autorun will not be called until a change has been detected in the state of taskStoreService

            if (this.taskStoreService.totalTaskTodo !== 0 && this.taskStoreService.totalTaskTodo === this.taskStoreService.totalCompletedTask) {
                console.log('All tasks have been completed');
                c.dispose();
            }
        })
    }


    sendRequest(): void {
        console.log(`sending request with token ${this.token} for task ${this.taskStoreService.currentTask}`);
        this.taskStoreService.completeTask();
    }

}