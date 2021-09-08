"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
require("mocha");
let username = "ipark1@kent.edu" + new Date();
let password = "asdfadsfasasdfafds";
let api = new __1.ApiWrapper({ api_base: "http://localhost:3000/v1.0", client_id: "mocha" });
describe('ApplicationManager', () => {
    it('should create an application', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(5000);
            let user = yield api.userManager.createUser(username, password);
            let application = yield api.applicationManager.getApplication();
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
            let res = yield api.applicationManager.saveApplication(application);
        });
    });
    it('should update an application', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(5000);
            let user = yield api.userManager.login(username, password);
            let application = yield api.applicationManager.getApplication();
            console.log(application);
            application.name = "Test";
            let res = yield api.applicationManager.saveApplication(application);
        });
    });
    it('should get an application', function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.timeout(5000);
            let user = yield api.userManager.login(username, password);
            let application = yield api.applicationManager.getApplication();
            console.log(application);
        });
    });
});
