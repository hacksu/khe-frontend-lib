"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
class Application {
    constructor(data) {
        this._onServer = false;
        for (let key in data) {
            // @ts-ignore: Doesn't understand how to merge
            this[key] = data[key];
        }
    }
    isValid() { return false; }
}
exports.Application = Application;
