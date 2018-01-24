import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance, AxiosAdapter, AxiosBasicCredentials } from 'axios';
import { User } from './User'
import { IValidatable } from './index'
import { log } from './util/log'
import { SponsorLoader } from './Sponsor';
import { API_BASE } from './config/config';
import { UserManager } from './UserManager'

export interface IValidatable
{
    isValid(): boolean
}

export class ApiWrapper
{
    private _axios: AxiosInstance;           // AXIOS implementation
    requestReplayer: ()=>any[];

    public readonly sponsorSource: SponsorLoader;
    public readonly userManager: UserManager;
    
    constructor(axiosInst: AxiosInstance = axios.create({ baseURL: API_BASE }))
    {
        this._axios = axiosInst;

        this.userManager = new UserManager(this._axios);
        this.sponsorSource = new SponsorLoader(this._axios);
    }
 
    getServerConnection(): AxiosInstance {
        return this._axios;
    }
}