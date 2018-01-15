import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance } from 'axios';
import { User } from './User'
import { IValidatable } from './index'

export interface IValidatable
{
    isValid(): boolean
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