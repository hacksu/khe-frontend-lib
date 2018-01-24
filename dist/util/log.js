"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
class log {
    static debug(obj) {
        if (config_1.DEBUG) {
            console.log(obj);
        }
    }
}
exports.log = log;
