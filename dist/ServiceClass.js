"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExplicitServiceClass {
    constructor(axios, config) {
        this.axios = axios;
        this.config = config;
    }
}
exports.ExplicitServiceClass = ExplicitServiceClass;
class ServiceClass extends ExplicitServiceClass {
    constructor(other) {
        super(other.axios, other.config);
    }
}
exports.ServiceClass = ServiceClass;
