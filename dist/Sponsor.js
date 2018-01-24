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
var log_1 = require("./util/log");
var ServiceClass_1 = require("./ServiceClass");
var Sponsor = /** @class */ (function () {
    function Sponsor() {
    }
    return Sponsor;
}());
exports.Sponsor = Sponsor;
var SponsorLoader = /** @class */ (function (_super) {
    __extends(SponsorLoader, _super);
    function SponsorLoader(_service) {
        return _super.call(this, _service) || this;
    }
    SponsorLoader.prototype.getSponsors = function () {
        var _this = this;
        return _super.prototype.axios.call(this).get('/sponsors')
            .then(function (res) {
            res.data.forEach(function (element) {
                element.imgUrl = _super.prototype.config.call(_this).api_base + '/sponsors/' + element._id + '/logo';
                return element;
            });
            log_1.log.debug([SponsorLoader, 'Got Sponsors', res.data]);
            return res.data;
        })["catch"](function (err) {
            throw err;
        });
    };
    return SponsorLoader;
}(ServiceClass_1.ServiceClass));
exports.SponsorLoader = SponsorLoader;
