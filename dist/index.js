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
var axios_1 = require("axios");
var ServiceClass_1 = require("./ServiceClass");
var UserManager_1 = require("./UserManager");
var Sponsor_1 = require("./Sponsor");
var TicketManager_1 = require("./TicketManager");
var ApiWrapper = /** @class */ (function (_super) {
    __extends(ApiWrapper, _super);
    function ApiWrapper(config, axiosInst) {
        if (axiosInst === void 0) { axiosInst = axios_1["default"].create({ baseURL: config.api_base }); }
        var _this = _super.call(this, axiosInst, config) || this;
        _this.userManager = new UserManager_1.UserManager(_this);
        _this.sponsorSource = new Sponsor_1.SponsorLoader(_this);
        _this.ticketManager = new TicketManager_1.TicketManager(_this);
        return _this;
    }
    return ApiWrapper;
}(ServiceClass_1.ExplicitServiceClass));
exports.ApiWrapper = ApiWrapper;
