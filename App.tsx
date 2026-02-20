
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
  const [navVersion, setNavVersion] = useState<'v1' | 'v2' | 'v3'>('v3');
  const [bookmarksData, setBookmarksData] = useState<BookmarksData | null>(null);
  const [activeCategory, setActiveCategory] = useState<any>(null);

  const toggleVersion = () => {
    setNavVersion(prev => {
      if (prev === 'v1') return 'v2';
      if (prev === 'v2') return 'v3';
      return 'v1';
    });
  };

  const handleBookmarksDataChange = (data: BookmarksData) => {
    setBookmarksData(data);
  };

  const handleCategoryChange = (category: any) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        onSelectionChange={setPageTitle} 
        version={navVersion}
        onBookmarksDataChange={handleBookmarksDataChange}
        onCategoryChange={handleCategoryChange}
      />
      <div className="flex flex-grow">
        <Sidebar 
          version={navVersion}
          bookmarks={bookmarksData?.bookmarks}
          onSelect={bookmarksData?.handleSelect}
          onToggleBookmark={bookmarksData?.toggleBookmark}
          activeCategory={activeCategory}
        />
        <main className="flex-grow flex flex-col items-center justify-center px-8 py-3 text-gray-900 bg-white">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={toggleVersion}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium shadow-md"
              aria-label={`Switch Version`}
            >
              Switch Version (Current: {navVersion.toUpperCase()})
            </button>
            <div className="text-sm text-gray-500 font-medium">
              Navigation Version: <span className="text-gray-800 font-semibold">{navVersion.toUpperCase()}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-300 text-center">{pageTitle}</h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;