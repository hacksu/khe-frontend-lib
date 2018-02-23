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
var ServiceClass_1 = require("./ServiceClass");
var log_1 = require("./util/log");
var TicketManager = /** @class */ (function (_super) {
    __extends(TicketManager, _super);
    function TicketManager(other) {
        return _super.call(this, other) || this;
    }
    TicketManager.prototype.submitTicket = function (subject, body, email, name) {
        return this.axios().request({
            method: 'post',
            url: '/tickets',
            data: {
                subject: subject,
                body: body,
                replyTo: email,
                name: name
            }
        }).then(function (res) {
            log_1.log.debug([TicketManager, 'Submit ticket.', res.data]);
            return res.data;
        })["catch"](function (err) {
            throw err;
        });
    };
    return TicketManager;
}(ServiceClass_1.ServiceClass));
exports.TicketManager = TicketManager;
