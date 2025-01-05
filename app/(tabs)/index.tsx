import {
  Image,
  StyleSheet,
  Platform,
  View,
  Button,
  SafeAreaView,
  Text,
  ScrollView,
} from 'react-native';

import { useForm } from 'react-hook-form';
import CommonInput from '@/components/CommonInput';
import CommonRadio from '@/components/CommonRadio';
import CommonSingleSelect from '@/components/CommonSingleSelect';
import CommonCheckbox from '@/components/CommonCheckbox';
import CommonMultipleSelect from '@/components/CommonMultilpleSelect';

interface FormValues {
  email: string;
  password: string;
  ageGroup: string;
  maritalStatus: string;
  dropdown: string;
  roles: string[];
  confirmation: string[];
  items: string[];
}

export default function HomeScreen() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      items: [],
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form Data', JSON.stringify(data, null, 2));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <CommonInput<FormValues>
          name='email'
          control={control}
          label='Email'
          isRequired
          placeholder='Enter your email'
          keyboardType='email-address'
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          }}
        />
        <CommonInput
          name='password'
          control={control}
          label='Password'
          placeholder='Enter your password'
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
        />

        <CommonRadio<FormValues>
          name='ageGroup'
          control={control}
          label='Age Group'
          isRequired
          options={[
            { label: 'Adult', value: 'adult' },
            { label: 'Child', value: 'child' },
            { label: 'Infant', value: 'infant' },
          ]}
          layout='vertical'
          rules={{ required: 'Please select an age group' }}
        />
        <CommonRadio<FormValues>
          name='maritalStatus'
          control={control}
          label='Marital Status'
          options={[
            { label: 'Single', value: 'single' },
            { label: 'Married', value: 'married' },
            { label: 'Divorced', value: 'divorced' },
          ]}
          layout='horizontal'
          disabled={false}
        />

        <CommonSingleSelect<FormValues>
          name='dropdown'
          label='Dropdown'
          control={control}
          data={[
            { label: 'Option 1', value: '1' },
            { label: 'Option 2', value: '2' },
          ]}
          rules={{ required: 'Selection is required' }}
          placeholder='Select an option'
          labelField='label'
          valueField='value'
          search
          maxHeight={200}
          required
        />

        <View style={{ marginVertical: 40 }}>
          <CommonMultipleSelect
            name='items'
            control={control}
            rules={{ required: 'Please select at least one item' }}
            data={[
              { label: 'Item 1', value: '1' },
              { label: 'Item 2', value: '2' },
              { label: 'Item 3', value: '3' },
              { label: 'Item 4', value: '4' },
            ]}
            label='Select Items'
            required
          />
        </View>

        <CommonCheckbox
          name='roles'
          control={control}
          rules={{ required: 'Please select at least one role' }}
          options={[
            { label: 'VIP', value: 'vip' },
            { label: 'Staff', value: 'staff' },
          ]}
          layout='horizontal'
        />

        {/* Confirmation Checkbox */}
        <CommonCheckbox
          name='confirmation'
          control={control}
          rules={{ required: 'Please confirm persons affected' }}
          options={[
            { label: 'Confirm Persons Affected', value: 'confirm' },
            { label: 'Confirm Persons Affected1', value: 'confirm1' },
            { label: 'Confirm Persons Affected2', value: 'confirm2' },
          ]}
          layout='vertical'
        />

        <Button title='Submit' onPress={handleSubmit(onSubmit)} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    margin: 20,
    marginTop: 50,
  },
});
