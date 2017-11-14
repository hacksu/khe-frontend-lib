import axios, { AxiosRequestConfig, AxiosPromise, AxiosInstance } from 'axios';
import API_BASE from "./config";

interface Validator
{
    isValid(object): Boolean;
}

interface Validatable
{
    isValid()
    getValidator(): Validator;
}

class User implements Validatable{
    _id: String;
    email: String;
    password: String;
    key: String;
    role: String;
    application : Application;
    isValid() : Boolean { return false; }
    getValidator() : Validator { return null; }
}
 
class Application
{
    name: String;           // full name
    school: String;         // name of school
    phone: String;          // phone number
    shirt: String;          // t-shirt size
    demographic: Boolean;   // allowed to use demographic info?
    first: Boolean;         // is this your first hackathon?
    dietary: String[];        // food restrictions seperated by |
    year: String;           // the year in school
    age: String;            // person's age
    gender: String;         // gender
    major: String;          // degree
    conduct: Boolean;       // agree to MLH code of conduct?
    travel: Boolean;        // need travel reimbursement?
    waiver: Boolean;        // agreed to waiver?
    resume: String;         // the filename of their resume
    link: String;           // a github/linkedin link
    extra: String;
}

class ApiWrapper
{
    _axios: AxiosInstance;           // AXIOS implementation
    currentUser : User;             // Null if not logged in.
    requestReplayer: Function[];
    
    constructor()
    {
        this._axios = axios.create();
    }
    
    Login(username: String, password: String)
    {
        return this._axios.get(API_BASE + '/token', { 
            data: {
                client : "id",
                email: "",
                password: ""
            }
        })
        .then(response => {
            this.currentUser = response.data;
        })
        .catch(error => {
            throw error;
        })
    }
}