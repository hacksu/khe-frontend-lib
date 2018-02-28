"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var User_1 = require("./User");
var log_1 = require("./util/log");
var ServiceClass_1 = require("./ServiceClass");
var AuthenticationHelper_1 = require("./util/AuthenticationHelper");
var UserManager = /** @class */ (function (_super) {
    __extends(UserManager, _super);
    function UserManager(_service) {
        var _this = _super.call(this, _service) || this;
        var user = _this.getLocalUser();
        if (user) {
            _this.currentUser = user;
        }
        return _this;
    }
    UserManager.prototype.getLocalUser = function () {
        var userString = localStorage.getItem(UserManager.localStorageKey);
        if (userString) {
            var user = JSON.parse(userString);
            log_1.log.debug([UserManager, 'Parsed User from localStorage', user]);
            return user;
        }
        else {
            return null;
        }
    };
    UserManager.prototype.saveLocalUser = function (user) {
        localStorage.setItem(UserManager.localStorageKey, JSON.stringify(this.currentUser));
        log_1.log.debug(['Saved User Locally', user]);
    };
    UserManager.prototype.setCurrentUser = function (user) {
    };
    UserManager.prototype.login = function (email, password) {
        var self = this;
        var _email = email;
        return this.axios().post('/users/token', {
            client: _super.prototype.config.call(this).client_id,
            email: email,
            password: password
        })
            .then(function (response) {
            self.currentUser = response.data;
            self.currentUser.tokenExpiration = Date.parse(response.data.expires);
            self.currentUser.email = _email;
            log_1.log.debug([UserManager, 'Login Success', self.currentUser]);
            self.loadUserApplication(self.currentUser);
            self.saveLocalUser(self.currentUser);
        })["catch"](function (err) {
            throw err;
        });
    };
    UserManager.prototype.logout = function () {
        var _this = this;
        this.axios().request(AuthenticationHelper_1.AuthHelper.authenticate(this.currentUser, {
            url: '/users/token',
            method: 'delete'
        })).then(function (res) {
            log_1.log.debug([UserManager, 'Logout successful.']);
            _this.currentUser = new User_1.User();
            _this.saveLocalUser(_this.currentUser);
        })["catch"](function (err) {
            throw err;
        });
    };
    UserManager.prototype.loadUserApplication = function (user) {
        var _user = user;
        this.axios().request(AuthenticationHelper_1.AuthHelper.authenticate(user, {
            url: '/users/me/application'
        })).then(function (res) {
            _user.application = res.data.application;
            log_1.log.debug([UserManager, 'Loaded User Application', _user.application]);
        })["catch"](function (err) {
            throw err;
        });
    };
    UserManager.prototype.createUser = function (email, password) {
        var _email = email;
        return this.axios().request({
            method: 'post',
            url: '/users',
            data: {
                email: email,
                password: password,
                client: _super.prototype.config.call(this).client_id
            }
        }).then(function (res) {
            log_1.log.debug([UserManager, 'Created User', res.data]);
            res.data.email = _email;
            //setCurrentUser(res.data);
        })["catch"](function (err) {
            throw err;
        });
    };
    UserManager.localStorageKey = 'user';
    return UserManager;
}(ServiceClass_1.ServiceClass));
exports.UserManager = UserManager;
