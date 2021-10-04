import { taskStatusData } from "../types";

export const statusType: Record<taskStatusData, string> = {
  done: "Выполнено",
  progress: "Выполняется",
  created: "Создана",
};
