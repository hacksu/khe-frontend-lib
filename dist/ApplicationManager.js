"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceClass_1 = require("./ServiceClass");
const AuthenticationHelper_1 = require("./util/AuthenticationHelper");
const Application_1 = require("./Application");
class ApplicationManager extends ServiceClass_1.ServiceClass {
    constructor(other) {
        super(other);
        this.apiWrapper = other;
        this.getLocalUser = other.userManager.getLocalUser.bind(other.userManager);
    }
    getApplication(user = this.getLocalUser()) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.axios().get("/users/me/application", AuthenticationHelper_1.AuthHelper.authenticate(user));
            if (res.data.application) {
                let application = new Application_1.Application(res.data.application);
                application._onServer = true;
                return application;
            }
            return new Application_1.Application({
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
                waiver: null
            });
        });
    }
    saveApplication(application, user = this.getLocalUser()) {
        if (application._onServer) {
            return this.axios().patch("/users/me/application", {
                "name": application.name,
                "school": application.school,
                "phone": application.phone,
                "shirt": application.shirt,
                "demographic": application.demographic,
                "first": application.first,
                "dietary": application.dietary,
                "year": application.year,
                "age": application.age,
                "gender": application.gender,
                "major": application.major,
                "conduct": application.conduct,
                "travel": application.travel,
                "waiver": application.waiver,
                "resume": application.resume,
                "link": application.link,
                "going": application.going
            }, AuthenticationHelper_1.AuthHelper.authenticate(user));
        }
        else {
            return this.axios().post("/users/application", {
                "name": application.name,
                "school": application.school,
                "phone": application.phone,
                "shirt": application.shirt,
                "demographic": application.demographic,
                "first": application.first,
                "dietary": application.dietary,
                "year": application.year,
                "age": application.age,
                "gender": application.gender,
                "major": application.major,
                "conduct": application.conduct,
                "travel": application.travel,
                "waiver": application.waiver,
                "resume": application.resume,
                "link": application.link,
                "going": application.going
            }, AuthenticationHelper_1.AuthHelper.authenticate(user));
        }
    }
}
exports.ApplicationManager = ApplicationManager;
