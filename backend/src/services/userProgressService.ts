import supabase from "../config/supabaseConfig";
import { UserProgress } from "../models/userProgressModel";

export async function getUserProgressBySection(
    userID: string,
    sectionID: string
  ): Promise<UserProgress[]> {
    const { data, error } = await supabase
      .from("user_progress")
      .select(`
        user_id,
        unit_id,
        lesson_id,
        progress_type,
        status,
        created_at,
        unit:unit_id (
          sectionID
        )
      `)
      .eq("user_id", userID)
      .eq("unit.sectionID", sectionID);
  
    if (error) {
      console.error(error);
      throw error;
    }
  
    return data.map(
      (item) =>
        new UserProgress(
          item.user_id,
          item.unit_id,
          item.lesson_id,
          item.progress_type,
          item.status!,
          new Date(item.created_at!)
        )
    );
  }