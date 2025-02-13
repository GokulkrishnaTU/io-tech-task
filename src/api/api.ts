import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Get the list of items from the mock API
export const getItems = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;  // Return the list of items
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// add items to the list of items from the mock API


export const addItem = async (item: { title: string; body: string }) => {
    try {
      const response = await axios.post(API_URL, item);
      return response.data;
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    }
  };
