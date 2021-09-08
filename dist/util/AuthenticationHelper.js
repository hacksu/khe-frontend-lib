"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHelper = void 0;
class AuthHelper {
    static authenticate(user, config = {}) {
        config.auth = {
            username: user.key,
            password: user.token
        };
        return config;
    }
}
exports.AuthHelper = AuthHelper;
