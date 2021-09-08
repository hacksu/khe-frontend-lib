"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const DEBUG = true;
class log {
    static debug(obj) {
        if (DEBUG) {
            console.log(obj);
        }
    }
}
exports.log = log;
