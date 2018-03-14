import { ApiWrapper } from '../'
import { expect } from 'chai'
import 'mocha'

let username = "ipark1@kent.edu"+new Date();
let password = "asdfadsfasasdfafds";
let api = new ApiWrapper({api_base: "http://localhost:3000/v1.0", client_id: "mocha"});

describe('ApplicationManager', () => {
    it('should create an application', async  function() {
        this.timeout(5000);
        let user = await api.userManager.createUser(username, password);

        let application = await api.applicationManager.getApplication();

        application.name = "Isaac Park";
        application.school = "Kent";
        application.phone = "3304749654";
        application.demographic = true;
        application.first = false;
        application.dietary = [];
        application.year = "1995";
        application.age = "21";
        application.gender = "Male";
        application.major = "CS";
        application.conduct = true;
        application.travel = false;
        application.waiver = true;
        application.shirt = "S";
        
        let res = await api.applicationManager.saveApplication(application);
    })
    it('should update an application', async function() {
        this.timeout(5000);

        let user = await api.userManager.login(username, password);

        let application = await api.applicationManager.getApplication();

        console.log(application);
        application.name = "Test";

        let res = await api.applicationManager.saveApplication(application);
    });

    it('should get an application', async function() {
        this.timeout(5000);

        let user = await api.userManager.login(username, password);

        let application = await api.applicationManager.getApplication();

        console.log(application); 

    });
});
