import { Keys, TypesErrors } from "../types";

export function validation(value: string, validations: TypesErrors) {
  const ERRORS_ALERT: Record<keyof TypesErrors, string> = {
    minLength: "Меньше минимальной длины",
    isEmpty: "Поле не должно быть пустым",
  };

  const validationsKeys = Object.keys(validations);
  let textError = "";

  const errors: Keys = validationsKeys.reduce((result, item) => {
    result[item as keyof TypesErrors] = false;
    return result;
  }, {} as Keys);

  validationsKeys.forEach((key: string) => {
    switch (key) {
      case "minLength":
        errors[key] = value.length <= (validations.minLength || 0);
        textError = errors[key] ? ERRORS_ALERT[key] : textError;
        break;
      case "isEmpty":
        errors[key] = !value;
        textError = errors[key] ? ERRORS_ALERT[key] : textError;
        break;
    }
  });

  const isError = Object.values(errors).some((error) => error);

  return {
    isError,
    textError: textError,
  };
}
