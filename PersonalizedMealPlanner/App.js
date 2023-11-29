import { Platform, StatusBar } from 'react-native';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';

import RecipeSearch from './Components/RecipeSearch';
import DateSelect from './Components/DateSelect';
import MealPlan from './Components/MealPlan';
import ListBuy from './Components/ListBuy';
import PictureTake from './Components/PictureTake';
import MealNotify from './Components/MealNotify';

const plannedMeals = [
  {
    id: 0,
    date: '2023-11-28', // Changed to 'YYYY-MM-DD' format
    recipe: 'Oatmeal',
  },
  {
    id: 1,
    date: '2023-11-29',
    recipe: 'Chicken Salad',
  },
  {
    id: 2,
    date: '2023-11-30',
    recipe: 'Grilled Salmon',
  },
  {
    id: 3,
    date: '2023-11-16',
    recipe: 'Scrambled Eggs',
  },
  {
    id: 4,
    date: '2023-11-16',
    recipe: 'Caesar Salad',
  },
  {
    id: 5,
    date: '2023-11-16',
    recipe: 'Spaghetti Bolognese',
  },
  {
    id: 6,
    date: '2023-11-17',
    recipe: 'Yogurt Parfait',
  },
  {
    id: 7,
    date: '2023-11-17',
    recipe: 'Turkey Sandwich',
  },
  {
    id: 8,
    date: '2023-11-17',
    recipe: 'Vegetable Stir-Fry',
  },
];


export default function App() {
  const [selectedDate, setSelectedDate] = useState(null);


// Call back function to move selected date form child component DateTime picker to
// update into the state varialbe selectedDate in parent App component. Which is later use for planning the meal

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
        <MealPlan selectedDate={selectedDate} selectedRecipe={selectedRecipe} plannedMeals={plannedMeals}/>
        <ListBuy />
        <PictureTake/>
        <MealNotify mealPlans={plannedMeals}/>       
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
