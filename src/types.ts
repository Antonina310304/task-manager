export type taskStatusData = "done" | "progress" | "created";

export type State = "create" | "change" | "remove";

export type InputType = "text" | "date";

export interface TaskData {
  id: number;
  title: string;
  text: string;
  status: taskStatusData;
  dateCreate: Date;
  checked: boolean;
}

export type validatedFields = "title" | "text" | "dateCreate" | "status";

export type Keys = Record<keyof TypesErrors, boolean>;

export interface TypesErrors {
  isEmpty?: boolean;
  minLength?: number;
}

/* обязательные поля из validatedFields (по ним проходит проверка валидации)
 и любые поля из TaskData, которые являются необязательными */
export type displayFieldsType = Record<validatedFields, any> &
  {
    [key in keyof TaskData]?: {
      placeholder: string;
      inputName: string;
      type: string;
    };
  };

/* правила валидации полей*/
export const validationRules: Record<validatedFields, TypesErrors> = {
  title: {
    minLength: 3,
    isEmpty: true,
  },

  text: {
    minLength: 3,
    isEmpty: true,
  },

  dateCreate: {
    minLength: 3,
    isEmpty: true,
  },
  status: {},
};

/* список отображаемых полей */
export const displayFields: displayFieldsType = {
  title: {
    placeholder: "Название задачи",
    inputName: "title",
    type: "text",
  },
  text: {
    placeholder: "Описание задачи",
    inputName: "text",
    type: "text",
  },
  dateCreate: {
    placeholder: "Дата создания задачи",
    inputName: "dateCreate",
    type: "date",
  },
  status: {
    placeholder: "Статус",
    inputName: "status",
    type: "select",
  },
};
