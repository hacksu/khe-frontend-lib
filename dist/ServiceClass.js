"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceClass = exports.ExplicitServiceClass = void 0;
class ExplicitServiceClass {
    constructor(axios, config) {
        this._axios = axios;
        this._config = config;
    }
    config() {
        return this._config;
    }
    axios() {
        return this._axios;
    }
}
exports.ExplicitServiceClass = ExplicitServiceClass;
class ServiceClass extends ExplicitServiceClass {
    constructor(other) {
        super(other._axios, other._config);
    }
}
exports.ServiceClass = ServiceClass;
