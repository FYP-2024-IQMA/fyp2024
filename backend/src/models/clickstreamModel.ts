export interface Clickstream {
	userID: string;
	age: string;
	eventType:
		| "timeTaken"
		| "attemptsTaken"
		| "chatResponseTime"
		| "numberOfInteractions";
	section: string;
	event: string;
	timestamp: Date;
}

export interface TimeTakenClickstream extends Clickstream {
	time: number; // in seconds
}

export interface AttemptsTakenClickstream extends Clickstream {
	attempts: number;
}

export interface ChatResponseTimeClickstream extends Clickstream {
	responseTime: number; // in seconds
}

export interface NumberOfInteractionsClickstream extends Clickstream {
	count: number;
}
