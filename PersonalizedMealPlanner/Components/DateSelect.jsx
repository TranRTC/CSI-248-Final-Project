import React, { useState } from 'react';
import { View, TouchableOpacity, Platform, Text, StyleSheet } from 'react-native';
// this component need import package @react-native-community/datetimepicker
// this component work only in iphone. Not working in web
import DateTimePicker from '@react-native-community/datetimepicker';


//props onDateSelect to move formated date to parent App() component
const DateSelect = ({ onDateSelect }) => {
  // State variable and update function to store and update Date
    const [date, setDate] = useState(new Date());
  // state variable and update function to store and update mode of the time-picker. Mode can be  time, datetime...
  const [mode, setMode] = useState('date');
  // state variable of bool tyle and update function to store and update the conditional rendering status of the time-picker
  // when press the select button this variable change to true and allow the time picker be-ing rendered
  const [show, setShow] = useState(false);

  // two parameters event & selectedDate are used passed from datepicker to eventhandler
  // in this case event parameter is not used
  const onChange = (event, selectedDate) => {
    
    // with the selectedDate (parameter) passed from the touch event do below

    // 1. choose selected date if it is truthy else will chose date
    const currentDate = selectedDate || date;

    setShow(Platform.OS === 'ios');

    // 2. update current date
    setDate(currentDate);

    // 3. Format date time from javascript Date object to readable en-US format formed Year/Month/Date
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // 4. The date after being formated is uplifted via this props
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
      {/* The text Select Date is nested in the touchablopacity
       if it is press the showMode() eventhandler is called
       it then set the mode and allow time-picker appear after updating setShow
        */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => showMode('date')}
      >
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>
      {/* time-picker is assigned with date value, mode and onChange callback function
       after touch to select a date this callback function will lift update the formatted date to parent App() component
       and ready for the use of other component      
      */}
      {show && (
        // Date time picker is passed with props
        <DateTimePicker
          //testID="dateTimePicker"
          value={date}
          mode={mode}
          //is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};


{/** about the styling

this container use flex mode
it account 0.5 part space of parent container

direction of child component: row

*/}
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
