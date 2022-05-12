import { REGEX_EMAIL } from './email.constants';

export function validateEmail(value: string, message = 'Invalid email') {
  if (!REGEX_EMAIL.test(value)) {
    return message;
  }
  return undefined;
}
