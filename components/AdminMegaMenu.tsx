import React from 'react';
import { motion } from 'framer-motion';
import {
    Building2, FileText, Phone, MapPin,
    Shield,
    HardDrive, Database, PenTool, Truck,
    UserCog, Users, Award, Clock,
    Code, DollarSign, Wrench,
    HardHat, PackageOpen, MoreHorizontal,
    GitBranch, User, ShoppingCart, Files, Calendar, Banknote,
    Settings2, LayoutList, Stamp, Shapes, Cloud, CheckSquare, Settings
} from 'lucide-react';

const adminData = {
    company: {
        title: 'Company',
        items: [
            { label: 'About', icon: <Building2 size={18} /> },
            { label: 'Licenses', icon: <FileText size={18} /> },
            { label: 'Contacts', icon: <Phone size={18} /> },
            { label: 'Location', icon: <MapPin size={18} /> },
        ]
    },
    permission: {
        title: 'Permission',
        items: [
            { label: 'Roles', icon: <Shield size={18} /> },
        ]
    },
    marketplace: {
        title: 'Market Place',
        items: [
            { label: 'External Drive', icon: <HardDrive size={18} /> },
            { label: 'ERP', icon: <Database size={18} /> },
            { label: 'Signature', icon: <PenTool size={18} /> },
            { label: 'Equipment', icon: <Truck size={18} /> },
        ]
    },
    employees: {
        title: 'Employees',
        items: [
            { label: 'Roles & Permission', icon: <UserCog size={18} /> },
            { label: 'Employees', icon: <Users size={18} /> },
            { label: 'Certificates', icon: <Award size={18} /> },
            { label: 'History', icon: <Clock size={18} /> },
        ]
    },
    taskCode: {
        title: 'Task Code',
        items: [
            { label: 'CSI Codes', icon: <Code size={18} /> },
            { label: 'Cost Codes', icon: <DollarSign size={18} /> },
            { label: 'Special Field Tasks', icon: <Wrench size={18} /> },
        ]
    },
    vendors: {
        title: 'Vendors',
        items: [
            { label: 'Contractors', icon: <HardHat size={18} /> },
            { label: 'Suppliers', icon: <PackageOpen size={18} /> },
            { label: 'Others', icon: <MoreHorizontal size={18} /> },
        ]
    },
    workflow: {
        title: 'Workflow',
        items: [
            { label: 'Types', icon: <GitBranch size={18} /> },
            { label: 'Employee', icon: <User size={18} /> },
            { label: 'Vendors', icon: <ShoppingCart size={18} /> },
            { label: 'Documents', icon: <Files size={18} /> },
            { label: 'Schedule', icon: <Calendar size={18} /> },
            { label: 'Finance', icon: <Banknote size={18} /> },
        ]
    },
    settings: {
        title: 'Settings',
        items: [
            { label: 'Customize', icon: <Settings2 size={18} /> },
            { label: 'Object Sequence', icon: <LayoutList size={18} /> },
            { label: 'My Stamps', icon: <Stamp size={18} /> },
            { label: 'All Stamps', icon: <Shapes size={18} /> },
            { label: 'Cloud Drive', icon: <Cloud size={18} /> },
            { label: 'Checklists', icon: <CheckSquare size={18} /> },
            { label: 'Project Config', icon: <Settings size={18} /> },
        ]
    }
};

const adminLayout = {
    column1: ['company', 'permission', 'marketplace'],
    column2: ['employees', 'taskCode', 'vendors'],
    column3: ['workflow', 'settings']
};

interface AdminMegaMenuProps {
    onSelect?: (subcategory: string) => void;
}

const AdminMegaMenu: React.FC<AdminMegaMenuProps> = ({ onSelect }) => {
    
    const renderColumn = (columnKeys: string[]) => {
        return columnKeys.map(key => {
            const category = adminData[key as keyof typeof adminData];
            if (!category) return null;

            return (
                <div key={key} className="space-y-3">
                    <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{category.title}</h4>
                    <div className="space-y-0.5">
                        {category.items.map(item => (
                            <a 
                                href="#" 
                                key={item.label}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onSelect?.(item.label);
                                }}
                                className="flex items-center gap-3 p-2 -mx-2 rounded-md hover:bg-gray-100 transition-colors duration-150 group"
                            >
                                <div className="text-gray-400 group-hover:text-gray-700 transition-colors">
                                    {item.icon}
                                </div>
                                <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                                    {item.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            );
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut', type: 'spring', damping: 20 }}
            className="absolute top-full left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl p-4 md:p-6 lg:p-8 z-50 origin-top min-w-[700px] border border-gray-100"
            style={{ marginTop: '0px' }}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 md:gap-x-8 text-black">
                <div className="space-y-6 md:space-y-8 border-r border-gray-100 pr-0 md:pr-6 pb-6 md:pb-0">
                    {renderColumn(adminLayout.column1)}
                </div>
                <div className="space-y-6 md:space-y-8 border-r border-gray-100 pr-0 md:pr-6 pb-6 md:pb-0">
                    {renderColumn(adminLayout.column2)}
                </div>
                <div className="space-y-6 md:space-y-8">
                    {renderColumn(adminLayout.column3)}
                </div>
            </div>
        </motion.div>
    );
};

export default AdminMegaMenu;
