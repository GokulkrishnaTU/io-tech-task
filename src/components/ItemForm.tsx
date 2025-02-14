// Import React and useState hook for managing component state
import React, { useState } from 'react';

// Define the props expected by the ItemForm component
interface ItemFormProps {
  onAdd: (item: { title: string; body: string }) => void; // Function to handle adding a new item
}

// ItemForm component for adding a new item
const ItemForm: React.FC<ItemFormProps> = ({ onAdd }) => {
  // State to manage the title and body inputs
  const [title, setTitle] = useState(''); // Title of the new item
  const [body, setBody] = useState('');   // Body content of the new item

  /**
   * Handle the form submission to add a new item
   * @param {React.FormEvent} e - The form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Check if both title and body are not empty
    if (title && body) {
      // Call the onAdd function passed as a prop with the new item data
      onAdd({ title, body });
      setTitle(''); // Clear the title input field after submission
      setBody('');  // Clear the body input field after submission
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} // Trigger handleSubmit on form submission
      className="mb-4  bg-black shadow rounded-lg" // Tailwind CSS classes for styling
    >
      <input
        type="text" // Input type for the title
        value={title} // Bind input value to title state
        onChange={(e) => setTitle(e.target.value)} // Update state on input change
        placeholder="Title" // Placeholder text for the title input field
        className="w-full mb-2 p-2 border rounded" // Tailwind CSS classes for styling
        required // Make the field required
      />
      <textarea
        value={body} // Bind textarea value to body state
        onChange={(e) => setBody(e.target.value)} // Update state on input change
        placeholder="Description" // Placeholder text for the body textarea field
        className="w-full mb-2 p-2 border rounded" // Tailwind CSS classes for styling
        required // Make the field required
      />
      <button 
        type="submit" // Set button type to submit the form
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
      >
        Add Item
      </button>
    </form>
  );
};

export default ItemForm;
