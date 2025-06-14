
import { useState } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface FormField {
  value: string;
  error: string | null;
  touched: boolean;
}

interface FormValidationConfig {
  [key: string]: ValidationRule;
}

export const useFormValidation = (config: FormValidationConfig) => {
  const [fields, setFields] = useState<{ [key: string]: FormField }>(() => {
    const initialFields: { [key: string]: FormField } = {};
    Object.keys(config).forEach(key => {
      initialFields[key] = { value: '', error: null, touched: false };
    });
    return initialFields;
  });

  const validateField = (name: string, value: string): string | null => {
    const rules = config[name];
    if (!rules) return null;

    if (rules.required && !value.trim()) {
      return `${name} is required`;
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `${name} must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `${name} must be no more than ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return `${name} format is invalid`;
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  };

  const setFieldValue = (name: string, value: string) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        error: validateField(name, value),
        touched: true
      }
    }));
  };

  const setFieldTouched = (name: string) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
        error: validateField(name, prev[name].value)
      }
    }));
  };

  const validateAll = (): boolean => {
    let isValid = true;
    const newFields = { ...fields };

    Object.keys(config).forEach(name => {
      const error = validateField(name, fields[name].value);
      newFields[name] = {
        ...newFields[name],
        error,
        touched: true
      };
      if (error) isValid = false;
    });

    setFields(newFields);
    return isValid;
  };

  const reset = () => {
    const resetFields: { [key: string]: FormField } = {};
    Object.keys(config).forEach(key => {
      resetFields[key] = { value: '', error: null, touched: false };
    });
    setFields(resetFields);
  };

  const getFieldProps = (name: string) => ({
    value: fields[name]?.value || '',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(name, e.target.value),
    onBlur: () => setFieldTouched(name),
    error: fields[name]?.touched ? fields[name]?.error : null
  });

  const isValid = Object.values(fields).every(field => !field.error);
  const hasErrors = Object.values(fields).some(field => field.error && field.touched);

  return {
    fields,
    setFieldValue,
    setFieldTouched,
    validateAll,
    reset,
    getFieldProps,
    isValid,
    hasErrors
  };
};
