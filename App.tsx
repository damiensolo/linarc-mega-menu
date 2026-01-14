
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [pageTitle, setPageTitle] = useState('Documentation / Document');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header onSelectionChange={setPageTitle} />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow flex items-center justify-center p-8 text-gray-900 bg-white">
            <h1 className="text-4xl font-bold text-gray-300">{pageTitle}</h1>
        </main>
      </div>
    </div>
  );
};

export default App;