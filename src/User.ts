import { Application } from './Application'
import { IValidatable } from './index'


interface UserData {
    email: string;
    key: string;
    role: string;
    application?: Application;
    token: string;
    tokenExpiration: number;
    refresh: string;
}

export class User implements IValidatable, UserData {
    constructor(data: UserData) {
        for(let key in data) {
            // @ts-ignore: Doesn't understand how to merge
            this[key] = data[key];
        }
    }

    email: string;
    key: string;
    role: string;
    application?: Application;
    token: string;
    tokenExpiration: number;
    refresh: string;

    isValid() { return false; }
}