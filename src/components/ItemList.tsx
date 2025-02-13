import React, { useEffect, useState } from 'react';
import { getItems } from '../api/api.ts';
import ItemCard from './ItemCard.tsx';

interface Item {
  id?: number;
  title: string;
  body: string;
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);  
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null);  

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

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="container mx-auto">
      {error && <p className="text-red-500 text-center">{error}</p>}  
      {loading ? (
        <p className="text-center">Loading...</p> 
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
