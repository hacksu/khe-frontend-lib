import { Application } from './Application'
import { IValidatable } from './index'

export class User implements IValidatable{
    _id: string;
    email: string;
    key: string;
    role: string;
    application : Application;
    token: string;
    tokenExpiration: number;
    refresh: string;
    isValid() { return false; }
}