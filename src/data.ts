import { TaskData } from "./types";

// @ts-ignore
interface Test extends TaskData {
  checked?: boolean;
}

export const taskList: Test[] = [
  {
    id: 1,
    title: "Выучить реакт1",
    text: "пройти 1 уровня обучения",
    dateCreate: new Date("2021-07-03"),
    status: "done",
  },
  {
    id: 2,
    title: "Выучить реакт2",
    text: "пройти 2 уровня обучения",
    dateCreate: new Date("2021-07-03"),
    status: "progress",
  },
  {
    id: 3,
    title: "Выучить реакт3",
    text: "пройти 3 уровня обучения",
    dateCreate: new Date("2021-07-03"),
    status: "created",
  },
  {
    id: 4,
    title: "Выучить реакт4",
    text: "пройти 4 уровня обучения",
    dateCreate: new Date("2021-07-03"),
    status: "progress",
  },
];
