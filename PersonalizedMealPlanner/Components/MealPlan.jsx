import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';


// use to create ID for the mealplan object
let IdCounter = 9;

// function 4 arguments: 3 statevariable and 1 callback function
// selectedDate, selectedRecipe, mealPlanData are passed down, SetMealPlanData is call back function to lift updata)

const MealPlan = ({selectedDate, selectedRecipe, mealPlanData, SetMealPlanData }) => {

 // This function used to add new mealplan to the database

  const addMeal = () => {

    // check if date is selected and recipe is selected then.
    if (selectedDate && selectedRecipe) {

      // create new mealplan object with simple id by inreamenting after one another
      const newMealPlan = {
        id: IdCounter++,
        recipe: selectedRecipe,
        date: selectedDate
      };
      
      // add new mealplan to the current mealplan array
      SetMealPlanData([newMealPlan,...mealPlanData]);
      
      //setSelectedDate('');
      //setSelectedRecipe('');
      console.log('New meal added:', newMealPlan);
    }
  };  

  // Remove function to take in one parameter that is the index of the entry want to remove
  const removeEntry = (entryIndex) => {

    //create a compy of mealPlanData array for the modification(delete)
    const updatedMealPlanData = [...mealPlanData];

    // use method .splice and pass arguments (from the index, 1 entry) to deleted the entry
    updatedMealPlanData.splice(entryIndex, 1);

    // update the mealPlandData after deleting the entry

    SetMealPlanData(updatedMealPlanData);
  };

  return (
      <View style={styles.container}>
            <Text style={styles.header}>Plan Meal</Text>

            {/* Input for adding a new date and recipe */}
            <View style={styles.inputContainer}>
              
              {/* Text is nest in TouchableOpacity 
               onpress is passed with addMeal function */}
              <TouchableOpacity onPress={addMeal} style={styles.addMealButton}>
                <Text style={styles.addMealButtonText}>Add Meal</Text>
              </TouchableOpacity>

            </View>

        {/* Scrollable container for meal schedule */}
            <ScrollView style={styles.scrollContainer}>

              {/* Render the meal schedule here */}
              {mealPlanData.map((entry, entryIndex) => (
                <View key={entryIndex} style={styles.entry}>

                    <Text style={styles.date}>Date: {entry.date}</Text>
                    <Text style={styles.recipeTitle}>Recipe: {entry.recipe}</Text>

                    {/*Text is nested in TouchableOpacity. passed with the removeEntry function   */}
                    <TouchableOpacity onPress={() => removeEntry(entryIndex)}>
                      <Text style={styles.deleteButton}>Delete Entry</Text>
                    </TouchableOpacity>

                </View>
              ))}

            </ScrollView>
      </View>
  );
};

// styling: the container is flex growing and account for 1 part of the parent container

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollContainer: {
    maxHeight: 400,
  },
  entry: {
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 10,
  },
  addMealButton: {
    backgroundColor: '#0070c9',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  addMealButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    color: 'red',
    marginTop: 5,
  },
});

export default MealPlan;
