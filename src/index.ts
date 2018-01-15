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
    currentUser : User;
    requestReplayer: ()=>any[];
    
    constructor(apiBase: string, clientId: string, axiosInst = axios.create({ baseURL: apiBase }))
    {
        this._apiBase = apiBase;
        this._clientId = clientId;
        this._axios = axiosInst;
    }
    
    login(email: string, password: string)
    {
        var self = this;
        var _email = email;
        return this._axios.post(this._apiBase + '/users/token', {
                client : this._clientId,
                email: email,
                password: password 
        })
        .then((response: any) => {
            self.currentUser = response.data;
            self.currentUser.tokenExpiration = Date.parse(response.data.expires);
            self.currentUser.email = _email;
        })
        .catch((err: any) => {
            throw err;
        });
    }
}