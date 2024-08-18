"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.Learner = exports.Gender = exports.Age = exports.Role = void 0;
var Role;
(function (Role) {
    Role["learner"] = "learner";
    Role["admin"] = "admin";
})(Role || (exports.Role = Role = {}));
var Age;
(function (Age) {
    Age["GenZ"] = "Generation Z (18-24)";
    Age["Millennials"] = "Millennials (25-40)";
    Age["GenX"] = "Generation X (40-55)";
    Age["BabyBoomers"] = "Baby Boomers (55-75)";
})(Age || (exports.Age = Age = {}));
var Gender;
(function (Gender) {
    Gender["Male"] = "Male";
    Gender["Female"] = "Female";
    Gender["Other"] = "Other";
})(Gender || (exports.Gender = Gender = {}));
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
class Admin {
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
exports.Admin = Admin;
