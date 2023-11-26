import { Platform, StatusBar } from 'react-native';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';

import RecipeSearch from './Components/RecipeSearch';
import DateSelect from './Components/DateSelect';
import MealPlan from './Components/MealPlan';
import ListBuy from './Components/ListBuy';
import PictureTake from './Components/PictureTake';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe); // Update the selectedRecipe state with the entire recipe object
    console.log('Selected recipe:', recipe.title); // Access the recipe title
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Personalized Meal Planner</Text>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <DateSelect onDateSelect={handleDateSelect} />
        <RecipeSearch onRecipeSelect={handleRecipeSelect} />        
        <MealPlan selectedDate={selectedDate} selectedRecipe={selectedRecipe} />
        <ListBuy />
        <PictureTake/>
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
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});
