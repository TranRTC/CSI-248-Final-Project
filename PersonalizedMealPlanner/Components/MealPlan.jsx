import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const PlanData = [
  {
    date: 'November 15, 2023',
    meals: [
      { mealType: 'Breakfast', recipeTitle: 'Oatmeal' },
      { mealType: 'Lunch', recipeTitle: 'Chicken Salad' },
      { mealType: 'Dinner', recipeTitle: 'Grilled Salmon' },
    ],
  },
  {
    date: 'November 16, 2023',
    meals: [
      { mealType: 'Breakfast', recipeTitle: 'Scrambled Eggs' },
      { mealType: 'Lunch', recipeTitle: 'Caesar Salad' },
      { mealType: 'Dinner', recipeTitle: 'Spaghetti Bolognese' },
    ],
  },
  {
    date: 'November 17, 2023',
    meals: [
      { mealType: 'Breakfast', recipeTitle: 'Yogurt Parfait' },
      { mealType: 'Lunch', recipeTitle: 'Turkey Sandwich' },
      { mealType: 'Dinner', recipeTitle: 'Vegetable Stir-Fry' },
    ],
  },
];

const MealPlan = () => {
  const [mealPlanData, setMealPlanData] = useState(PlanData);

  const addMeal = (dateIndex, newMeal) => {
    const updatedMealPlanData = [...mealPlanData];
    updatedMealPlanData[dateIndex].meals.push(newMeal);
    setMealPlanData(updatedMealPlanData);
  };

  const removeEntry = (dateIndex) => {
    const updatedMealPlanData = [...mealPlanData];
    updatedMealPlanData.splice(dateIndex, 1);
    setMealPlanData(updatedMealPlanData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meal Planner</Text>

      {/* Scrollable container for meal schedule */}
      <ScrollView style={styles.scrollContainer}>
        {/* Render the meal schedule here */}
        {mealPlanData.map((entry, dateIndex) => (
          <View key={dateIndex} style={styles.entry}>
            <Text style={styles.date}>Date: {entry.date}</Text>
            {entry.meals.map((meal, mealIndex) => (
              <View key={mealIndex} style={styles.meal}>
                <Text style={styles.mealType}>{meal.mealType}:</Text>
                <Text style={styles.recipeTitle}> {meal.recipeTitle}</Text>
              </View>
            ))}
            <TouchableOpacity onPress={() => removeEntry(dateIndex)}>
              <Text style={styles.deleteButton}>Delete Entry</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Input for adding a new date */}
      <TextInput
        placeholder="Add new date"
        style={styles.addDateInput}
        onChangeText={(text) => {
          addMeal(mealPlanData.length, { date: text, meals: [] });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: -50, // Adjust the marginTop value as needed
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
  meal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  mealType: {
    fontWeight: 'bold',
  },
  recipeTitle: {
    marginLeft: 4,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 8,
  },
  addDateInput: {
    marginTop: 8,
    paddingLeft: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default MealPlan;
