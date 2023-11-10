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
            <Text style={styles.shoppingListItemText}>{item.ingredient}</Text>
            <Text style={styles.shoppingListItemText}>{`${item.quantity} ${item.unit}`}</Text>
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
    fontSize: 20,
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
    fontSize: 18,
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
    fontSize: 20,
    color: '#0070c9',
    fontWeight: 'bold',
  },
});

export default ListBuy;
