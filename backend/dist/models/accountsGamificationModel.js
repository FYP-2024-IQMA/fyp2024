"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsGamification = void 0;
class AccountsGamification {
    constructor(userID, points, streaks, lastUnitCompletionDate) {
        this.userID = userID;
        this.points = points;
        this.streaks = streaks;
        this.lastUnitCompletionDate = lastUnitCompletionDate;
    }
    getPoints() {
        return this.points;
    }
    getStreaks() {
        return this.streaks;
    }
    getLastUnitCompletionDate() {
        return this.lastUnitCompletionDate;
    }
}
exports.AccountsGamification = AccountsGamification;
