import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const PlanData = [
  {
    date: 'November 15, 2023',
    recipe: 'Oatmeal',
  },
  {
    date: 'November 15, 2023',
    recipe: 'Chicken Salad',
  },
  {
    date: 'November 15, 2023',
    recipe: 'Grilled Salmon',
  },
  {
    date: 'November 16, 2023',
    recipe: 'Scrambled Eggs',
  },
  {
    date: 'November 16, 2023',
    recipe: 'Caesar Salad',
  },
  {
    date: 'November 16, 2023',
    recipe: 'Spaghetti Bolognese',
  },
  {
    date: 'November 17, 2023',
    recipe: 'Yogurt Parfait',
  },
  {
    date: 'November 17, 2023',
    recipe: 'Turkey Sandwich',
  },
  {
    date: 'November 17, 2023',
    recipe: 'Vegetable Stir-Fry',
  },
];

const MealPlan = ({ selectedDate, selectedRecipe }) => {
  const [mealPlanData, setMealPlanData] = useState([]);

  const addMeal = () => {
    if (selectedDate && selectedRecipe) {
      const newMealPlan = { date: selectedDate, recipe: selectedRecipe };
      setMealPlanData([newMealPlan, ...mealPlanData]);
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
      <Text style={styles.header}>Meal Planner</Text>

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
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  scrollContainer: {
    maxHeight: height * 0.5,
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
    fontSize: 18,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: height * 0.05,
    fontSize: 18,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addMealButton: {
    backgroundColor: '#0070c9',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  addMealButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    color: 'red',
    marginTop: 5,
    fontSize: 16,
  },
});

export default MealPlan;
