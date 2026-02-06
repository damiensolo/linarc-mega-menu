
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

interface BookmarksData {
  bookmarks: Array<{
    categoryKey: string;
    itemKey: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    navIcon: React.ReactNode;
  }>;
  toggleBookmark: (categoryKey: string, itemKey: string) => void;
  handleSelect: (categoryKey: string, subcategoryKey: string) => void;
}

const App: React.FC = () => {
  const [pageTitle, setPageTitle] = useState('Documentation / Document');
  const [navVersion, setNavVersion] = useState<'v1' | 'v2'>('v2');
  const [bookmarksData, setBookmarksData] = useState<BookmarksData | null>(null);

  const toggleVersion = () => {
    setNavVersion(prev => prev === 'v1' ? 'v2' : 'v1');
  };

  const handleBookmarksDataChange = (data: BookmarksData) => {
    setBookmarksData(data);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        onSelectionChange={setPageTitle} 
        version={navVersion}
        onBookmarksDataChange={handleBookmarksDataChange}
      />
      <div className="flex flex-grow">
        <Sidebar 
          version={navVersion}
          bookmarks={bookmarksData?.bookmarks}
          onSelect={bookmarksData?.handleSelect}
          onToggleBookmark={bookmarksData?.toggleBookmark}
        />
        <main className="flex-grow flex flex-col items-center justify-center px-8 py-3 text-gray-900 bg-white relative">
          {/* Version Toggle Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleVersion}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium shadow-md"
              aria-label={`Switch to ${navVersion === 'v1' ? 'Version 2' : 'Version 1'}`}
            >
              {navVersion === 'v1' ? 'Switch to V2' : 'Switch to V1'}
            </button>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="text-sm text-gray-500 font-medium">
              Navigation Version: <span className="text-gray-800 font-semibold">{navVersion.toUpperCase()}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-300">{pageTitle}</h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;