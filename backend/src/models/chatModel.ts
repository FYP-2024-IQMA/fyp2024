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
	unitID: string;
	queryPair: QueryPair[];
	dateCreated?: string; // added ? to show it's optional

	constructor(
		userID: string,
		sectionID: string,
		unitID: string,
		queryPair: QueryPair[],
		dateCreated?: string
	) {
		this.userID = userID;
		this.sectionID = sectionID;
		this.unitID = unitID;
		this.queryPair = queryPair;
		this.dateCreated = dateCreated;
	}

	getQueryPair(): QueryPair[] {
		return this.queryPair;
	}

	getDateCreated(): Date {
		return new Date(this.dateCreated!);
	}
}
