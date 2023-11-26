import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, Text, StyleSheet } from 'react-native';
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
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => showMode('date')}
      >
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>
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
    flex: 0.5,
    padding: 16,    
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start', 
    //backgroundColor: '#f4f4f4',
    //marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#0070c9',
    padding: 12,
    borderRadius: 5,
    // marginLeft: 'auto', // Remove this line
    alignSelf: 'flex-start', // Add this line to left-align the button text
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default DateSelect;
