export interface Clickstream {
	userID: string;
	eventType:
		| "timeTaken"
		| "attemptsTaken"
		| "chatResponseTime"
		| "numberOfInteractions";
	timestamp: Date;
	sectionID: string;
}

export interface TimeTakenClickstream extends Clickstream {
	unitID?: string | null;
	lessonID?: string | null;
	event: string;
	time: number; // in seconds
}

export interface AttemptsTakenClickstream extends Clickstream {
	quizID: number;
	questionNo: number;
	attempts: number;
}

export interface ChatResponseTimeClickstream extends Clickstream {
	responseTime: number; // in seconds
}

export interface NumberOfInteractionsClickstream extends Clickstream {
	unitID : string;
	count: number;
}
