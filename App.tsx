
import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import CompanyHome from './components/CompanyHome';
import { Project } from './components/ProjectsTable';

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

type ViewMode = 'company' | 'project';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('company');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    // Downtown Tower opens in v1 to showcase nav variation
    setNavVersion(project.id === 'downtown-tower' ? 'v1' : 'v3');
    setViewMode('project');
  };

  const handleBackToCompany = () => {
    setViewMode('company');
    setSelectedProject(null);
  };

  // Company Home view
  if (viewMode === 'company') {
    return <CompanyHome onOpenProject={handleOpenProject} />;
  }

  // Project-level v3 view
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        onSelectionChange={setPageTitle}
        version={navVersion}
        onBookmarksDataChange={handleBookmarksDataChange}
        onCategoryChange={handleCategoryChange}
        onHomeClick={handleBackToCompany}
      />
      <div className="flex flex-grow">
        <Sidebar
          version={navVersion}
          bookmarks={bookmarksData?.bookmarks}
          onSelect={bookmarksData?.handleSelect}
          onToggleBookmark={bookmarksData?.toggleBookmark}
          activeCategory={activeCategory}
          onHomeClick={handleBackToCompany}
        />
        <main className="flex-grow flex flex-col items-center justify-center px-8 py-3 text-gray-900 bg-white">
          <div className="flex flex-col items-center gap-4">
            {/* Back to Company button */}
            <button
              onClick={handleBackToCompany}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 shadow-sm"
              aria-label="Back to Company Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5"></path>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Company Home
            </button>

            {selectedProject && (
              <div className="text-sm text-gray-500 font-medium">
                Project: <span className="text-orange-500 font-semibold">{selectedProject.name}</span>
              </div>
            )}

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