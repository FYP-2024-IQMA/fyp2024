export interface Clickstream {
    userID: string;
    eventType: "timeTaken" | "attemptsTaken";
    event: string;
    timestamp: Date;
}

export interface TimeTakenClickstream extends Clickstream {
    time: number;      // in seconds
}

export interface AttemptsTakenClickstream extends Clickstream {
    attempts: number;
}