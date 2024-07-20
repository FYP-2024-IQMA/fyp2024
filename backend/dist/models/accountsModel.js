"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Learner = void 0;
class Learner {
    constructor(userId, firstName, lastName, email, role, dateCreated, age, gender) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.dateCreated = dateCreated;
        this.age = age;
        this.gender = gender;
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
}
exports.Learner = Learner;
