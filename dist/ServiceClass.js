"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExplicitServiceClass {
    config() {
        return this._config;
    }
    axios() {
        return this._axios;
    }
    constructor(axios, config) {
        this._axios = axios;
        this._config = config;
    }
}
exports.ExplicitServiceClass = ExplicitServiceClass;
class ServiceClass extends ExplicitServiceClass {
    constructor(other) {
        super(other._axios, other._config);
    }
}
exports.ServiceClass = ServiceClass;
