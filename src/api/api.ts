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
