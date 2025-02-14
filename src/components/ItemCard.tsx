// Import React and useState hook for managing component state
import React, { useState } from 'react';

// Define the structure of an item
interface Item {
  id?: number; // ID is optional since it's not required for new items
  title: string; // Title of the item
  body: string;  // Body content of the item
}

// Define the props expected by the ItemCard component
interface ItemCardProps {
  item: Item; // The item to be displayed
  onDelete: (id: number | undefined) => void; // Function to handle item deletion
  onUpdate: (id: number | undefined, updatedItem: { title: string; body: string }) => void; // Function to handle item update
}

// ItemCard component for displaying and editing an item
const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete, onUpdate }) => {
  // State to track whether the item is in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // State to manage the updated title and body while editing
  const [updatedTitle, setUpdatedTitle] = useState(item.title);
  const [updatedBody, setUpdatedBody] = useState(item.body);

  /**
   * Handle the click event to enable edit mode
   */
  const handleEditClick = () => {
    setIsEditing(true);
  };

  /**
   * Handle the form submission for updating the item
   * @param {React.FormEvent} e - The form submission event
   */
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Check if the title and body are not empty
    if (updatedTitle && updatedBody) {
      // Call the onUpdate function passed as a prop
      await onUpdate(item.id, { title: updatedTitle, body: updatedBody });
      setIsEditing(false); // Exit edit mode after updating
    }
  };

  /**
   * Handle the click event to delete the item
   */
  const handleDeleteClick = () => {
    // Confirm the deletion action with the user
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      onDelete(item.id); // Call the onDelete function passed as a prop
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      {isEditing ? (
        // Render the form when in edit mode
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={updatedTitle} // Bind input value to updatedTitle state
            onChange={(e) => setUpdatedTitle(e.target.value)} // Update state on input change
            className="w-full mb-2 p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            placeholder="Title" // Placeholder text for the input field
          />
          <textarea
            value={updatedBody} // Bind textarea value to updatedBody state
            onChange={(e) => setUpdatedBody(e.target.value)} // Update state on input change
            className="w-full mb-2 p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            placeholder="Body" // Placeholder text for the textarea field
          />
          <button
            type="submit" // Set button type to submit the form
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Update
          </button>
        </form>
      ) : (
        // Render the item details when not in edit mode
        <>
          <h2 className="text-xl font-bold mb-2 text-white font-sans capitalize">{item.title}</h2>
          <p className="text-gray-300 font-serif capitalize">{item.body}</p>
          <div className="mt-4">
            <button
              onClick={handleEditClick} // Enable edit mode on click
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition duration-200"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick} // Trigger delete action on click
              className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemCard;
