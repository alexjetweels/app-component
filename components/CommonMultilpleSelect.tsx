import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

interface DropdownOption {
  label: string;
  value: string;
}

interface CommonMultipleSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  data: DropdownOption[];
  errorMessage?: string;
  label?: string; // Field label
  required?: boolean; // Show required indicator (*)
}

const CommonMultipleSelect = <T extends FieldValues>({
  name,
  control,
  rules,
  data,
  errorMessage,
  label,
  required,
}: CommonMultipleSelectProps<T>) => {
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
          {/* MultiSelect Dropdown */}
          <MultiSelect
            style={[styles.dropdown, error && styles.errorBorder]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={data}
            labelField='label'
            valueField='value'
            placeholder='Select items'
            searchPlaceholder='Search...'
            value={value}
            onChange={(items) => {
              onChange(items); // Pass selected items to react-hook-form
            }}
            selectedStyle={styles.selectedStyle}
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

export default CommonMultipleSelect;

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
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    borderRadius: 12,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
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
