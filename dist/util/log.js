"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEBUG = true;
class log {
    static debug(obj) {
        if (DEBUG) {
            console.log(obj);
        }
    }
}
exports.log = log;
