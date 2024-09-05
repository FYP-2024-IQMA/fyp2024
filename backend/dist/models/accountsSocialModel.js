"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsSocial = void 0;
class AccountsSocial {
    constructor(userID, compLiteracy, relationshipToPeers, socialBackground, tendency) {
        this.userID = userID;
        this.compLiteracy = compLiteracy;
        this.relationshipToPeers = relationshipToPeers;
        this.socialBackground = socialBackground;
        this.tendency = tendency;
    }
    getCompLiteracy() {
        return this.compLiteracy;
    }
    getRelationshipToPeers() {
        return this.relationshipToPeers;
    }
    getSocialBackground() {
        return this.socialBackground;
    }
    getTendency() {
        return this.tendency;
    }
}
exports.AccountsSocial = AccountsSocial;
