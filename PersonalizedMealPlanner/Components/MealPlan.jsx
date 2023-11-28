import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';



const MealPlan = ({selectedDate, selectedRecipe, plannedMeals }) => {
  const [mealPlanData, setMealPlanData] = useState(plannedMeals);
  

  const addMeal = () => {
    if (selectedDate && selectedRecipe) {

      let nextId = 10; // Start with 10 and increment for each new meal plan
      function createMealPlan(date, recipe) {
        return {
          id: nextId++, // Assign and increment the ID
          recipe: recipe,
          date: date
        };
      }

      const newMealPlan = createMealPlan({ date: selectedDate}, {recipe: selectedRecipe });
      setMealPlanData([newMealPlan,...mealPlanData]);
      
      //setSelectedDate('');
      //setSelectedRecipe('');
      console.log('New meal added:', newMealPlan);
    }
  };
  

  const removeEntry = (dateIndex) => {
    const updatedMealPlanData = [...mealPlanData];
    updatedMealPlanData.splice(dateIndex, 1);
    setMealPlanData(updatedMealPlanData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Plan Meal</Text>

      {/* Input for adding a new date and recipe */}
      <View style={styles.inputContainer}>
        
        <TouchableOpacity onPress={addMeal} style={styles.addMealButton}>
          <Text style={styles.addMealButtonText}>Add Meal</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable container for meal schedule */}
      <ScrollView style={styles.scrollContainer}>
        {/* Render the meal schedule here */}
        {mealPlanData.map((entry, dateIndex) => (
          <View key={dateIndex} style={styles.entry}>
            <Text style={styles.date}>Date: {entry.date}</Text>
            <Text style={styles.recipeTitle}>Recipe: {entry.recipe}</Text>
            <TouchableOpacity onPress={() => removeEntry(dateIndex)}>
              <Text style={styles.deleteButton}>Delete Entry</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

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
    fontSize: 18,
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
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    color: 'red',
    marginTop: 5,
  },
});

export default MealPlan;
