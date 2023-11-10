import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateSelect = ({ onDateSelect }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    onDateSelect(formattedDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => showMode('date')}
          title="Select Date"
          color="#007AFF" // Apple-like blue color
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    padding: 16,
    backgroundColor: '#f4f4f4', // Add margin to create space below the component
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
    
  },
});

export default DateSelect;
