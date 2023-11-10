/* import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';


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
    // Add more recipes with mealType as needed for testing
  ];

const RecipeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipesData);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = recipesData.filter(recipe => 
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for recipes..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredRecipes}
        renderItem={({ item }) => <Text style={styles.recipeItem}>{item.title}</Text>}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff', // Background color for the whole container
      paddingTop: 50, // To ensure the container doesn't start right at the top of the screen
    },
    searchInput: {
      marginHorizontal: 20, // Add some horizontal margin
      paddingHorizontal: 10, // Padding from the left and right inside the input
      paddingVertical: 8, // Padding from the top and bottom inside the input
      borderColor: '#ccc', // Border color for the input
      borderWidth: 1, // Border width for the input
      borderRadius: 20, // Rounded corners for the input field
      fontSize: 16, // Text size
    },
    recipeItem: {
      padding: 20, // Padding inside each recipe item for spacing
      borderBottomWidth: 1, // Add a bottom border to each item
      borderBottomColor: '#ccc', // Color of the bottom border
      marginHorizontal: 20, // Horizontal margin for each item
    },
    // You can add more styles for other UI elements if needed
  });
  

export default RecipeSearch;
 */

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';



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
    // Add more recipes with mealType as needed for testing
  ];


const RecipeSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState('');
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = recipesData.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleSelectRecipe = (id) => {
    setSelectedRecipeId(id === selectedRecipeId ? null : id); // Toggle the selected state
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => handleSelectRecipe(item.id)}>
        <Text style={styles.recipeItem}>{item.title}</Text>
      </TouchableOpacity>
      {selectedRecipeId === item.id && (
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeDetailsTitle}>Ingredients:</Text>
          {item.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredientItem}>
              {ingredient}
            </Text>
          ))}
          <Text style={styles.recipeDetailsTitle}>Instructions:</Text>
          <Text style={styles.instructionsText}>{item.instructions}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for recipes..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredRecipes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        extraData={selectedRecipeId} // Add this line to ensure the list updates when state changes
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... existing styles
  container: {
    flex: 1,
    backgroundColor: '#fff', // Background color for the whole container
    paddingTop: 50, // To ensure the container doesn't start right at the top of the screen
  },
  searchInput: {
    marginHorizontal: 20, // Add some horizontal margin
    paddingHorizontal: 10, // Padding from the left and right inside the input
    paddingVertical: 8, // Padding from the top and bottom inside the input
    borderColor: '#ccc', // Border color for the input
    borderWidth: 1, // Border width for the input
    borderRadius: 20, // Rounded corners for the input field
    fontSize: 16, // Text size
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
