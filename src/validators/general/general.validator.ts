// eslint-disable-next-line eslint-comments/disable-enable-pair
import type {
  ValidationConfig,
  ValidationData,
  ValidationFields,
  ValidationSchema,
  ValidationType,
} from '../../@types';

import { validateRequired, validateEmail } from '../../validators';

export function validateField<T extends ValidationType>(
  config: ValidationConfig,
  value: T,
): string | undefined {
  if (config.required) {
    const requiredError = validateRequired(value);
    if (requiredError) {
      return requiredError;
    }
  }
  if (config.type === 'email') {
    return validateEmail(value as string);
  }
  return undefined;
}

export function validateFields<T extends ValidationData>(
  schema: ValidationSchema,
  data: T,
): ValidationFields | undefined {
  let hasError = false;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const errors = Object.keys(data).reduce((prev, field) => {
    const error = validateField(
      schema[field] as ValidationConfig,
      data[field] as ValidationType,
    );
    if (error) {
      hasError = true;
      prev[field] = error;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return prev;
  }, {} as ValidationFields);
  return hasError ? errors : undefined;
}
