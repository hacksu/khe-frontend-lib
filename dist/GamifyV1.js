"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamifyV1 = void 0;
const ServiceClass_1 = require("./ServiceClass");
const AuthenticationHelper_1 = require("./util/AuthenticationHelper");
class GamifyV1 extends ServiceClass_1.ServiceClass {
    constructor(_service) {
        super(_service);
    }
    scoreboard() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.axios().get('/gamify/scoreboard');
            return res.data;
        });
    }
    redeem(user, pId, points, src, reason) {
        return this.axios().request(AuthenticationHelper_1.AuthHelper.authenticate(user, {
            url: '/gamify/' + pId + '/' + points + '/' + src + '/' + reason,
            method: 'get'
        }));
    }
}
exports.GamifyV1 = GamifyV1;
