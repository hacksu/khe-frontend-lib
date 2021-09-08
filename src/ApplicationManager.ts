import { log } from './util/log'
import { ServiceClass, ExplicitServiceClass } from './ServiceClass';
import { AxiosInstance } from 'axios';
import { AuthHelper } from './util/AuthenticationHelper'
import { ApiWrapper } from './index'
import { Application } from './Application'
import { User } from './User';

export class ApplicationManager extends ServiceClass {
    constructor(other: ApiWrapper) {
        super(other);
        this.apiWrapper = other;
        this.getLocalUser = other.userManager.getLocalUser.bind(other.userManager);
    }

    protected apiWrapper: ApiWrapper;
    protected getLocalUser: () => User;

    async getApplication(user: User=this.getLocalUser()): Promise<Application> {
        let res = await this.axios().get("/users/me/application", AuthHelper.authenticate(user));
        if (res.data.application) {
            let application = new Application(res.data.application);
            application._onServer = true;
            return application;
        }
        return new Application({
            name: null,
            school: null,
            phone: null,
            shirt: null,
            demographic: null,
            first: null,
            dietary: null,
            year: null,
            age: null,
            gender: null,
            major: null,
            conduct: null,
            travel: null,
            waiver: null,
	    mlh_emails: null
        })
    }

    saveApplication(application: Application, user: User=this.getLocalUser()) {
        if (application._onServer) {
            return this.axios().patch("/users/me/application", 
                {
                    "name": application.name,           // full name
                    "school": application.school,         // name of school
                    "phone": application.phone,          // phone number
                    "shirt": application.shirt,          // t-shirt size
                    "demographic": application.demographic,   // allowed to use demographic info?
                    "first": application.first,         // is this your first hackathon?
                    "dietary": application.dietary,        // food restrictions seperated by |
                    "year": application.year,           // the year in school
                    "age": application.age,            // person's age
                    "gender": application.gender,         // gender
                    "major": application.major,          // degree
                    "conduct": application.conduct,       // agree to MLH code of conduct?
                    "travel": application.travel,        // need travel reimbursement?
                    "waiver": application.waiver,        // agreed to waiver?
                    "resume": application.resume,         // the filename of their resume
                    "link": application.link,            // a github/linkedin link
                    "going": application.going,
		    "mlh_emails": application.mlh_emails,
                }, AuthHelper.authenticate(user))
        } else {
            return this.axios().post("/users/application", 
                {
                    "name": application.name,           // full name
                    "school": application.school,         // name of school
                    "phone": application.phone,          // phone number
                    "shirt": application.shirt,          // t-shirt size
                    "demographic": application.demographic,   // allowed to use demographic info?
                    "first": application.first,         // is this your first hackathon?
                    "dietary": application.dietary,        // food restrictions seperated by |
                    "year": application.year,           // the year in school
                    "age": application.age,            // person's age
                    "gender": application.gender,         // gender
                    "major": application.major,          // degree
                    "conduct": application.conduct,       // agree to MLH code of conduct?
                    "travel": application.travel,        // need travel reimbursement?
                    "waiver": application.waiver,        // agreed to waiver?
                    "resume": application.resume,         // the filename of their resume
                    "link": application.link,            // a github/linkedin link
                    "going": application.going,
		    "mlh_emails": application.mlh_emails,
                }, AuthHelper.authenticate(user))
        }
    }

}
