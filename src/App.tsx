import React from 'react';
import ItemList from './components/ItemList.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Item List</h1>
      <ItemList />
    </div>
  );
};

export default App;
