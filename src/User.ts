import { Application } from './Application'
import { IValidatable } from './index'

export class User implements IValidatable{
    _id: string;
    email: string;
    password: string;
    key: string;
    role: string;
    application : Application;
    isValid() { return false; }
    getValidator() { return null; }
}