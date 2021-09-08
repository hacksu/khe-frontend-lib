"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestType = void 0;
var RequestType;
(function (RequestType) {
    RequestType[RequestType["GET"] = 0] = "GET";
    RequestType[RequestType["DELETE"] = 1] = "DELETE";
    RequestType[RequestType["HEAD"] = 2] = "HEAD";
    RequestType[RequestType["POST"] = 3] = "POST";
    RequestType[RequestType["PUT"] = 4] = "PUT";
    RequestType[RequestType["PATCH"] = 5] = "PATCH";
})(RequestType = exports.RequestType || (exports.RequestType = {}));
class AxiosInstanceMock {
    setResponse(response) {
        this._response = response;
    }
    getLastRequest() {
        return this._lastRequest;
    }
    request(config) {
        this._lastRequest = { config: config };
        return Promise.resolve(this._response);
    }
    get(url, config) {
        this._lastRequest = { url: url, method: RequestType.GET, config: config };
        return Promise.resolve(this._response);
    }
    delete(url, config) {
        this._lastRequest = { url: url, method: RequestType.DELETE, config: config };
        return Promise.resolve(this._response);
    }
    head(url, config) {
        this._lastRequest = { url: url, method: RequestType.HEAD, config: config };
        return Promise.resolve(this._response);
    }
    post(url, data, config) {
        this._lastRequest = { url: url, method: RequestType.POST, config: config };
        return Promise.resolve(this._response);
    }
    put(url, data, config) {
        this._lastRequest = { url: url, method: RequestType.PUT, config: config };
        return Promise.resolve(this._response);
    }
    patch(url, data, config) {
        this._lastRequest = { url: url, method: RequestType.PATCH, config: config };
        return Promise.resolve(this._response);
    }
}
exports.default = AxiosInstanceMock;
