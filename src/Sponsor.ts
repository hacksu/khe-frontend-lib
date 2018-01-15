import axios, { AxiosInstance, AxiosAdapter } from 'axios';
import { log } from './util/log'
import { API_BASE } from './config/config';

export class Sponsor {
    _id: string;
    name: string;
    link: string;
    amount: number;
    imgUrl: string;
}

export class SponsorLoader {

    private _axios: AxiosInstance;

    constructor(axiosInst: AxiosInstance) {
        this._axios = axiosInst;
    }

    public getSponsors(): Promise<any> {
        return this._axios.get('/sponsors')
        .then((res) => {
            res.data.forEach((element: Sponsor): Sponsor => {
                element.imgUrl = API_BASE + '/sponsors/' + element._id + '/logo';
                return element;
            })
            log.debug([SponsorLoader, 'Got Sponsors', res.data]);
            return res.data;
        }).catch((err) => {
            throw err;
        })
    }

}