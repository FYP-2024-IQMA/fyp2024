export interface Clickstream {
    userID: string;
    age: string,
    eventType: "timeTaken" | "attemptsTaken";
    section: string,
    event: string;
    timestamp: Date;
}

export interface TimeTakenClickstream extends Clickstream {
    time: number;      // in seconds
}

export interface AttemptsTakenClickstream extends Clickstream {
    attempts: number;
}