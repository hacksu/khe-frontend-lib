import { ServiceClass } from './ServiceClass'
import { log } from './util/log'

export class TicketManager extends ServiceClass {
    constructor( other: ServiceClass) {
        super(other);
    }

    submitTicket(subject: String, body: String, email: String, name: String)
        : Promise<any>
    {
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
            log.debug([TicketManager, 'Submit ticket.', res.data]);
            return res.data;
        }).catch(err => {
            throw err;
        });
    }
}