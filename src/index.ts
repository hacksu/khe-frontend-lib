import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance, AxiosAdapter, AxiosBasicCredentials } from 'axios';
import { User } from './User'
import { log } from './util/log'
import { Config } from './util/config';
import { ExplicitServiceClass, ServiceClass } from './ServiceClass';

import { UserManager } from './UserManager'
import { SponsorLoader } from './Sponsor';

export interface IValidatable
{
    isValid(): boolean
}

export class ApiWrapper extends ExplicitServiceClass
{
    readonly sponsorSource: SponsorLoader;
    readonly userManager: UserManager;
    
    constructor(config: Config, axiosInst: AxiosInstance = axios.create({ baseURL: config.api_base }))
    {
        super(axiosInst, config);

        this.userManager = new UserManager(this);
        this.sponsorSource = new SponsorLoader(this);
    }
}