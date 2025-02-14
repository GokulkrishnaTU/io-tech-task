import React from 'react';
import ItemList from './components/ItemList.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black p-5 px-5 md:px-40">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-5 text-white uppercase">Item List</h1>
      <ItemList />
    </div>
  );
}; 

export default App;
