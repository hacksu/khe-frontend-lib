import { User } from './User'
import { log } from './util/log'
import { CLIENT_ID } from './config/config';
import { ServiceClass } from './ServiceClass';
import { AxiosInstance } from 'axios';
import { AuthHelper } from './util/AuthenticationHelper'

export class UserManager extends ServiceClass {

    private static readonly localStorageKey: string = 'user';

    currentUser : User;

    constructor(axios: AxiosInstance)  {
        super(axios);

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

    saveLocalUser(user: User): void {
        localStorage.setItem(UserManager.localStorageKey, JSON.stringify(this.currentUser));
        log.debug(['Saved User Locally', user])
    }

    private setCurrentUser(user: User) {
        
    }
    
    login(email: string, password: string): Promise<any>
    {
        var self = this;
        var _email = email;
        return this._axios.post('/users/token', {
                client : CLIENT_ID,
                email: email,
                password: password 
        })
        .then((response: any) => {
            self.currentUser = response.data;
            self.currentUser.tokenExpiration = Date.parse(response.data.expires);
            self.currentUser.email = _email;
            log.debug([UserManager, 'Login Success', self.currentUser]);
            self.loadUserApplication(self.currentUser);
            self.saveLocalUser(self.currentUser);
        })
        .catch((err: any) => {
            throw err;
        });
    }

    loadUserApplication(user: User) {
        var _user = user;
        this._axios.request(AuthHelper.authenticate(user, {
            url: '/users/me/application'
        })).then((res) => {
            _user.application = res.data.application;
            log.debug([UserManager, 'Loaded User Application', _user.application])
        }).catch((err) => {
            throw err;
        })
    }

    createUser(email: string, password:string): Promise<any> {
        var _email = email;
        return this._axios.request({
            method: 'post',
            url: '/users',
            data: {
                email: email,
                password: password,
                client: CLIENT_ID
            }
        }).then((res: any) => {
            log.debug([UserManager, 'Created User', res.data]);
            res.data.email = _email;
            //setCurrentUser(res.data);
        }).catch((err) => {
            throw err;
        });
    }
}