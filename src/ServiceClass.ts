import { AxiosInstance } from 'axios'

export abstract class ServiceClass {
    protected _axios : AxiosInstance;
    constructor(axios: AxiosInstance) {
        this._axios = axios;
    }
}