"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./util/log");
const config_1 = require("./config/config");
class Sponsor {
}
exports.Sponsor = Sponsor;
class SponsorLoader {
    constructor(axiosInst) {
        this._axios = axiosInst;
    }
    getSponsors() {
        return this._axios.get('/sponsors')
            .then((res) => {
            res.data.forEach((element) => {
                element.imgUrl = config_1.API_BASE + '/sponsors/' + element._id + '/logo';
                return element;
            });
            log_1.log.debug([SponsorLoader, 'Got Sponsors', res.data]);
            return res.data;
        }).catch((err) => {
            throw err;
        });
    }
}
exports.SponsorLoader = SponsorLoader;
