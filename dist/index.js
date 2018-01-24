"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const Sponsor_1 = require("./Sponsor");
const config_1 = require("./config/config");
const UserManager_1 = require("./UserManager");
class ApiWrapper {
    constructor(axiosInst = axios_1.default.create({ baseURL: config_1.API_BASE })) {
        this._axios = axiosInst;
        this.userManager = new UserManager_1.UserManager(this._axios);
        this.sponsorSource = new Sponsor_1.SponsorLoader(this._axios);
    }
    getServerConnection() {
        return this._axios;
    }
}
exports.ApiWrapper = ApiWrapper;
