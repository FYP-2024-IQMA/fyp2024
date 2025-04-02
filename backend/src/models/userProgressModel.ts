import { Enums } from "../config/database.types";

export class UserProgress {
  user_id: string;
  unit_id: string;
  lesson_id: string;
  progress_type: Enums<"progress_type">;
  status: Enums<"stone_progress">;
  created_at: Date;

  constructor(
    user_id: string,
    unit_id: string,
    lesson_id: string,
    progress_type: Enums<"progress_type">,
    status: Enums<"stone_progress">,
    created_at: Date
  ) {
    this.user_id = user_id;
    this.unit_id = unit_id;
    this.lesson_id = lesson_id;
    this.progress_type = progress_type;
    this.status = status;
    this.created_at = created_at;
  }
}
