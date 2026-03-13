import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    ChevronDown,
    ChevronUp,
    ArrowUpDown,
    Eye,
    MoreHorizontal,
    Filter,
    Download,
    Building2,
    MapPin,
    User,
    Calendar,
    ArrowRight,
} from 'lucide-react';

// --- Project Data ---
export interface Project {
    id: string;
    name: string;
    address: string;
    owner: string;
    gc: string;
    pm: string;
    phone: string;
    status: 'active' | 'on-hold' | 'completed' | 'planning';
    progress: number;
    startDate: string;
    lastActivity: string;
    budget: string;
}

export const projectsData: Project[] = [
    {
        id: 'big-mall',
        name: 'Big Mall',
        address: '4900 Moorpark Ave #326, San Jose, CA 95127',
        owner: 'Build Enterprises',
        gc: 'A to Z Construction',
        pm: 'Max Anderson',
        phone: '+1 56535-7878',
        status: 'active',
        progress: 68,
        startDate: '2025-03-15',
        lastActivity: '2 hours ago',
        budget: '$12.5M',
    },
    {
        id: 'downtown-tower',
        name: 'Downtown Tower',
        address: '123 Main St, San Francisco, CA 94105',
        owner: 'Skyline Corp',
        gc: 'Apex Builders',
        pm: 'Jane Doe',
        phone: '+1 415-555-1234',
        status: 'active',
        progress: 42,
        startDate: '2025-06-01',
        lastActivity: '30 min ago',
        budget: '$28.3M',
    },
    {
        id: 'suburban-complex',
        name: 'Suburban Complex',
        address: '789 Oak Rd, Palo Alto, CA 94301',
        owner: 'Greenfield Dev',
        gc: 'Summit Construction',
        pm: 'John Smith',
        phone: '+1 650-555-5678',
        status: 'on-hold',
        progress: 15,
        startDate: '2025-09-10',
        lastActivity: '3 days ago',
        budget: '$8.7M',
    },
    {
        id: 'harbor-bridge',
        name: 'Harbor Bridge Retrofit',
        address: '500 Embarcadero, Oakland, CA 94607',
        owner: 'Bay Area Transit Authority',
        gc: 'Pacific Infrastructure',
        pm: 'Sarah Chen',
        phone: '+1 510-555-9012',
        status: 'active',
        progress: 87,
        startDate: '2024-11-20',
        lastActivity: '1 hour ago',
        budget: '$45.1M',
    },
    {
        id: 'tech-campus',
        name: 'Innovation Tech Campus',
        address: '2000 Technology Way, Sunnyvale, CA 94086',
        owner: 'TechVenture Holdings',
        gc: 'Cornerstone Builders',
        pm: 'David Park',
        phone: '+1 408-555-3456',
        status: 'planning',
        progress: 5,
        startDate: '2026-01-15',
        lastActivity: '1 week ago',
        budget: '$52.0M',
    },
    {
        id: 'green-residences',
        name: 'Green Valley Residences',
        address: '1400 Green Valley Pkwy, Henderson, NV 89012',
        owner: 'Desert Bloom Properties',
        gc: 'Valley Contractors Inc',
        pm: 'Maria Gonzalez',
        phone: '+1 702-555-7890',
        status: 'completed',
        progress: 100,
        startDate: '2024-05-01',
        lastActivity: '2 weeks ago',
        budget: '$18.9M',
    },
    {
        id: 'medical-center',
        name: 'West Side Medical Center',
        address: '3200 Hospital Dr, Sacramento, CA 95816',
        owner: 'Central Valley Health',
        gc: 'MedBuild Group',
        pm: 'Robert Kim',
        phone: '+1 916-555-2345',
        status: 'active',
        progress: 55,
        startDate: '2025-02-01',
        lastActivity: '4 hours ago',
        budget: '$34.6M',
    },
    {
        id: 'waterfront-hotel',
        name: 'Waterfront Hotel & Spa',
        address: '800 Marina Blvd, Sausalito, CA 94965',
        owner: 'Pacific Hospitality Group',
        gc: 'Coastal Construction',
        pm: 'Lisa Tanaka',
        phone: '+1 415-555-6789',
        status: 'active',
        progress: 31,
        startDate: '2025-08-12',
        lastActivity: '6 hours ago',
        budget: '$22.4M',
    },
];

type SortKey = keyof Project;
type SortDir = 'asc' | 'desc';

