import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const ListBuy = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');

  const addItemToShoppingList = () => {
    if (ingredient && quantity && unit) {
      const newItem = { ingredient, quantity, unit };
      setShoppingList([...shoppingList, newItem]);
      setIngredient('');
      setQuantity('');
      setUnit('');
      console.log(shoppingList); // Add this line for debugging
    }
  };

  const removeItemFromShoppingList = (index) => {
    const updatedList = [...shoppingList];
    updatedList.splice(index, 1);
    setShoppingList(updatedList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping List</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingredient"
        value={ingredient}
        onChangeText={(text) => setIngredient(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantity"
        value={quantity}
        onChangeText={(text) => setQuantity(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Unit"
        value={unit}
        onChangeText={(text) => setUnit(text)}
      />
      <TouchableOpacity onPress={addItemToShoppingList} style={styles.addButton}>
        <Text style={styles.addButtonLabel}>Add Item</Text>
      </TouchableOpacity>
      <ScrollView style={styles.shoppingList}>
        {shoppingList.map((item, index) => (
          <View key={index} style={styles.shoppingListItem}>
            <Text>{item.ingredient}</Text>
            <Text>{`${item.quantity} ${item.unit}`}</Text>
            <TouchableOpacity onPress={() => removeItemFromShoppingList(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => setShoppingList([])} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear Shopping List</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'white',
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
    borderBottomColor: 'gray',
    paddingVertical: 8,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 4,
    borderRadius: 3,
  },
  removeButtonText: {
    color: 'white',
  },
  clearButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  clearButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ListBuy;
