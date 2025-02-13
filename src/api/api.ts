// Import the Axios library for making HTTP requests
import axios from "axios";

// Define the base URL for the mock API
const API_URL = "https://jsonplaceholder.typicode.com/posts";

/**
 * Get the list of items from the mock API
 * @returns {Promise<Object[]>} A promise that resolves to an array of items
 */
export const getItems = async () => {
  try {
    // Send a GET request to fetch all items
    const response = await axios.get(API_URL);
    return response.data; // Return the list of items
  } catch (error) {
    console.error("Error fetching items:", error); // Log the error for debugging
    throw error; // Rethrow the error to be handled by the caller
  }
};

/**
 * Add a new item to the list using the mock API
 * @param {Object} item - The item to be added
 * @param {string} item.title - The title of the item
 * @param {string} item.body - The body content of the item
 * @returns {Promise<Object>} A promise that resolves to the added item
 */
export const addItem = async (item: { title: string; body: string }) => {
  try {
    // Send a POST request to add the item
    const response = await axios.post(API_URL, item);
    return response.data; // Return the added item data
  } catch (error) {
    console.error("Error adding item:", error); // Log the error for debugging
    throw error; // Rethrow the error to be handled by the caller
  }
};

/**
 * Delete an item from the list using the mock API
 * @param {number | undefined} id - The ID of the item to be deleted
 */
export const deleteItem = async (id: number | undefined) => {
  try {
    // Send a DELETE request to remove the item by its ID
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting item:", error); // Log the error for debugging
    throw error; // Rethrow the error to be handled by the caller
  }
};

/**
 * Update an existing item in the list using the mock API
 * @param {number | undefined} id - The ID of the item to be updated
 * @param {Object} updatedItem - The updated item data
 * @param {string} updatedItem.title - The updated title of the item
 * @param {string} updatedItem.body - The updated body content of the item
 * @returns {Promise<Object>} A promise that resolves to the updated item
 */
export const updateItem = async (
  id: number | undefined,
  updatedItem: { title: string; body: string }
) => {
  try {
    // Send a PUT request to update the item by its ID
    const response = await axios.put(`${API_URL}/${id}`, updatedItem);
    return response.data; // Return the updated item data
  } catch (error) {
    console.error("Error updating item:", error); // Log the error for debugging
    throw error; // Rethrow the error to be handled by the caller
  }
};
