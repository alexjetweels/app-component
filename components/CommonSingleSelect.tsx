import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';

interface DropdownOption {
  label: string;
  value: string;
}

interface CommonSingleSelectProps<T extends FieldValues>
  extends Omit<DropdownProps<DropdownOption>, 'value' | 'onChange'> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  data: DropdownOption[];
  errorMessage?: string;
  label?: string; // Field label
  required?: boolean; // Show required indicator (*)
}

const CommonSingleSelect = <T extends FieldValues>({
  name,
  control,
  rules,
  data,
  errorMessage,
  label,
  required,
  ...dropdownProps
}: CommonSingleSelectProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          {/* Label */}
          {label && (
            <Text style={styles.label}>
              {label}
              {required && <Text style={styles.required}>*</Text>}
            </Text>
          )}
          {/* Dropdown */}
          <Dropdown
            {...dropdownProps}
            data={data}
            style={[
              styles.dropdown,
              dropdownProps.style,
              error && styles.errorBorder,
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            value={value}
            labelField='label'
            valueField='value'
            onChange={(item) => onChange(item.value)}
          />
          {/* Error Message */}
          {error && (
            <Text style={styles.errorText}>
              {errorMessage || error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
};

export default CommonSingleSelect;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 8,
  },
  required: {
    color: 'red',
  },
  dropdown: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  errorBorder: {
    borderBottomColor: 'red',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
});
