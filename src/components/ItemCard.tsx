import React, { useState } from 'react';

interface Item {
  id?: number;
  title: string;
  body: string;
}

interface ItemCardProps {
  item: Item;
  onDelete: (id: number | undefined) => void;
  onUpdate: (id: number | undefined, updatedItem: { title: string; body: string }) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(item.title);
  const [updatedBody, setUpdatedBody] = useState(item.body);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updatedTitle && updatedBody) {
      await onUpdate(item.id, { title: updatedTitle, body: updatedBody });
      setIsEditing(false);
    }
  };

  const handleDeleteClick = () => {
    const confirmed = window.confirm('Are you sure you want to delete this item?');
    if (confirmed) {
      onDelete(item.id);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="w-full mb-2 p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            placeholder="Title"
          />
          <textarea
            value={updatedBody}
            onChange={(e) => setUpdatedBody(e.target.value)}
            className="w-full mb-2 p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            placeholder="Body"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
          >
            Update
          </button>
        </form>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2 text-white">{item.title}</h2>
          <p className="text-gray-300">{item.body}</p>
          <div className="mt-4">
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition duration-200"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
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