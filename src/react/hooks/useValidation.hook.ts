/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type {
  ValidationConfig,
  ValidationData,
  ValidationFields,
  ValidationSchema,
  ValidationType,
} from '../../@types';

import { useCallback, useMemo } from 'react';

import { validateField, validateFields } from '../../validators';

export function useValidation<
  TData extends ValidationData,
  TSchema extends ValidationSchema = ValidationSchema,
>(schema: TSchema) {
  const handleValidateField = useCallback(
    function <T extends keyof TData>(
      field: keyof typeof schema,
      value: TData[T] | unknown,
    ): string | undefined {
      const fieldSchema = schema[field];
      return validateField(
        fieldSchema as ValidationConfig,
        value as ValidationType,
      );
    },
    [schema],
  );

  const handleValidateFields = useCallback(
    function (data: TData): ValidationFields | undefined {
      return validateFields(schema, data);
    },
    [validateField],
  );

  return useMemo(
    () => ({
      validateField: handleValidateField,
      validateFields: handleValidateFields,
    }),
    [handleValidateField, handleValidateFields],
  );
}
