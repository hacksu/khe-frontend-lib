import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance } from 'axios';

export interface Validator
{
    isValid(object: any): boolean;
}

export interface Validatable
{
    isValid(): boolean
    getValidator(): Validator|null;
}

export class User implements Validatable{
    _id: string;
    email: string;
    password: string;
    key: string;
    role: string;
    application : Application;
    isValid() { return false; }
    getValidator() { return null; }
}
 
export class Application
{
    name: string;           // full name
    school: string;         // name of school
    phone: string;          // phone number
    shirt: string;          // t-shirt size
    demographic: boolean;   // allowed to use demographic info?
    first: boolean;         // is this your first hackathon?
    dietary: string[];        // food restrictions seperated by |
    year: string;           // the year in school
    age: string;            // person's age
    gender: string;         // gender
    major: string;          // degree
    conduct: boolean;       // agree to MLH code of conduct?
    travel: boolean;        // need travel reimbursement?
    waiver: boolean;        // agreed to waiver?
    resume: string;         // the filename of their resume
    link: string;           // a github/linkedin link
    extra: string;
}

export class ApiWrapper
{
    private _axios: AxiosInstance;           // AXIOS implementation
    private _apiBase: string;
    private _clientId: string;
    currentUser : User|null = null;             // Null if not logged in.
    requestReplayer: ()=>any[];
    
    constructor(apiBase: string, clientId: string, _axios = axios.create())
    {
        this._apiBase = apiBase;
        this._clientId = clientId;
        this._axios = _axios;
    }
    
    login(username: string, password: string)
    {
        return this._axios.get(this._apiBase + '/token', { 
            data: {
                client : this._clientId,
                email: username,
                password: password
            }
        })
        .then((response: any) => {
            this.currentUser = response.data;
        })
    }
}