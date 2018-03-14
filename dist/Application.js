"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
