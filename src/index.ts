import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance, AxiosAdapter, AxiosBasicCredentials } from 'axios';
import { User } from './User'
import { IValidatable } from './index'
import { AuthHelper } from './util/AuthenticationHelper'
import { log } from './util/log'
import { SponsorLoader } from './Sponsor';
import { API_BASE, CLIENT_ID } from './config/config';

export interface IValidatable
{
    isValid(): boolean
}

export class ApiWrapper
{
    private static readonly localStorageKey: string = 'user';

    private _axios: AxiosInstance;           // AXIOS implementation
    currentUser : User;
    requestReplayer: ()=>any[];

    public readonly sponsorSource: SponsorLoader;
    
    constructor(axiosInst: AxiosInstance = axios.create({ baseURL: API_BASE }))
    {
        this._axios = axiosInst;
        
        let user: User|null = this.getLocalUser();
        if (user) {
            this.currentUser = user;
        }

        this.sponsorSource = new SponsorLoader(this._axios);
    }
 
    getServerConnection(): AxiosInstance {
        return this._axios;
    }

    getLocalUser(): User|null {
        let userString = localStorage.getItem(ApiWrapper.localStorageKey);
        if (userString) {
            let user: User = JSON.parse(userString);
            log.debug([ApiWrapper, 'Parsed User from localStorage', user]);
            return user;
        } else {
            return null;
        }
    }

    saveLocalUser(user: User): void {
        localStorage.setItem(ApiWrapper.localStorageKey, JSON.stringify(this.currentUser));
        log.debug(['Saved User Locally', user])
    }
    
    login(email: string, password: string): Promise<any>
    {
        var self = this;
        var _email = email;
        return this._axios.post('/users/token', {
                client : CLIENT_ID,
                email: email,
                password: password 
        })
        .then((response: any) => {
            self.currentUser = response.data;
            self.currentUser.tokenExpiration = Date.parse(response.data.expires);
            self.currentUser.email = _email;
            log.debug([ApiWrapper, 'Login Success', self.currentUser]);
            self.loadUserApplication(self.currentUser);
            self.saveLocalUser(self.currentUser);
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