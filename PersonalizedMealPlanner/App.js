import { Platform, StatusBar } from 'react-native';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';

import RecipeSearch from './Components/RecipeSearch';
import DateSelect from './Components/DateSelect';
import MealPlan from './Components/MealPlan';
import ListBuy from './Components/ListBuy';
import PictureTake from './Components/PictureTake';
import MealNotify from './Components/MealNotify';
import UserLogin from './Components/UserLogin';

//=====================Recipe Data for testing========================================
const recipesData = [
  {
    id: 1,
    title: 'Classic Caesar Salad',
    imageUrl: 'https://via.placeholder.com/150',
    mealType: 'lunch',
    ingredients: [
      '3/4 cup mayonnaise',
      '3 anchovy fillets, minced',
      '3 tablespoons grated Parmesan cheese',
      '2 tablespoons fresh lemon juice',
      '1 tablespoon Dijon mustard',
      '1 tablespoon Worcestershire sauce',
      '1 clove garlic, minced',
      'Salt and ground black pepper to taste',
      '1 head romaine lettuce, torn into bite-size pieces',
      'Croutons',
    ],
    instructions: 'In a bowl, whisk together the mayonnaise, anchovy, cheese, lemon juice, mustard, Worcestershire sauce, and garlic. Season with salt and pepper. In a large bowl, toss the lettuce with the dressing and croutons until evenly coated. Serve topped with more grated Parmesan cheese.',
  },
  {
    id: 2,
    title: 'Spaghetti Carbonara',
    imageUrl: 'https://via.placeholder.com/150',
    mealType: 'dinner',
    ingredients: [
      '400g spaghetti',
      '150g pancetta, cubed',
      '2 large eggs',
      '1/2 cup grated Parmesan cheese',
      '4 cloves garlic, minced',
      'Black pepper',
      'Salt',
    ],
    instructions: 'Cook spaghetti according to package instructions. Meanwhile, in a pan, cook the pancetta until it is crispy. In a bowl, beat the eggs and Parmesan together. Once the spaghetti is done, quickly mix in the egg and cheese mixture, using the heat to cook the eggs without scrambling. Add the pancetta, garlic, and a generous amount of black pepper and salt to taste.',
  },
  {
    id: 3,
    title: 'Avocado Toast',
    imageUrl: 'https://via.placeholder.com/150',
    mealType: 'breakfast',
    ingredients: [
      '2 slices of bread, toasted',
      '1 ripe avocado',
      'Salt and pepper to taste',
      'Red pepper flakes, optional',
      '2 eggs, cooked to your preference, optional',
    ],
    instructions: 'Mash the avocado with a fork and spread it on the toasted bread. Season with salt, pepper, and red pepper flakes. Top with eggs if desired.',
  },
  {
    id: 4,
    title: 'Grilled Chicken Salad',
    imageUrl: 'https://via.placeholder.com/150',
    mealType: 'lunch',
    ingredients: [
      '2 boneless, skinless chicken breasts',
      '2 tablespoons olive oil',
      'Salt and pepper to taste',
      '1/2 cup cherry tomatoes, halved',
      '1/2 cucumber, sliced',
      '1/4 red onion, thinly sliced',
      '4 cups mixed greens',
      'Balsamic vinaigrette dressing',
    ],
    instructions: 'Season chicken breasts with olive oil, salt, and pepper, then grill until cooked through. Slice the grilled chicken into strips. In a large bowl, combine cherry tomatoes, cucumber, red onion, and mixed greens. Top with grilled chicken strips and drizzle with balsamic vinaigrette dressing.',
  },
  {
    id: 5,
    title: 'Chocolate Chip Cookies',
    imageUrl: 'https://via.placeholder.com/150',
    mealType: 'dessert',
    ingredients: [
      '1 cup butter, softened',
      '3/4 cup granulated sugar',
      '3/4 cup brown sugar, packed',
      '2 large eggs',
      '1 teaspoon vanilla extract',
      '2 1/4 cups all-purpose flour',
      '1 teaspoon baking soda',
      '1/2 teaspoon salt',
      '2 cups semisweet chocolate chips',
    ],
    instructions: 'Preheat oven to 375°F (190°C). In a large mixing bowl, cream together the softened butter, granulated sugar, and brown sugar until well blended. Beat in the eggs one at a time, then stir in the vanilla. In a separate bowl, combine the flour, baking soda, and salt. Gradually add the dry ingredients to the wet ingredients and mix well. Finally, fold in the chocolate chips. Drop by rounded tablespoons onto ungreased baking sheets. Bake for 8 to 10 minutes until golden brown. Cool on wire racks.',
  },
];
//===============================MealPlan Data for testing==========================================

const plannedMeals = [
  {
    id: 0,
    date: '2023-12-6', // 'YYYY-MM-DD' format
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

  //=====================for DateSelect===========================================

  // State variable and update function for selected date
  const [selectedDate, setSelectedDate] = useState(null);


// Call back function to uplift selected date from child component DateTime picker
// to update into the state varialbe selectedDate in parent App component. Which information is later used for planning the meal

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  //=========================for RecipeSearch======================================

  // state variable & update function for selected recipe
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // callback function to uplift selected recicpe from child RecipeSearch component to
  const handleRecipeSelect = (recipe) => {

    // Update the selectedRecipe state with the entire recipe object
    setSelectedRecipe(recipe); 
    console.log('Selected recipe:', recipe.title); // Access the recipe title
    
  };

  //============================for MealPlan=========================================
  const [mealPlanData, SetMealPlanData] = useState(plannedMeals);

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Personalized Meal Planner</Text>
      <StatusBar style="auto" />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/*pass prop as call back to DateSelect component */}
        <DateSelect onDateSelect={handleDateSelect} />
        {/* pass prop as callback and data to RecipeSearch component */}
        <RecipeSearch onRecipeSelect={handleRecipeSelect} recipesData={recipesData} /> 
        {/* pass prop as data hold by state variable & original mealplan data ( array of mealplans) */}       
        <MealPlan selectedDate={selectedDate} selectedRecipe={selectedRecipe} mealPlanData={mealPlanData} SetMealPlanData={SetMealPlanData}/>
        <ListBuy />
        <PictureTake/>
        <MealNotify mealPlans={mealPlanData}/> 
              
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
