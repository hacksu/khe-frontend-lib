"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./util/log");
const ServiceClass_1 = require("./ServiceClass");
class Sponsor {
}
exports.Sponsor = Sponsor;
class SponsorLoader extends ServiceClass_1.ServiceClass {
    constructor(_service) {
        super(_service);
    }
    getSponsors() {
        return super.axios.get('/sponsors')
            .then((res) => {
            res.data.forEach((element) => {
                element.imgUrl = super.config.api_base + '/sponsors/' + element._id + '/logo';
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
