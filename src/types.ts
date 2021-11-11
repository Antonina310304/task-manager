import { ComponentType } from 'react';
import ANY from './static/any';

export type TaskStatusData = 'done' | 'progress' | 'created';

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
export type ViewLink = 'default' | 'delete' | 'icon' | 'nav' | 'primary' | 'secondary';

export interface RemoveTaskProps {
  (arg: number): void
}

export interface ChangeTaskProps {
  (arg: TaskDataExpanded): void
}
export interface LinkProps {
  autAccess: boolean | typeof ANY;
  path: string;
  component: ComponentType<any>;
  exact: boolean;
}

export type TypeLink = 'nav' | 'link' | 'button';

export const TypeLinkData:Record<TypeLink, TypeLink> = {
  nav: 'nav',
  link: 'link',
  button: 'button',
};
