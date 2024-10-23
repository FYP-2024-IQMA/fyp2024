import { Enums } from "../config/database.types";

export interface Accounts {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Enums<"role">;
    dateCreated: Date;
    age: Enums<"age_type">;
    gender: Enums<"gender_type">;
    hasOnboarded: boolean;
    profilePic: string | null;

    getFirstName(): string;
    getLastName(): string;
    getEmail(): string;
    getRole(): Enums<"role">;
    getDateCreated(): Date;
    getAge(): Enums<"age_type">;
    getGender(): Enums<"gender_type">;
    getHasOnboarded(): boolean;
}

export class Learner implements Accounts {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Enums<"role">;
    dateCreated: Date;
    age: Enums<"age_type">;
    gender: Enums<"gender_type">;
    hasOnboarded: boolean;
    profilePic: string | null;

    constructor(
        userID: string,
        firstName: string,
        lastName: string,
        email: string,
        role: Enums<"role">,
        dateCreated: Date,
        age: Enums<"age_type">,
        gender: Enums<"gender_type">,
        hasOnboarded: boolean,
        profilePic: string | null

    ) {
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

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getRole(): Enums<"role"> {
        return this.role;
    }

    getDateCreated(): Date {
        return this.dateCreated;
    }

    getAge(): Enums<"age_type"> {
        return this.age;
    }

    getGender(): Enums<"gender_type"> {
        return this.gender;
    }

    getHasOnboarded(): boolean {
        return this.hasOnboarded;
    }
}

export class Admin implements Accounts {
    userID: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Enums<"role">;
    dateCreated: Date;
    age: Enums<"age_type">;
    gender: Enums<"gender_type">;
    hasOnboarded: boolean;
    profilePic: string | null;

    constructor(
        userID: string,
        firstName: string,
        lastName: string,
        email: string,
        role: Enums<"role">,
        dateCreated: Date,
        age: Enums<"age_type">,
        gender: Enums<"gender_type">,
        hasOnboarded: boolean,
        profilePic: string | null
    ) {
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

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getEmail(): string {
        return this.email;
    }

    getRole(): Enums<"role"> {
        return this.role;
    }

    getDateCreated(): Date {
        return this.dateCreated;
    }

    getAge(): Enums<"age_type"> {
        return this.age;
    }

    getGender(): Enums<"gender_type"> {
        return this.gender;
    }

    getHasOnboarded(): boolean {
        return this.hasOnboarded;
    }
}
