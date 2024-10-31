export interface Feedback {
    eventType: "feedback" | "bug" | "sugestion";
    message: string;
    rating: number;
    status: "open";
    timestamp: Date;
    userID: string;
}