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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLearnerAccount = createLearnerAccount;
exports.createAdminAccount = createAdminAccount;
exports.getAllAccounts = getAllAccounts;
exports.getAccountById = getAccountById;
exports.getAllLearnerAccounts = getAllLearnerAccounts;
exports.getAllAdminAccounts = getAllAdminAccounts;
exports.updateAccount = updateAccount;
exports.deleteAccount = deleteAccount;
const supabaseConfig_1 = __importDefault(require("../config/supabaseConfig"));
const accountsModel_1 = require("../models/accountsModel");
/* CREATE */
function createLearnerAccount(learner) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, firstName, lastName, email, dateCreated, age, gender } = learner;
        const { data, error } = yield supabaseConfig_1.default
            .from("accounts")
            .insert({
            userid: userId,
            firstname: firstName,
            lastname: lastName,
            email: email,
            role: accountsModel_1.Role.learner,
            dateCreated: dateCreated,
            age: age,
            gender: gender,
        })
            .select();
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return data;
        }
    });
}
function createAdminAccount(admin) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, firstName, lastName, email, dateCreated, age, gender } = admin;
        const { data, error } = yield supabaseConfig_1.default
            .from("accounts")
            .insert({
            userid: userId,
            firstname: firstName,
            lastname: lastName,
            email: email,
            role: accountsModel_1.Role.admin,
            dateCreated: dateCreated,
            age: age,
            gender: gender,
        })
            .select();
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return data;
        }
    });
}
/* READ */
function getAllAccounts() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default.from("accounts").select("*");
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return data;
        }
    });
}
function getAccountById(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("accounts")
            .select("*")
            .eq("userid", userid)
            .single();
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            const role = data.role === "admin" ? accountsModel_1.Role.admin : accountsModel_1.Role.learner;
            const age = accountsModel_1.Age[data.age];
            const gender = accountsModel_1.Gender[data.gender];
            if (data.role === "admin") {
                return new accountsModel_1.Admin(data.userid, data.firstname, data.lastname, data.email, role, new Date(data.datecreated), age, gender);
            }
            return new accountsModel_1.Learner(data.userid, data.firstname, data.lastname, data.email, role, new Date(data.datecreated), age, gender);
        }
    });
}
function getAllLearnerAccounts() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("accounts")
            .select("*")
            .eq("role", "learner");
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return data;
        }
    });
}
function getAllAdminAccounts() {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabaseConfig_1.default
            .from("accounts")
            .select("*")
            .eq("role", "admin");
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return data;
        }
    });
}
/* UPDATE */
function updateAccount(account) {
    return __awaiter(this, void 0, void 0, function* () {
        const { userId, firstName, lastName, email } = account;
        const updateFields = {};
        if (firstName)
            updateFields.firstname = firstName;
        if (lastName)
            updateFields.lastname = lastName;
        if (email)
            updateFields.email = email;
        if (Object.keys(updateFields).length === 0) {
            throw new Error("No fields to update");
        }
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("accounts")
            .update(updateFields)
            .eq("userid", userId);
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return { status, statusText };
        }
    });
}
/* DELETE */
function deleteAccount(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        const { status, statusText, error } = yield supabaseConfig_1.default
            .from("accounts")
            .delete()
            .eq("userid", userid);
        if (error) {
            console.error(error);
            throw error;
        }
        else {
            return { status, statusText };
        }
    });
}
