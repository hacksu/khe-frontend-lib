"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ExplicitServiceClass = /** @class */ (function () {
    function ExplicitServiceClass(axios, config) {
        this._axios = axios;
        this._config = config;
    }
    ExplicitServiceClass.prototype.config = function () {
        return this._config;
    };
    ExplicitServiceClass.prototype.axios = function () {
        return this._axios;
    };
    return ExplicitServiceClass;
}());
exports.ExplicitServiceClass = ExplicitServiceClass;
var ServiceClass = /** @class */ (function (_super) {
    __extends(ServiceClass, _super);
    function ServiceClass(other) {
        return _super.call(this, other._axios, other._config) || this;
    }
    return ServiceClass;
}(ExplicitServiceClass));
exports.ServiceClass = ServiceClass;
