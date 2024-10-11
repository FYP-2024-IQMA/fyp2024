
export class AccountsGamification {
    userID: string;
    points: number;
    streaks: number;
    lastUnitCompletionDate: Date | null;

    constructor(
        userID: string,
        points: number,
        streaks: number,
        lastUnitCompletionDate: Date | null
    ) {
        this.userID = userID;
        this.points = points;
        this.streaks = streaks;
        this.lastUnitCompletionDate = lastUnitCompletionDate;
    }

    getPoints(): number {
        return this.points;
    }

    getStreaks(): number {
        return this.streaks;
    }

    getLastUnitCompletionDate(): Date | null {
        return this.lastUnitCompletionDate;
    }
}
