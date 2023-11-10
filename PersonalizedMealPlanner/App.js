import { Platform, StatusBar } from 'react-native';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useState } from 'react';

import RecipeSearch from './Components/RecipeSearch';
import DateSelect from './Components/DateSelect';
import MealPlan from './Components/MealPlan';

export default function App() {

  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  console.log(selectedDate);

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  console.log(selectedRecipe);

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Personalized Meal Planner</Text>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DateSelect onDateSelect={handleDateSelect} />
        <RecipeSearch onRecipeSelect={handleRecipeSelect} />
        <MealPlan  selectedDate={selectedDate} selectedRecipe={selectedRecipe}/>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 80,
  },
  scrollContainer: {
    flexGrow: 1, // Allow the content to grow and fill the available space
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Additional styles for your components here:
  // Example:
  // componentContainer: {
  //   marginBottom: 20,
  // },
  // componentText: {
  //   fontSize: 16,
  // },
});
