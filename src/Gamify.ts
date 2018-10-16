import { ServiceClass } from './ServiceClass'

export class GamifyManager extends ServiceClass {

    constructor(_service: ServiceClass) {
        super(_service);
    }

    /**
     * Gets the scores of all of the players.
     * 
     * @returns the top players in descending order.
     */
    public async scoreboard(): Promise<any[]> {
        let res = await this.axios().get('/points/scoreboard');
        return res.data
    }

    /**
     * Gets the number of points that a user has earned.
     * 
     * @param uId the id of the user
     * @returns the number of points
     */
    public async pointsForUser(uId: string): Promise<Number> {
        let res = await this.axios().request({
            url: '/points/user/' + uId,
            method: 'get'
        });
        return res.data[0].points;
    }

    private generateCode(len: Number = 5) {
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
    public async createPoints(sId: string, pAmount: Number = 100): Promise<string> {
        // Create Points
        let result = await this.axios().get("/points/singleuse/" + sId + "/" + pAmount)
        // Get 5 letter code
        let success = false;
        while(!success) {
            // Create short URL
            try {
                let code = this.generateCode()
                //await this.axios().post()
            } catch(err) {

            }
        }
        return result.data;
    }

    /**
     * 
     * @param uId the user redeeming the points
     * @param pId the points that the user is redeeming
     * 
     * @returns success or failure as a callback
     */
    public redeem(uId: string, pId: string): Promise<any> {
        return this.axios().get('/points/redeem/' + uId + '/' + pId);
    }
}