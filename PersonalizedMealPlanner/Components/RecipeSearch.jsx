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
  

const RecipeSearch = ({ onRecipeSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = recipesData.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  const handleSelectRecipe = (id, recipe) => {
    if (id === selectedRecipeId) {
      return; // Do nothing if the selected recipe is already the same
    }

    setSelectedRecipeId(id);

    const selectedRecipeTitle = recipe.title;
    onRecipeSelect(selectedRecipeTitle);
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity onPress={() => handleSelectRecipe(item.id, item)}>
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
      {searchQuery ? (
  <FlatList
    data={filteredRecipes}
    renderItem={renderItem}
    keyExtractor={item => item.id.toString()}
    extraData={selectedRecipeId}
  />
) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,   
    backgroundColor: '#fff', // Background color for the whole container
    paddingTop: 20, // To ensure the container doesn't start right at the top of the screen
    marginLeft: 10,
  },
  searchInput: {
    flex: 3,
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
