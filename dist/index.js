"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Sponsor_1 = require("./Sponsor");
const UserManager_1 = require("./UserManager");
const ServiceClass_1 = require("./ServiceClass");
class ApiWrapper extends ServiceClass_1.ExplicitServiceClass {
    constructor(config, axiosInst = axios_1.default.create({ baseURL: config.api_base })) {
        super(axiosInst, config);
        let expServiceClass = new ServiceClass_1.ExplicitServiceClass(axiosInst, config);
        this.userManager = new UserManager_1.UserManager(expServiceClass);
        this.sponsorSource = new Sponsor_1.SponsorLoader(expServiceClass);
    }
}
exports.ApiWrapper = ApiWrapper;
