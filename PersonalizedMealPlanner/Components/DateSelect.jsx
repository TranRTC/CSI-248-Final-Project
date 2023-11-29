import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, Text, StyleSheet } from 'react-native';
// this component need import package @react-native-community/datetimepicker
// this component work only in iphone. Not working in web
import DateTimePicker from '@react-native-community/datetimepicker';


//props onDateSelect to move formated date to parent App() component
const DateSelect = ({ onDateSelect }) => {
  // Create state variables
  // Hold current date
  const [date, setDate] = useState(new Date());
  // Hold current mode
  const [mode, setMode] = useState('date');
  // Hold a state variable of bool type use to conditional rendering for the time picker when the button is click
  const [show, setShow] = useState(false);

  // two parameters event & selectedDate are used passed from datepicker to eventhandler
  const onChange = (event, selectedDate) => {

    // choose selected date if it is truthy else will chose date
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    // This function used to format data time data
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // this props used to pass the selected date to App. 
    onDateSelect(formattedDate);
  };
  // this is eventhandler for touching the "Select Date" button
  const showMode = (currentMode) => {
    //  show status variable to true to show the Picker in Date mode
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={styles.container}>
      {/* when touch into the button name "Select Date"
      the picker will appear with mode is "date" it can be used for mode date & time */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => showMode('date')}
      >
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>
      {/* show is state variable used for conditional rendering
      when the button is press, show change to true then the timepicker appear
      
      */}
      {show && (
        // Date time picker is passed with props
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
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});


export default DateSelect;