// --- Status Badge ---
const StatusBadge: React.FC<{ status: Project['status'] }> = ({ status }) => {
    const config: Record<Project['status'], { bg: string; text: string; dot: string; label: string }> = {
        active: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', dot: 'bg-emerald-500', label: 'Active' },
        'on-hold': { bg: 'bg-amber-500/10', text: 'text-amber-600', dot: 'bg-amber-500', label: 'On Hold' },
        completed: { bg: 'bg-blue-500/10', text: 'text-blue-600', dot: 'bg-blue-500', label: 'Completed' },
        planning: { bg: 'bg-purple-500/10', text: 'text-purple-600', dot: 'bg-purple-500', label: 'Planning' },
    };
    const c = config[status];
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${c.bg} ${c.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`}></span>
            {c.label}
        </span>
    );
};

// --- Progress Bar ---
const ProgressBar: React.FC<{ percent: number }> = ({ percent }) => {
    let barColor = 'bg-emerald-500';
    if (percent < 25) barColor = 'bg-purple-500';
    else if (percent < 50) barColor = 'bg-amber-500';
    else if (percent < 75) barColor = 'bg-blue-500';
    else if (percent === 100) barColor = 'bg-emerald-500';

    return (
        <div className="flex items-center gap-2.5 min-w-[120px]">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${barColor}`}
                />
            </div>
            <span className="text-[12px] font-semibold text-gray-600 min-w-[32px] text-right">{percent}%</span>
        </div>
    );
};


interface ProjectsTableProps {
    onSelectProject: (project: Project) => void;
}

