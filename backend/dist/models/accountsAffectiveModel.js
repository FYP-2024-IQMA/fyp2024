"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsAffective = void 0;
class AccountsAffective {
    constructor(userID, attitude, barriers, motivationalLevel, personality, reasons) {
        this.userID = userID;
        this.attitude = attitude;
        this.barriers = barriers;
        this.motivationalLevel = motivationalLevel;
        this.personality = personality;
        this.reasons = reasons;
    }
    getAttitude() {
        return this.attitude;
    }
    getBarriers() {
        return this.barriers;
    }
    getMotivationalLevel() {
        return this.motivationalLevel;
    }
    getPersonality() {
        return this.personality;
    }
    getReasons() {
        return this.reasons;
    }
}
exports.AccountsAffective = AccountsAffective;
