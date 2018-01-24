import { AxiosInstance } from 'axios'
import { Config } from './util/config'

export class ExplicitServiceClass {
    readonly config: Config;
    readonly axios : AxiosInstance;

    constructor(axios: AxiosInstance, config: Config) {
        this.axios = axios;
        this.config = config;
    }
}

export abstract class ServiceClass extends ExplicitServiceClass {
    constructor(other: ExplicitServiceClass) {
        super(other.axios, other.config);
    }
}