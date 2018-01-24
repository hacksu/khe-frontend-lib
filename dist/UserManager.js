"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./util/log");
const config_1 = require("./config/config");
const ServiceClass_1 = require("./ServiceClass");
const AuthenticationHelper_1 = require("./util/AuthenticationHelper");
class UserManager extends ServiceClass_1.ServiceClass {
    constructor(axios) {
        super(axios);
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
        localStorage.setItem(UserManager.localStorageKey, JSON.stringify(this.currentUser));
        log_1.log.debug(['Saved User Locally', user]);
    }
    setCurrentUser(user) {
    }
    login(email, password) {
        var self = this;
        var _email = email;
        return this._axios.post('/users/token', {
            client: config_1.CLIENT_ID,
            email: email,
            password: password
        })
            .then((response) => {
            self.currentUser = response.data;
            self.currentUser.tokenExpiration = Date.parse(response.data.expires);
            self.currentUser.email = _email;
            log_1.log.debug([UserManager, 'Login Success', self.currentUser]);
            self.loadUserApplication(self.currentUser);
            self.saveLocalUser(self.currentUser);
        })
            .catch((err) => {
            throw err;
        });
    }
    loadUserApplication(user) {
        var _user = user;
        this._axios.request(AuthenticationHelper_1.AuthHelper.authenticate(user, {
            url: '/users/me/application'
        })).then((res) => {
            _user.application = res.data.application;
            log_1.log.debug([UserManager, 'Loaded User Application', _user.application]);
        }).catch((err) => {
            throw err;
        });
    }
    createUser(email, password) {
        var _email = email;
        return this._axios.request({
            method: 'post',
            url: '/users',
            data: {
                email: email,
                password: password,
                client: config_1.CLIENT_ID
            }
        }).then((res) => {
            log_1.log.debug([UserManager, 'Created User', res.data]);
            res.data.email = _email;
            //setCurrentUser(res.data);
        }).catch((err) => {
            throw err;
        });
    }
}
UserManager.localStorageKey = 'user';
exports.UserManager = UserManager;
