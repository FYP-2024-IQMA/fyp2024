import supabase from "../config/supabaseConfig";
import { UserStoneProgress } from "../models/userStoneProgressModel";

/* CREATE */
export async function createUserStoneProgress(
  userID: string,
  last_completed_stone_index: number
) {
  const { data, error } = await supabase
    .from("user_stone_progress")
    .insert({
      userID,
      last_completed_stone_index,
    })
    .select();

  if (error) {
    console.error(error);
    throw error;
  } else {
    return data;
  }
}

/* READ */
export async function getUserStoneProgressByUserId(userID: string) {
  const { data, error } = await supabase
    .from("user_stone_progress")
    .select("*")
    .eq("userID", userID)
    .single();

  if (error) {
    console.error(error);
    throw error;
  } else {
    return data;
  }
}

export async function getAllUserStoneProgress() {
  const { data, error } = await supabase
    .from("user_stone_progress")
    .select("*");

  if (error) {
    console.error(error);
    throw error;
  } else {
    return data;
  }
}

/* UPDATE */
export async function updateUserStoneProgress(
  userID: string,
  last_completed_stone_index: number
) {
  const { status, statusText, error } = await supabase
    .from("user_stone_progress")
    .update({
      last_completed_stone_index,
      updated_at: new Date().toISOString(),
    })
    .eq("userID", userID);

  if (error) {
    console.error(error);
    throw error;
  } else {
    return { status, statusText };
  }
}

/* DELETE */
export async function deleteUserStoneProgress(userID: string) {
  const { status, statusText, error } = await supabase
    .from("user_stone_progress")
    .delete()
    .eq("userID", userID);

  if (error) {
    console.error(error);
    throw error;
  } else {
    return { status, statusText };
  }
}
