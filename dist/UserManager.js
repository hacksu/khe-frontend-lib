"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const log_1 = require("./util/log");
const ServiceClass_1 = require("./ServiceClass");
class UserManager extends ServiceClass_1.ServiceClass {
    constructor(_service) {
        super(_service);
        let user = this.getLocalUser();
        if (user) {
            this.currentUser = user;
        }
    }
    getLocalUser() {
        let userString = localStorage.getItem(UserManager.localStorageKey);
        if (userString) {
            let user = JSON.parse(userString);
            log_1.log.debug([UserManager, 'Parsed User from localStorage', user]);
            return user;
        }
        else {
            return null;
        }
    }
    saveLocalUser(user) {
        this.currentUser = user;
        localStorage.setItem(UserManager.localStorageKey, JSON.stringify(this.currentUser));
        log_1.log.debug(['Saved User Locally', user]);
    }
    logout() {
        localStorage.setItem(UserManager.localStorageKey, "");
        log_1.log.debug(['Removed User Locally']);
    }
    login(email, password) {
        var self = this;
        var _email = email;
        return this.axios().post('/users/token', {
            client: super.config().client_id,
            email: email,
            password: password
        })
            .then(res => {
            let user = new User_1.User({
                email: email,
                key: res.data.key,
                role: res.data.role,
                token: res.data.token,
                tokenExpiration: Date.parse(res.data.expires),
                refresh: res.data.refresh
            });
            log_1.log.debug([UserManager, 'Login Success', this.currentUser]);
            this.saveLocalUser(user);
            return user;
        })
            .catch((err) => {
            throw err;
        });
    }
    createUser(email, password) {
        var _email = email;
        return this.axios().request({
            method: 'post',
            url: '/users',
            data: {
                email: email,
                password: password,
                client: super.config().client_id
            }
        }).then(res => {
            let user = new User_1.User({
                email: email,
                key: res.data.key,
                role: res.data.role,
                token: res.data.token,
                tokenExpiration: Date.parse(res.data.expires),
                refresh: res.data.refresh
            });
            log_1.log.debug([UserManager, 'Created User', user]);
            this.saveLocalUser(user);
            return user;
        }).catch((err) => {
            throw err;
        });
    }
}
UserManager.localStorageKey = 'user';
exports.UserManager = UserManager;
