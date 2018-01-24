"use strict";
exports.__esModule = true;
var AuthHelper = /** @class */ (function () {
    function AuthHelper() {
    }
    AuthHelper.authenticate = function (user, config) {
        if (config === void 0) { config = {}; }
        config.auth = {
            username: user.key,
            password: user.token
        };
        return config;
    };
    return AuthHelper;
}());
exports.AuthHelper = AuthHelper;
