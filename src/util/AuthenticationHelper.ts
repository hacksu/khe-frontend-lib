import { User } from '../User'
import { AxiosRequestConfig, AxiosBasicCredentials } from 'axios';

export class AuthHelper {
    
    public static authenticate(user: User, config: AxiosRequestConfig = {}): AxiosRequestConfig {
        config.auth = {
            username: user.key,
            password: user.token
        }
        return config;
    }
}