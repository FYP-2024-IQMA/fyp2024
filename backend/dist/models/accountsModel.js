"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.Learner = void 0;
class Learner {
    constructor(userID, firstName, lastName, email, role, dateCreated, age, gender, has_onboarded) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.dateCreated = dateCreated;
        this.age = age;
        this.gender = gender;
        this.has_onboarded = has_onboarded;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return this.role;
    }
    getDateCreated() {
        return this.dateCreated;
    }
    getAge() {
        return this.age;
    }
    getGender() {
        return this.gender;
    }
    getHasOnboarded() {
        return this.has_onboarded;
    }
}
exports.Learner = Learner;
class Admin {
    constructor(userID, firstName, lastName, email, role, dateCreated, age, gender, has_onboarded) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.dateCreated = dateCreated;
        this.age = age;
        this.gender = gender;
        this.has_onboarded = has_onboarded;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return this.role;
    }
    getDateCreated() {
        return this.dateCreated;
    }
    getAge() {
        return this.age;
    }
    getGender() {
        return this.gender;
    }
    getHasOnboarded() {
        return this.has_onboarded;
    }
}
exports.Admin = Admin;
