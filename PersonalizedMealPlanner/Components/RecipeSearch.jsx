import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Text, StyleSheet } from 'react-native';


// two prop are onRecipeSelect to lift up data
// and recipeData to pass down data
const RecipeSearch = ({ onRecipeSelect, recipesData }) => {

  // state variable and update function to store and update the search query when user keyin
  const [searchQuery, setSearchQuery] = useState('');

  // state variable nad update function to handle the array of recipes which were found matched based on the searhing query
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // state variable and update function to handle the selected recipe ID for showing details and lift up selected recipe
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

// function to find tile of recipe which is mactched with the query and update to state variale
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = recipesData.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

// function to handle selected recipe
// it takes in two parameter id and recipe passed from the the event: touching on the title of recicpe

  const handleSelectRecipe = (id, recipe) => {
    if (id === selectedRecipeId) {
      return; // Do nothing if the selected recipe is already the same
    }

    //update selected recipe id
    setSelectedRecipeId(id);

    const selectedRecipeTitle = recipe.title;

    // use to uplift selectedRecipeTitle to the main app and used for the planning the meal
    onRecipeSelect(selectedRecipeTitle);
  };

 

  return (
    <View style={styles.container}>
      {/* Search input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for recipes..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {/*Conditional rendering if have searching querry a scroll view will be rendered to hold the filtered recipes' title  */}
      {searchQuery ? (

        <ScrollView>

            {filteredRecipes.map((item) => (
              <View key={item.id}>

                    {/* each recipe title found is nested in Touchableopacity, whenever there is a touch on the title the handleSelected recipe is called */}
                    <TouchableOpacity onPress={() => handleSelectRecipe(item.id, item)}>
                      <Text style={styles.recipeItem}>{item.title}</Text>
                    </TouchableOpacity>

                    {/* Conditional rendering. below only being re-rendered if new recipe is selected */}
                    {selectedRecipeId === item.id && (

                        
                        <View style={styles.recipeDetails}> {/* this is view for the detail of the selected recipe */}

                          <Text style={styles.recipeDetailsTitle}>Ingredients:</Text>

                              {/*Display ingredient of selected recipe  */}
                              {item.ingredients.map((ingredient, index) => (
                                <Text key={index} style={styles.ingredientItem}>
                                  {ingredient}
                                </Text>
                              ))}

                          <Text style={styles.recipeDetailsTitle}>Instructions:</Text>
                          
                          {/*Display instruction of selected recipe */}
                          <Text style={styles.instructionsText}>{item.instructions}</Text>
                        </View>

                    )}
              </View>
            ))}

        </ScrollView>

      ) : null}

    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 0.5,   
    backgroundColor: '#fff', // Background color for the whole container
    paddingTop: 3, // To ensure the container doesn't start right at the top of the screen
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    //marginLeft: 20,
    width:'85%',
    //height: 50,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderColor: '#007AFF', // Set the color of the border
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 16,
    color: 'black', // Set the color of the text entered by the user
    
  },
  recipeItem: {
    padding: 10, // Padding inside each recipe item for spacing
    borderBottomWidth: 1, // Add a bottom border to each item
    borderBottomColor: '#ccc', // Color of the bottom border
    marginHorizontal: 20, // Horizontal margin for each item
  },
  recipeDetails: {
    padding: 10,
    backgroundColor: '#f0f0f0', // Light grey background for the details
  },
  recipeDetailsTitle: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  ingredientItem: {
    marginLeft: 10,
    marginTop: 10, // Indent ingredients for better readability
  },
  instructionsText: {
    marginTop: 35,
    marginLeft: 10,
    marginRight: 10,
  },
  // You can add more styles for other UI elements if needed
});

export default RecipeSearch;
