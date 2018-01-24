"use strict";
exports.__esModule = true;
var DEBUG = true;
var log = /** @class */ (function () {
    function log() {
    }
    log.debug = function (obj) {
        if (DEBUG) {
            console.log(obj);
        }
    };
    return log;
}());
exports.log = log;
