export interface Feedback {
    userID: string;
    timestamp: Date;
    eventType: "feedback" | "bug" | "sugestion";
    rating: number;
    message: string;
}