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

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            value={updatedBody}
            onChange={(e) => setUpdatedBody(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Update
          </button>
        </form>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">{item.title}</h2>
          <p className="text-gray-700">{item.body}</p>
          <button
            onClick={handleEditClick}
            className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default ItemCard;
