export type ValidationType = string | number | boolean;

export type ValidationConfig = {
  type: 'email' | 'password';
  required?: boolean;
  max?: number;
  min?: number;
};

export type ValidationSchema = {
  [key: string]: ValidationConfig;
};

export type ValidationData = {
  [key: string]: unknown;
};

export type ValidationFields = {
  [key: string]: string | undefined;
};
