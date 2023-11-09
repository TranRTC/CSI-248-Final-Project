import { Platform, StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import RecipeSearch from './Components/RecipeSearch';





export default function App() {





//=======UserAuthentication================

//========RecipeSearch======================


//=========MealPlanner======================

//=========ShoppingList=====================



  return (
    <View style={styles.container}>
    <Text style={styles.appTitle}>Personalized Meal Planner</Text>
    <StatusBar style="auto" />
    <RecipeSearch/>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Add padding to accommodate the status bar height on Android
  },
  appTitle: {
    fontSize: 20, // You can adjust the size as needed
    fontWeight: 'bold', // This makes the text bold
    marginTop: 80, // This adds space to the top of the text
    // ...any other styling you want for the app title
  },
  // ...other styles
});
