export type TaskStatusData = 'done' | 'progress' | 'created';
export type IconType = 'close';

export type State = 'create' | 'change';

export type InputType = 'text' | 'date';

export interface TaskData {
  id: number;
  title: string;
  text: string;
  status: TaskStatusData;
  dateCreate: Date;
}

export interface ResolveProps {
  (data: any): void;
}

export interface RejectProps {
  (): void;
}

export interface TaskDataExpanded extends TaskData {
  checked?: boolean;
}

export type ValidatedFields = 'title' | 'text' | 'dateCreate' | 'status';

export type Keys = Record<keyof TypesErrors, boolean>;

export interface TypesErrors {
  isEmpty?: boolean;
  minLength?: number;
}

export type ValidationRulesType = Record<ValidatedFields, TypesErrors>;

/* обязательные поля из ValidatedFields (по ним проходит проверка валидации)
 и любые поля из TaskData, которые являются необязательными */
export type DisplayFieldsType = Record<ValidatedFields, any> &
{
  [key in keyof TaskData]?: {
    placeholder: string;
    inputName: string;
    type: string;
  };
};

export type ActionType = 'checked' | 'remove' | 'change';
