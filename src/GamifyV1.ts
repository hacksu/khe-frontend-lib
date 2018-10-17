import { ServiceClass } from './ServiceClass';
import { User } from './User'
import { AuthHelper } from './util/AuthenticationHelper'

export class GamifyV1 extends ServiceClass {

    constructor(_service: ServiceClass) {
        super(_service);
    }

    public async scoreboard(): Promise<any[]> {
        let res = await this.axios().get('/gamify/scoreboard');
        return res.data;
    }

    public redeem(user: User, pId: string, points: string, src: string, reason: string): Promise<any> {
        return this.axios().request(AuthHelper.authenticate(user, {
            url: '/gamify/' + pId + '/' + points + '/' + src + '/' + reason,
            method: 'get'
        }));
    }

}