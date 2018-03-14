"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const ServiceClass_1 = require("./ServiceClass");
const UserManager_1 = require("./UserManager");
const ApplicationManager_1 = require("./ApplicationManager");
const Sponsor_1 = require("./Sponsor");
class ApiWrapper extends ServiceClass_1.ExplicitServiceClass {
    constructor(config, axiosInst = axios_1.default.create({ baseURL: config.api_base })) {
        super(axiosInst, config);
        this.userManager = new UserManager_1.UserManager(this);
        this.sponsorSource = new Sponsor_1.SponsorLoader(this);
        this.applicationManager = new ApplicationManager_1.ApplicationManager(this);
    }
}
exports.ApiWrapper = ApiWrapper;
