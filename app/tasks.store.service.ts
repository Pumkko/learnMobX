import { action, autorun, computed, makeObservable, observable, observe } from "mobx";
import { Task } from "./task.model";

export class TasksStoreService {
    totalTaskTodo = 0;
    totalCompletedTask = 0;

    private tasks: Task[] = [];
    private _currentTaskIndex = 0;

    constructor() {
        makeObservable(this,
            {
                totalTaskTodo: observable,
                totalCompletedTask: observable,
                currentTask: computed,
                completeTask: action,
                addTask: action
            });
    }

    get currentTask(): string {
        return this.tasks[this._currentTaskIndex].task;
    }

    addTask(task: string): void {
        this.totalTaskTodo++;
        this.tasks.push({
            completed: false,
            task
        });
    }

    completeTask(): void {
        const task = this.tasks[this._currentTaskIndex];
        task.completed = true;

        this._currentTaskIndex++;
        this.totalCompletedTask++;
    }
}