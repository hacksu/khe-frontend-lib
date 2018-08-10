import { User } from './User'
import { log } from './util/log'
import { ServiceClass } from './ServiceClass';
import { AxiosInstance } from 'axios';
import { AuthHelper } from './util/AuthenticationHelper'

//declare function require(name: any): any;

// Node specific storage
//if (typeof localStorage === "undefined" || localStorage === null) {
//    var LocalStorage = require('node-localstorage').LocalStorage;
//    var localStorage = new LocalStorage('/tmp/test');
//}

export class UserManager extends ServiceClass {

    private static readonly localStorageKey: string = 'user';

    currentUser : User;

    constructor(_service: ServiceClass)  {
        super(_service);

        let user: User|null = this.getLocalUser();
        if (user) {
            this.currentUser = user;
        }
    }

    getLocalUser(): User|null {
        let userString = localStorage.getItem(UserManager.localStorageKey);
        if (userString) {
            let user: User = JSON.parse(userString);
            log.debug([UserManager, 'Parsed User from localStorage', user]);
            return user;
        } else {
            return null;
        }
    }

    saveLocalUser(user: User) {
        this.currentUser = user;
        localStorage.setItem(UserManager.localStorageKey, JSON.stringify(this.currentUser));
        log.debug(['Saved User Locally', user])
    }

    logout() {
      localStorage.setItem(UserManager.localStorageKey, "");
      log.debug(['Removed User Locally'])
    }
    
    login(email: string, password: string): Promise<User>
    {
        var self = this;
        var _email = email;
        return this.axios().post('/users/token', {
                client : super.config().client_id,
                email: email,
                password: password 
        })
        .then(res => {
            let user = new User({
                email: email,
                key: res.data.key,
                role: res.data.role,
                token: res.data.token,
                tokenExpiration: Date.parse(res.data.expires),
                refresh: res.data.refresh
            })
            log.debug([UserManager, 'Login Success', this.currentUser]);
            this.saveLocalUser(user);
            return user;
        })
        .catch((err: any) => {
            throw err;
        });
    }

    createUser(email: string, password: string): Promise<any> {
        var _email = email;
        return this.axios().request({
            method: 'post',
            url: '/users',
            data: {
                email: email,
                password: password,
                client: super.config().client_id
            }
        }).then(res => {
            let user = new User({
                email: email,
                key: res.data.key,
                role: res.data.role,
                token: res.data.token,
                tokenExpiration: Date.parse(res.data.expires),
                refresh: res.data.refresh
            })
            log.debug([UserManager, 'Created User', user]);
            this.saveLocalUser(user);
            return user;
        }).catch((err) => {
            throw err;
        });
    }
}