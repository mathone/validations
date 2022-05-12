import type { ValidationRequiredValue } from './required.types';

export function validateRequired<T extends ValidationRequiredValue>(
  value: T,
  message = 'This field is required',
) {
  if (typeof value === 'string' && !value?.length) {
    return message;
  }
  if (typeof value === 'number') {
    return undefined;
  }
  if (!value) {
    return message;
  }
  return undefined;
}
