export enum Role {
    User = "user",
    Assistant = "assistant",
}

export interface QueryPair {
    role: Role;
    content: string | null;
}

export class Chat {
    userID: string;
    sectionID: string;
    queryPair: QueryPair[];
    dateCreated: string;

    constructor(
        userID: string,
        sectionID: string,
        queryPair: QueryPair[],
        dateCreated: string
    ) {
        this.userID = userID;
        this.sectionID = sectionID;
        this.queryPair = queryPair;
        this.dateCreated = dateCreated;
    }

    getQueryPair(): QueryPair[] {
        return this.queryPair;
    }

    getDateCreated(): Date {
        return new Date(this.dateCreated);
    }
}
