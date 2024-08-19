import { Enums } from "../config/database.types";

export class AccountsSocial {
    userID: string;
    compLiteracy: Enums<"computer_literacy_type">;
    relationshipToPeers: Enums<"relationship_to_peers_type">;
    socialBackground: Enums<"social_background_type">;
    tendency: Enums<"tendency_to_compete_or_cooperate_type">;

    constructor(
        userID: string,
        compLiteracy: Enums<"computer_literacy_type">,
        relationshipToPeers: Enums<"relationship_to_peers_type">,
        socialBackground: Enums<"social_background_type">,
        tendency: Enums<"tendency_to_compete_or_cooperate_type">
    ) {
        this.userID = userID;
        this.compLiteracy = compLiteracy;
        this.relationshipToPeers = relationshipToPeers;
        this.socialBackground = socialBackground;
        this.tendency = tendency;
    }

    getCompLiteracy(): Enums<"computer_literacy_type"> {
        return this.compLiteracy;
    }
    getRelationshipToPeers(): Enums<"relationship_to_peers_type"> {
        return this.relationshipToPeers;
    }
    getSocialBackground(): Enums<"social_background_type"> {
        return this.socialBackground;
    }
    getTendency(): Enums<"tendency_to_compete_or_cooperate_type"> {
        return this.tendency;
    }
}
