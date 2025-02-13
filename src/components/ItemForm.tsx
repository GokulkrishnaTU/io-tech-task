import React, { useState } from 'react';

interface ItemFormProps {
  onAdd: (item: { title: string; body: string }) => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && body) {
      onAdd({ title, body });  
      setTitle('');  
      setBody('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-black shadow rounded-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Description"
        className="w-full mb-2 p-2 border rounded"
        required
      />
      <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Add Item
      </button>
    </form>
  );
};

export default ItemForm;
