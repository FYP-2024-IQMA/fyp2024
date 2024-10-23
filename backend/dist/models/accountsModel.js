"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.Learner = void 0;
class Learner {
    constructor(userID, firstName, lastName, email, role, dateCreated, age, gender, hasOnboarded, profilePic) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.dateCreated = dateCreated;
        this.age = age;
        this.gender = gender;
        this.hasOnboarded = hasOnboarded;
        this.profilePic = profilePic;
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
        return this.hasOnboarded;
    }
}
exports.Learner = Learner;
class Admin {
    constructor(userID, firstName, lastName, email, role, dateCreated, age, gender, hasOnboarded, profilePic) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.dateCreated = dateCreated;
        this.age = age;
        this.gender = gender;
        this.hasOnboarded = hasOnboarded;
        this.profilePic = profilePic;
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
        return this.hasOnboarded;
    }
}
exports.Admin = Admin;
