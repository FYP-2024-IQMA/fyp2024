"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = exports.Role = void 0;
var Role;
(function (Role) {
    Role["User"] = "user";
    Role["Assistant"] = "assistant";
})(Role || (exports.Role = Role = {}));
class Chat {
    constructor(userID, sectionID, unitID, queryPair, dateCreated) {
        this.userID = userID;
        this.sectionID = sectionID;
        this.unitID = unitID;
        this.queryPair = queryPair;
        this.dateCreated = dateCreated;
    }
    getQueryPair() {
        return this.queryPair;
    }
    getDateCreated() {
        return new Date(this.dateCreated);
    }
}
exports.Chat = Chat;
