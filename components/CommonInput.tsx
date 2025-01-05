import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

interface CommonInputProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  control: Control<T>;
  label: string;
  rules?: RegisterOptions<T>;
  errorMessage?: string;
  isRequired?: boolean;
}

const CommonInput = <T extends FieldValues>({
  name,
  control,
  label,
  rules = {},
  placeholder,
  errorMessage,
  isRequired = false,
  ...textInputProps
}: CommonInputProps<T>) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, isRequired && styles.requiredLabel]}>
        {label}
        {isRequired && '*'}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder={placeholder}
              placeholderTextColor='#999'
              {...textInputProps}
            />
            {error && (
              <Text style={styles.errorText}>
                {error.message || errorMessage || 'This field is required'}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#002569',
    marginBottom: 8,
  },
  requiredLabel: {
    color: '#000080',
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    paddingVertical: 5,
    color: '#000',
  },
  errorInput: {
    borderBottomColor: '#ff4d4d',
  },
  errorText: {
    marginTop: 5,
    fontSize: 12,
    color: '#ff4d4d',
  },
});

export default CommonInput;
