import axios, { AxiosInstance, AxiosAdapter } from 'axios';
import { log } from './util/log'
import { Config } from './util/config';
import { ServiceClass } from './ServiceClass';

export class Sponsor {
    _id: string;
    name: string;
    link: string;
    amount: number;
    imgUrl: string;
}

export class SponsorLoader extends ServiceClass {

    constructor(_service: ServiceClass) {
        super(_service);
    }

    public getSponsors(): Promise<any> {
        return super.axios.get('/sponsors')
        .then((res) => {
            res.data.forEach((element: Sponsor): Sponsor => {
                element.imgUrl = super.config.api_base + '/sponsors/' + element._id + '/logo';
                return element;
            })
            log.debug([SponsorLoader, 'Got Sponsors', res.data]);
            return res.data;
        }).catch((err) => {
            throw err;
        })
    }

}