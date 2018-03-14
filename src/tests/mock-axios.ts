import { AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse, AxiosPromise } from 'axios';

export enum RequestType {
    GET,
    DELETE,
    HEAD,
    POST,
    PUT,
    PATCH
}

export default class AxiosInstanceMock implements AxiosInstance {
    defaults: AxiosRequestConfig;
    interceptors: { request: AxiosInterceptorManager<AxiosRequestConfig>; response: AxiosInterceptorManager<AxiosResponse<any>>; };

    private _response: any;
    
    private _lastRequest: {config: AxiosRequestConfig}|{url: string, method: RequestType, config?: AxiosRequestConfig};

    setResponse(response: any) {
        this._response = response;
    }

    getLastRequest() {
        return this._lastRequest;
    }

    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T> {
        this._lastRequest = {config: config};
        return Promise.resolve(this._response);
    }
    get<T = any>(url: string, config?: AxiosRequestConfig | undefined): AxiosPromise<T> {
        this._lastRequest = {url: url, method: RequestType.GET, config: config};
        return Promise.resolve(this._response);
    }
    delete(url: string, config?: AxiosRequestConfig | undefined): AxiosPromise<any> {
        this._lastRequest = {url: url, method: RequestType.DELETE, config: config};

        return Promise.resolve(this._response);
    }
    head(url: string, config?: AxiosRequestConfig | undefined): AxiosPromise<any> {
        this._lastRequest = {url: url, method: RequestType.HEAD, config: config};
        return Promise.resolve(this._response);
    }
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig | undefined): AxiosPromise<T> {
        this._lastRequest = {url: url, method: RequestType.POST, config: config};
        return Promise.resolve(this._response);
    }
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig | undefined): AxiosPromise<T> {
        this._lastRequest = {url: url, method: RequestType.PUT, config: config};
        return Promise.resolve(this._response);
    }
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig | undefined): AxiosPromise<T> {
        this._lastRequest = {url: url, method: RequestType.PATCH, config: config};
        return Promise.resolve(this._response);
    }

}
