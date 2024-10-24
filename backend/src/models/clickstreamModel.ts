export interface Clickstream {
	userID: string;
	eventType: "timeTaken" | "attemptsTaken";
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
