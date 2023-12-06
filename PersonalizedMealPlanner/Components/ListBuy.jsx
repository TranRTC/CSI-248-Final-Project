import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';




const ListBuy = () => {

  
  // state variable and update function to handle shoping list (array)
  const [shoppingList, setShoppingList] = useState([]);

  // state variable and udpate function to handle ingredience (string)
  const [ingredient, setIngredient] = useState('');

  // state variable and update function for the quantity (string)
  const [quantity, setQuantity] = useState('');

  // state variable and update funciton for the unit (string)
  const [unit, setUnit] = useState('');

  // function to handle add new item to the shoping list

  const addItemToShoppingList = () => {

    // if the 3 input at the sametime available
    if (ingredient && quantity && unit) {

      // create new shoping item
      const newItem = { ingredient, quantity, unit };
      // add new item to shopinglist 
      setShoppingList([...shoppingList, newItem]);

      // clear input for ingredient
      setIngredient('');

      // clear input for quantity
      setQuantity('');

      // clear input ofr unit
      setUnit('');
      console.log(shoppingList); // Add this line for debugging
    }
  };

  // function remove shoping list

  const removeItemFromShoppingList = (index) => {

    // create a compy of shipinglist
    const updatedList = [...shoppingList];

    // use splice method to remove the shoping list item
    updatedList.splice(index, 1);

    // update the shoping list after deleting
    setShoppingList(updatedList);
  };

  return (
    <View style={styles.container}>

        <Text style={styles.title}>Shopping List</Text>
        {/*text input for Ingredient */}
        <TextInput
          style={styles.input}
          placeholder="Ingredient"
          value={ingredient}
          onChangeText={(text) => setIngredient(text)}
        />
      
      {/*text input for quantity */}
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
      />

      {/*text input for unit */}
      <TextInput
        style={styles.input}
        placeholder="Unit"
        value={unit}
        onChangeText={(text) => setUnit(text)}
      />
        {/*onPress of the Touchable is passed with addItemToShoppingList  */}
        <TouchableOpacity onPress={addItemToShoppingList} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Add Item</Text>
        </TouchableOpacity>

      {/*This is view for the item added into shopping list*/}
      <ScrollView style={styles.shoppingList}>
        {shoppingList.map((item, index) => (
            <View key={index} style={styles.shoppingListItem}>

                {/*Ingredient name */}
                <Text style={styles.shoppingListItemText}>{item.ingredient}</Text>

                {/*Ingredient quantity and unit */}
                <Text style={styles.shoppingListItemText}>{`${item.quantity} ${item.unit}`}</Text>

                {/*Touchable to handle removing item. onPress is passed with removeItemFromShopingList function*/}
                <TouchableOpacity onPress={() => removeItemFromShoppingList(index)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        ))}
      </ScrollView>

          {/*Touchable handle clearing the shopping list by passing the function to setShoppingList array to empty array */}
        <TouchableOpacity onPress={() => setShoppingList([])} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear Shopping List</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    height: 50,
    fontSize: 18,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#0070c9',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonLabel: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  shoppingList: {
    flex: 1,
    marginTop: 16,
  },
  shoppingListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 12,
  },
  shoppingListItemText: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: 'transparent',
    borderColor: '#dd3d31',
    borderWidth: 1,
    padding: 6,
    borderRadius: 3,
  },
  removeButtonText: {
    fontSize: 16,
    color: '#dd3d31',
  },
  clearButton: {
    backgroundColor: 'transparent',
    borderColor: '#0070c9',
    borderWidth: 1,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  clearButtonText: {
    fontSize: 17,
    color: '#0070c9',
    fontWeight: 'bold',
  },
});

export default ListBuy;
