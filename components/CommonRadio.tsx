import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioSelectProps<T extends FieldValues> {
  name: Path<T>; // The name of the field
  control: Control<T>; // React Hook Form control
  label?: string; // Label for the radio group
  options: RadioOption[]; // List of radio options
  rules?: RegisterOptions<T>; // Validation rules
  layout?: 'vertical' | 'horizontal'; // Layout style
  disabled?: boolean; // Disable the radio group
  isRequired?: boolean;
}

const CommonRadio = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  rules = {},
  layout = 'vertical',
  isRequired,
  disabled = false,
}: RadioSelectProps<T>) => {
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
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <View
              style={[
                styles.optionsContainer,
                layout === 'horizontal' && styles.horizontal,
              ]}
            >
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[styles.option, disabled && styles.disabledOption]}
                  onPress={() => !disabled && onChange(option.value)}
                  disabled={disabled}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      value === option.value && styles.radioCircleSelected,
                      disabled && styles.disabledRadioCircle,
                    ]}
                  >
                    {value === option.value && (
                      <View style={styles.radioCircleInner} />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.optionLabel,
                      disabled && styles.disabledLabel,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {error && <Text style={styles.errorText}>{error.message}</Text>}
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
    color: '#666',
    marginBottom: 8,
  },
  requiredLabel: {
    color: '#000080',
  },
  optionsContainer: {
    flexDirection: 'column',
  },
  horizontal: {
    flexDirection: 'row',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 20, // For horizontal spacing
  },
  disabledOption: {
    opacity: 0.5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A5A5A5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioCircleSelected: {
    borderColor: '#002569',
  },
  disabledRadioCircle: {
    borderColor: '#A5A5A5',
  },
  radioCircleInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#002569',
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
  },
  disabledLabel: {
    color: '#ccc',
  },
  errorText: {
    fontSize: 12,
    color: '#ff4d4d',
    marginTop: 5,
  },
});

export default CommonRadio;
