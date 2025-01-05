import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CheckboxOption {
  label: string;
  value: string;
}

interface CommonCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T>;
  options: CheckboxOption[]; // List of checkbox options
  layout?: 'horizontal' | 'vertical'; // Layout style
}

const CommonCheckbox = <T extends FieldValues>({
  name,
  control,
  rules,
  options,
  layout = 'vertical',
}: CommonCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View>
          {/* Checkbox Group */}
          <View
            style={[
              styles.container,
              layout === 'horizontal' && styles.horizontal,
            ]}
          >
            {options.map((option) => {
              const isSelected = value?.includes(option.value);
              return (
                <TouchableOpacity
                  key={option.value}
                  style={styles.checkboxContainer}
                  onPress={() => {
                    const newValue = isSelected
                      ? value.filter((v: string) => v !== option.value)
                      : [...(value || []), option.value];
                    onChange(newValue);
                  }}
                >
                  <View style={[styles.checkbox, isSelected && styles.checked]}>
                    {isSelected && (
                      <Icon name='check' size={16} color='white' />
                    )}
                  </View>
                  <Text style={styles.label}>{option.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Error Message */}
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default CommonCheckbox;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: 'gray',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
