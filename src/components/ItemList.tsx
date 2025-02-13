// Import necessary React hooks and components
import React, { useEffect, useState } from 'react';

// Import API functions for CRUD operations
import { getItems, addItem, deleteItem, updateItem } from '../api/api.ts';

// Import child components for displaying and adding items
import ItemCard from './ItemCard.tsx';
import ItemForm from './ItemForm.tsx';

// Define the structure of an Item object
interface Item {
  id?: number;
  title: string;
  body: string;
}

// Main component for displaying and managing the list of items
const ItemList: React.FC = () => {
  // State to store the list of items
  const [items, setItems] = useState<Item[]>([]);

  // State to manage loading status
  const [loading, setLoading] = useState<boolean>(true);

  // State to manage error messages
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch items from the API and update state
   */
  const fetchItems = async () => {
    setLoading(true); // Set loading state to true while fetching data
    try {
      const fetchedItems = await getItems(); // Fetch items from the API
      setItems(fetchedItems); // Update state with fetched items
    } catch (error) {
      // Set an error message in case of failure
      setError('Error fetching items. Please try again later.');
    } finally {
      setLoading(false); // Stop loading after fetch is complete
    }
  };

  /**
   * Handle adding a new item to the list
   * @param item - The item object containing title and body
   */
  const handleAddItem = async (item: { title: string; body: string }) => {
    try {
      const newItem = await addItem(item); // Add item using the API
      setItems([newItem, ...items]); // Add the new item at the top of the list
    } catch (error) {
      setError('Error adding item. Please try again later.');
    }
  };

  /**
   * Handle deleting an item from the list
   * @param id - The ID of the item to be deleted
   */
  const handleDeleteItem = async (id: number) => {
    try {
      await deleteItem(id); // Delete the item using the API
      // Remove the item from the list in the state
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      setError('Error deleting item. Please try again later.');
    }
  };

  /**
   * Handle updating an existing item in the list
   * @param id - The ID of the item to be updated
   * @param updatedItem - The updated item object containing title and body
   */
  const handleUpdateItem = async (
    id: number | undefined,
    updatedItem: { title: string; body: string }
  ) => {
    try {
      const updated = await updateItem(id, updatedItem); // Update the item using the API
      // Update the state with the modified item
      setItems(prevItems =>
        prevItems.map(item => (item.id === id ? { ...item, ...updated } : item))
      );
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Error updating item. Please try again later.');
    }
  };

  // Fetch items when the component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container mx-auto">
      {error && <p className="text-red-500 text-center">{error}</p>} 
      
      {/* Form component to add new items */}
      <ItemForm onAdd={handleAddItem} />

      {loading ? (
        // Display a loading message while fetching items
        <p className="text-center">Loading...</p>
      ) : (
        // Display the list of items in a grid layout
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <ItemCard 
              key={item.id} // Unique key for each item
              item={item} // Pass the item data to the ItemCard component
              onDelete={handleDeleteItem} // Pass the delete handler to ItemCard
              onUpdate={handleUpdateItem} // Pass the update handler to ItemCard
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
