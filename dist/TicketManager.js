"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceClass_1 = require("./ServiceClass");
const log_1 = require("./util/log");
class TicketManager extends ServiceClass_1.ServiceClass {
    constructor(other) {
        super(other);
    }
    submitTicket(subject, body, email, name) {
        return this.axios().request({
            method: 'post',
            url: '/tickets',
            data: {
                subject: subject,
                body: body,
                replyTo: email,
                name: name
            }
        }).then((res) => {
            log_1.log.debug([TicketManager, 'Submit ticket.', res.data]);
            return res.data;
        });
    }
}
exports.TicketManager = TicketManager;
