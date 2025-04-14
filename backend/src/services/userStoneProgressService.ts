import supabase from "../config/supabaseConfig";
import { UserStoneProgress } from "../models/userStoneProgressModel";
import { Enums } from "../config/database.types";


/* CREATE */
export async function createUserStoneProgress(
  userID: string,
  last_completed_stone_index: number,
  current_stone_index: number,
  current_screen_index: number,
  current_screen_pathname: Enums<"path_name">

) {
  const { data, error } = await supabase
    .from("user_stone_progress")
    .insert({
      userID,
      last_completed_stone_index,
      current_stone_index,
      current_screen_index,
      current_screen_pathname
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
  last_completed_stone_index?: number,
  current_stone_index?: number,
  current_screen_index?: number,
  current_screen_pathname?: Enums<"path_name">
) {
  const updateFields: { [key: string]: any } = {};

  // Fetch current progress first
  // Do not overwrite older progress
  const currentProgress = await getUserStoneProgressByUserId(userID);

  if (last_completed_stone_index !== undefined) {
    if (currentProgress && last_completed_stone_index > currentProgress.last_completed_stone_index!) {
      updateFields.last_completed_stone_index = last_completed_stone_index;
      updateFields.current_stone_index = current_stone_index ?? (last_completed_stone_index + 1);
      updateFields.current_screen_index = current_screen_index ?? 0;
      updateFields.current_screen_pathname = current_screen_pathname ?? null;
    } else {
      console.log('Skip update: Trying to overwrite with earlier stone. No update made.');
      return { status: 200, statusText: 'No update needed (older progress)' };
    }
  } else {
    if (current_stone_index !== undefined) updateFields.current_stone_index = current_stone_index;
    if (current_screen_index !== undefined) updateFields.current_screen_index = current_screen_index;
    if (current_screen_pathname !== undefined) updateFields.current_screen_pathname = current_screen_pathname;
  }

  if (Object.keys(updateFields).length === 0) {
    throw new Error("No valid fields to update");
  }

  const { status, statusText, error } = await supabase
    .from("user_stone_progress")
    .update(updateFields)
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
