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

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null);  
  const [sortOrder, setSortOrder] = useState<string>('title');  // Default sort by title
  const [searchTerm, setSearchTerm] = useState<string>('');  // For filtering items based on search input

  // Fetch all items from the API
  const fetchItems = async () => {
    setLoading(true);
    try {
      const fetchedItems = await getItems();  
      setItems(fetchedItems);  
    } catch (error) {
      setError('Error fetching items. Please try again later.');
    } finally {
      setLoading(false);  
    }
  };

  // Sort items based on selected criteria (title or body)
  const sortItems = (items: Item[]) => {
    return [...items].sort((a, b) => {
      if (a[sortOrder] < b[sortOrder]) return -1;
      if (a[sortOrder] > b[sortOrder]) return 1;
      return 0;
    });
  };

  // Filter items based on the search term
  const filterItems = (items: Item[]) => {
    return items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleAddItem = async (item: { title: string; body: string }) => {
    try {
      const newItem = await addItem(item);
      setItems([newItem, ...items]);
    } catch (error) {
      setError('Error adding item. Please try again later.');
    }
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteItem(id);  
      setItems(items.filter(item => item.id !== id));  
    } catch (error) {
      setError('Error deleting item. Please try again later.');
    }
  };

  const handleUpdateItem = async (id: number | undefined, updatedItem: { title: string; body: string }) => {
    try {
      const updated = await updateItem(id, updatedItem);
      setItems(items.map(item => (item.id === id ? updated : item)));
    } catch (error) {
      setError('Error updating item. Please try again later.');
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Apply sorting and filtering
  const sortedAndFilteredItems = filterItems(sortItems(items));

  return (
    <div className="container mx-auto">
      {error && <p className="text-red-500 text-center">{error}</p>}  


      <div className="flex flex-col md:flex-row justify-between">

      
      {/* Filter Input */}
      <div className="mb-4">
        <input 
          type="text" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Search items" 
          className="w-full p-2 mb-2 border rounded" 
        />
      </div>

      {/* Sorting Dropdown */}
      <div className="mb-4 ">
        <select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value)} 
          className="w-full p-2 border rounded"
          >
          <option value="title">Sort by Title</option>
          <option value="body">Sort by Body</option>
        </select>
      </div>
          </div>

      <ItemForm onAdd={handleAddItem} />

      {loading ? (
        <p className="text-center">Loading...</p> 
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedAndFilteredItems.map(item => (
            <ItemCard 
              key={item.id} 
              item={item} 
              onDelete={handleDeleteItem} 
              onUpdate={handleUpdateItem}
            />  
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
