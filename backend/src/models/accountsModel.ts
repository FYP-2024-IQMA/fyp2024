export enum Role {
    learner = "learner",
    admin = "admin"
}

export enum Age {
    GenZ = "Generation Z (18-24)",
    Millennials = "Millennials (25-40)",
    GenX = "Generation X (40-55)",
    BabyBoomers = "Baby Boomers (55-75)"
}

export enum Gender {
    Male = "Male",
    Female = "Female",
    Other = "Other"
}

export interface Accounts {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    dateCreated: Date;
    age: Age;
    gender: Gender;

    getFirstName(): string;
    getLastName(): string;
    getEmail(): string;
    getRole(): Role;
    getDateCreated(): Date;
    getAge(): Age;
    getGender(): Gender;
}

export class Learner implements Accounts {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    dateCreated: Date;
    age: Age;
    gender: Gender;

    constructor(
        userId: string,
        firstName: string,
        lastName: string,
        email: string,
        role: Role,
        dateCreated: Date,
        age: Age,
        gender: Gender
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.dateCreated = dateCreated;
        this.age = age;
        this.gender = gender;
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

    getRole(): Role {
        return this.role;
    }

    getDateCreated(): Date {
        return this.dateCreated;
    }

    getAge(): Age {
        return this.age;
    }

    getGender(): Gender {
        return this.gender;
    }
}

export class Admin implements Accounts {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    dateCreated: Date;
    age: Age;
    gender: Gender;

    constructor(
        userId: string,
        firstName: string,
        lastName: string,
        email: string,
        role: Role,
        dateCreated: Date,
        age: Age,
        gender: Gender
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.dateCreated = dateCreated;
        this.age = age;
        this.gender = gender;
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

    getRole(): Role {
        return this.role;
    }

    getDateCreated(): Date {
        return this.dateCreated;
    }

    getAge(): Age {
        return this.age;
    }

    getGender(): Gender {
        return this.gender;
    }
}
