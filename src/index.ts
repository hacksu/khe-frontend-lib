import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance, AxiosAdapter, AxiosBasicCredentials } from 'axios';
import { User } from './User'
import { IValidatable } from './index'
import { AuthHelper } from './util/AuthenticationHelper'
import { log } from './util/log'

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
            log.debug([ApiWrapper, 'Login Success', self.currentUser]);
            self.loadUserApplication(self.currentUser);
        })
        .catch((err: any) => {
            throw err;
        });
    }

    loadUserApplication(user: User) {
        var _user = user;
        this._axios.request(AuthHelper.authenticate(user, {
            url: '/users/me/application'
        })).then((res) => {
            _user.application = res.data.application;
            log.debug([ApiWrapper, 'Loaded User Application', _user.application])
        }).catch((err) => {
            throw err;
        })
    }
}