const ProjectsTable: React.FC<ProjectsTableProps> = ({ onSelectProject }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortKey, setSortKey] = useState<SortKey>('name');
    const [sortDir, setSortDir] = useState<SortDir>('asc');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [hoveredRow, setHoveredRow] = useState<string | null>(null);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDir('asc');
        }
    };

    const SortIcon: React.FC<{ colKey: SortKey }> = ({ colKey }) => {
        if (sortKey !== colKey) return <ArrowUpDown size={13} className="text-gray-300 ml-1" />;
        return sortDir === 'asc'
            ? <ChevronUp size={13} className="text-orange-500 ml-1" />
            : <ChevronDown size={13} className="text-orange-500 ml-1" />;
    };

    const filteredAndSorted = useMemo(() => {
        let data = [...projectsData];

        // Filter by status
        if (statusFilter !== 'all') {
            data = data.filter(p => p.status === statusFilter);
        }

        // Filter by search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.address.toLowerCase().includes(q) ||
                p.pm.toLowerCase().includes(q) ||
                p.gc.toLowerCase().includes(q) ||
                p.owner.toLowerCase().includes(q)
            );
        }

        // Sort
        data.sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            }
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
            }
            return 0;
        });

        return data;
    }, [searchQuery, sortKey, sortDir, statusFilter]);

    const statusCounts = useMemo(() => {
        return {
            all: projectsData.length,
            active: projectsData.filter(p => p.status === 'active').length,
            'on-hold': projectsData.filter(p => p.status === 'on-hold').length,
            completed: projectsData.filter(p => p.status === 'completed').length,
            planning: projectsData.filter(p => p.status === 'planning').length,
        };
    }, []);

    return (
        <div className="flex-1 flex flex-col min-h-0 px-6 py-5 overflow-hidden">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h1 className="text-[22px] font-bold text-gray-900 tracking-tight">Projects</h1>
                    <p className="text-[13px] text-gray-500 mt-0.5">
                        Manage and access all projects across your company
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-all">
                        <Download size={14} />
                        Download
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 text-[13px] font-semibold text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-all">
                        <span className="text-base leading-none">+</span>
                        Create
                    </button>
                </div>
            </div>

            {/* Toolbar: Search + Filters */}
            <div className="flex items-center gap-3 mb-4">
                {/* Search */}
                <div className="relative flex-1 max-w-sm">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-[13px] bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-400 text-gray-700 placeholder:text-gray-400 shadow-sm transition-all"
                    />
                </div>

                {/* Status Filter Tabs */}
                <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
                    {(['all', 'active', 'on-hold', 'planning', 'completed'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-3 py-1.5 text-[11.5px] font-semibold rounded-md transition-all ${statusFilter === status
                                ? 'bg-white text-gray-800 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {status === 'all' ? 'All' : status === 'on-hold' ? 'On Hold' : status.charAt(0).toUpperCase() + status.slice(1)}
                            <span className={`ml-1 text-[10px] ${statusFilter === status ? 'text-orange-500' : 'text-gray-400'}`}>
                                {statusCounts[status]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden flex flex-col min-h-0">
                <div className="overflow-auto flex-1">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 border-b border-gray-200">
                            <tr>
                                <th className="pl-5 pr-3 py-3">
                                    <button onClick={() => handleSort('name')} className="flex items-center text-[11px] font-bold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                                        <Building2 size={13} className="mr-1.5 text-gray-400" />
                                        Project
                                        <SortIcon colKey="name" />
                                    </button>
                                </th>
                                <th className="px-3 py-3">
                                    <button onClick={() => handleSort('status')} className="flex items-center text-[11px] font-bold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                                        Status
                                        <SortIcon colKey="status" />
                                    </button>
                                </th>
                                <th className="px-3 py-3">
                                    <button onClick={() => handleSort('progress')} className="flex items-center text-[11px] font-bold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                                        Progress
                                        <SortIcon colKey="progress" />
                                    </button>
                                </th>
                                <th className="px-3 py-3">
                                    <button onClick={() => handleSort('pm')} className="flex items-center text-[11px] font-bold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                                        <User size={13} className="mr-1.5 text-gray-400" />
                                        PM
                                        <SortIcon colKey="pm" />
                                    </button>
                                </th>
                                <th className="px-3 py-3">
                                    <button onClick={() => handleSort('gc')} className="flex items-center text-[11px] font-bold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors">
                                        GC
                                        <SortIcon colKey="gc" />
                                    </button>
                                </th>
                                <th className="px-3 py-3">
                                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                        Budget
                                    </span>
                                </th>
                                <th className="px-3 py-3">
                                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                        Last Activity
                                    </span>
                                </th>
                                <th className="px-3 py-3 w-[80px]"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredAndSorted.map((project, index) => (
                                <motion.tr
                                    key={project.id}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, delay: index * 0.03 }}
                                    className={`group cursor-pointer transition-colors duration-150 ${hoveredRow === project.id ? 'bg-orange-50/50' : 'hover:bg-gray-50'
                                        }`}
                                    onMouseEnter={() => setHoveredRow(project.id)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    onClick={() => onSelectProject(project)}
                                >
                                    {/* Project Name + Address */}
                                    <td className="pl-5 pr-3 py-3.5">
                                        <div>
                                            <div className="text-[13px] font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                                {project.name}
                                            </div>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <MapPin size={11} className="text-gray-400 shrink-0" />
                                                <span className="text-[11.5px] text-gray-400 truncate max-w-[220px]">
                                                    {project.address}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-3 py-3.5">
                                        <StatusBadge status={project.status} />
                                    </td>

                                    {/* Progress */}
                                    <td className="px-3 py-3.5">
                                        <ProgressBar percent={project.progress} />
                                    </td>

                                    {/* PM */}
                                    <td className="px-3 py-3.5">
                                        <span className="text-[12.5px] text-gray-700 font-medium">{project.pm}</span>
                                    </td>

                                    {/* GC */}
                                    <td className="px-3 py-3.5">
                                        <span className="text-[12.5px] text-gray-600">{project.gc}</span>
                                    </td>

                                    {/* Budget */}
                                    <td className="px-3 py-3.5">
                                        <span className="text-[12.5px] font-semibold text-gray-700">{project.budget}</span>
                                    </td>

                                    {/* Last Activity */}
                                    <td className="px-3 py-3.5">
                                        <span className="text-[12px] text-gray-400">{project.lastActivity}</span>
                                    </td>

                                    {/* Action */}
                                    <td className="px-3 py-3.5 text-right">
                                        <motion.div
                                            initial={{ opacity: 0, x: -4 }}
                                            animate={{ opacity: hoveredRow === project.id ? 1 : 0, x: hoveredRow === project.id ? 0 : -4 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <button
                                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onSelectProject(project);
                                                }}
                                                aria-label={`Open ${project.name}`}
                                            >
                                                Open
                                                <ArrowRight size={13} />
                                            </button>
                                        </motion.div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="border-t border-gray-200 px-5 py-3 bg-gray-50/80 flex items-center justify-between text-[12px] text-gray-500 shrink-0">
                    <span>{filteredAndSorted.length} of {projectsData.length} projects</span>
                    <span className="text-[11px] text-gray-400">Click a project to open it</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectsTable;
