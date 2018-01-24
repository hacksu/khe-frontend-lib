import { AxiosInstance } from 'axios'
import { Config } from './util/config'

export class ExplicitServiceClass {
    readonly _config : Config;
    readonly _axios : AxiosInstance;

    config() {
        return this._config;
    }

    axios() {
        return this._axios;
    }

    constructor(axios: AxiosInstance, config: Config) {
        this._axios = axios;
        this._config = config;
    }
}

export abstract class ServiceClass extends ExplicitServiceClass {
    constructor(other: ExplicitServiceClass) {
        super(other._axios, other._config);
    }
}