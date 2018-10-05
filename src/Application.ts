import { IValidatable } from './index';

interface ApplicationData {
    name: string;           // full name
    school: string;         // name of school
    phone: string;          // phone number
    shirt: string;          // t-shirt size
    demographic: boolean;   // allowed to use demographic info?
    first: boolean;         // is this your first hackathon?
    dietary: string[];        // food restrictions seperated by |
    year: string;           // the year in school
    age: string;            // person's age
    gender: string;         // gender
    major: string;          // degree
    conduct: boolean;       // agree to MLH code of conduct?
    travel: boolean;        // need travel reimbursement?
    waiver: boolean;        // agreed to waiver?
    resume?: string;         // the filename of their resume
    link?: string;           // a github/linkedin link
    extra?: string;
    going?: string;
}


export class Application implements IValidatable, ApplicationData
{
    constructor(data: ApplicationData) {
        for(let key in data) {
            // @ts-ignore: Doesn't understand how to merge
            this[key] = data[key];
        }
    }
    name: string;           // full name
    school: string;         // name of school
    phone: string;          // phone number
    shirt: string;          // t-shirt size
    demographic: boolean;   // allowed to use demographic info?
    first: boolean;         // is this your first hackathon?
    dietary: string[];        // food restrictions seperated by |
    year: string;           // the year in school
    age: string;            // person's age
    gender: string;         // gender
    major: string;          // degree
    conduct: boolean;       // agree to MLH code of conduct?
    travel: boolean;        // need travel reimbursement?
    waiver: boolean;        // agreed to waiver?
    resume?: string;         // the filename of their resume
    link?: string;           // a github/linkedin link
    extra?: string;
    going?: string;
    _onServer = false;
    isValid() { return false; }
}