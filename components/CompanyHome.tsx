import React, { useState } from 'react';
import CompanyHeader from './CompanyHeader';
import CompanySidebar from './CompanySidebar';
import ProjectsTable, { Project } from './ProjectsTable';

interface CompanyHomeProps {
    onOpenProject: (project: Project) => void;
}

const CompanyHome: React.FC<CompanyHomeProps> = ({ onOpenProject }) => {
    const [activeNavKey, setActiveNavKey] = useState('portfolio');
    const [activeSidebarKey, setActiveSidebarKey] = useState('projects');

    const handleSelectProject = (project: Project) => {
        onOpenProject(project);
    };

    const handleHomeClick = () => {
        setActiveNavKey('portfolio');
        setActiveSidebarKey('projects');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-['Lato']">
            <CompanyHeader
                activeNavKey={activeNavKey}
                onNavChange={setActiveNavKey}
                onHomeClick={handleHomeClick}
            />
            <div className="flex flex-grow min-h-0">
                <CompanySidebar
                    activeItemKey={activeSidebarKey}
                    onItemChange={setActiveSidebarKey}
                />
                <main className="flex-grow flex flex-col min-h-0 bg-gray-50/30">
                    {/* Conditionally render content based on sidebar selection */}
                    {activeSidebarKey === 'projects' ? (
                        <ProjectsTable onSelectProject={handleSelectProject} />
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
                            <div className="text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M12 16v-4"></path>
                                        <path d="M12 8h.01"></path>
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-gray-600 mb-1 capitalize">{activeSidebarKey}</h2>
                                <p className="text-sm text-gray-400">This section is coming soon.</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default CompanyHome;
