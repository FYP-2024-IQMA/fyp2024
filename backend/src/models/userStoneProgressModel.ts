import { Enums } from "../config/database.types";

export class UserStoneProgress {
  userID: string;
  last_completed_stone_index: number;
  curent_stone_index: number;
  current_screen_index: number;
  current_screen_pathname: Enums<"path_name">;
  updated_at: Date;

  constructor(
    userID: string,
    last_completed_stone_index: number,
    curent_stone_index: number,
    current_screen_index: number,
    current_screen_pathname: Enums<"path_name">,
    updated_at: Date
  ) {
    this.userID = userID;
    this.last_completed_stone_index = last_completed_stone_index;
    this.curent_stone_index = curent_stone_index;
    this.current_screen_index = current_screen_index;
    this.current_screen_pathname = current_screen_pathname;
    this.updated_at = updated_at;
  }
}
