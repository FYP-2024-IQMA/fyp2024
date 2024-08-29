import supabase from "../config/supabaseConfig";
import { Json } from "../config/database.types";
import * as chatModel from "../models/chatModel";

type UserSection = {
    userID: string;
    sectionID: string;
    n?: number;
};

function validateQueryPair(queryPair: any): queryPair is chatModel.QueryPair {
    return (
        typeof queryPair === "object" &&
        queryPair !== null &&
        Object.values(chatModel.Role).includes(queryPair.role) &&
        (typeof queryPair.content === "string" || queryPair.content === null)
    );
}

/* CREATE */

export async function createChats(chat: chatModel.Chat) {
    for (const text of chat.queryPair) {
        if (!validateQueryPair(text)) {
            console.error(`Invalid QueryPair object: ${JSON.stringify(text)}`);
            throw new Error(
                `Invalid QueryPair object: ${JSON.stringify(text)}`
            );
        }
    }

    const formattedChats = {
        ...chat,
        queryPair: chat.queryPair as unknown as Json[], // Convert QueryPair[] to Json[]
    };

    const { data, error } = await supabase
        .from("chat")
        .insert(formattedChats)
        .select();

    if (error) {
        console.error(error);
        throw error;
    } else {
        return data;
    }
}

/* READ */

export async function getChatHistory(userSection: UserSection) {
    const { userID, sectionID } = userSection;

    const { data, error } = await supabase
        .from("chat")
        .select("dateCreated, queryPair")
        .eq("userID", userID)
        .eq("sectionID", sectionID)
        // .order("dateCreated", { ascending: false }); // Order by date created (latest first);

    if (error) {
        console.error(error);
        throw error;
    }

    return data;
}

export async function getChatHistoryLimit(userSection: UserSection) {
    
    const { userID, sectionID, n } = userSection;

    const { data, error } = await supabase
        .from("chat")
        .select("chattext, datecreated")
        .eq("userID", userID)
        .eq("sectionID", sectionID)
        .order("dateCreated", { ascending: false }) // Order by date created (latest first)
        .limit(n!);

    if (error) {
        console.error(error);
        throw error;
    }

    return data.reverse();
}

/* DELETE */

export async function deleteChat(userSection: UserSection) {

    const { userID, sectionID } = userSection;

    const { status, statusText, error } = await supabase
        .from("chat")
        .delete()
        .eq("userID", userID)
        .eq("sectionID", sectionID);

    if (error) {
        console.error(error);
        throw error;
    } else {
        return { status, statusText };
    }
} 


