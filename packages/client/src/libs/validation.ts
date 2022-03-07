import { ValidationErrors } from "final-form";

interface ValidationResult {
  message: string;
}

type Validator = (value: any) => ValidationResult | undefined | false;

type ValidatorFactory = () => Validator;

export const createValidator =
  <T extends Record<string, any>>(
    validators: Partial<Record<keyof T, Validator[]>>
  ) =>
  (values: T): ValidationErrors => {
    const errors: ValidationErrors = {};
    Object.keys(validators).forEach((field) => {
      validators[field]?.forEach((validator) => {
        const result = validator(values[field]);
        if (result) {
          errors[field] = result;
        }
      });
    });
    return errors;
  };

export const required: ValidatorFactory = () => (value) =>
  !value && { message: "Required" };
