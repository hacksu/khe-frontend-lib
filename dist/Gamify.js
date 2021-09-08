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
exports.GamifyManager = void 0;
const ServiceClass_1 = require("./ServiceClass");
class GamifyManager extends ServiceClass_1.ServiceClass {
    constructor(_service) {
        super(_service);
    }
    /**
     * Gets the scores of all of the players.
     *
     * @returns the top players in descending order.
     */
    scoreboard() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.axios().get('/points/scoreboard');
            return res.data;
        });
    }
    /**
     * Gets the number of points that a user has earned.
     *
     * @param uId the id of the user
     * @returns the number of points
     */
    pointsForUser(uId) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.axios().request({
                url: '/points/user/' + uId,
                method: 'get'
            });
            return res.data[0].points;
        });
    }
    generateCode(len = 5) {
        var text = "";
        var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    }
    /**
     * Create a new single use point identified by a 5
     * letter code.
     *
     * @param sId the sponsor who is giving the points out
     * @param pAmount the number of points to give out
     * @returns a 5 digit code for the hacker
     */
    createPoints(sId, pAmount = 100) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create Points
            let result = yield this.axios().get("/points/singleuse/" + sId + "/" + pAmount);
            // Get 5 letter code
            let success = false;
            while (!success) {
                // Create short URL
                try {
                    let code = this.generateCode();
                    //await this.axios().post()
                }
                catch (err) {
                }
            }
            return result.data;
        });
    }
    /**
     *
     * @param uId the user redeeming the points
     * @param pId the points that the user is redeeming
     *
     * @returns success or failure as a callback
     */
    redeem(uId, pId) {
        return this.axios().get('/points/redeem/' + uId + '/' + pId);
    }
}
exports.GamifyManager = GamifyManager;
