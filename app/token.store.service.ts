import { action, autorun, makeObservable, observable } from "mobx";

export class TokenStoreService {

    token = "";

    constructor(){
        makeObservable(this, {
            token: observable,
            setToken: action,
        });
    }

    setToken(token: string): void {
        this.token = token;
    }

}