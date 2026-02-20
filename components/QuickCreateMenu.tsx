import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    ChevronDown,
    FileDiff, 
    CheckSquare, 
    Truck, 
    CalendarDays, 
    Package, 
    Ticket, 
    ClipboardList, 
    FileQuestion, 
    FileCheck
} from 'lucide-react';

interface QuickCreateItem {
    label: string;
    icon: React.ElementType;
    shortcut?: string;
    type: string;
}

const quickCreateItems: QuickCreateItem[] = [
    { label: 'Change Order', icon: FileDiff, type: 'change-order' },
    { label: 'Checklist', icon: CheckSquare, type: 'checklist' },
    { label: 'Equipment', icon: Truck, type: 'equipment' },
    { label: 'Lookahead', icon: CalendarDays, type: 'lookahead' },
    { label: 'Materials', icon: Package, type: 'materials' },
    { label: 'T&M Ticket', icon: Ticket, type: 'tm-ticket' },
    { label: 'Punch List', icon: ClipboardList, type: 'punch-list' },
    { label: 'RFI', icon: FileQuestion, type: 'rfi' },
    { label: 'Submittal', icon: FileCheck, type: 'submittal' },
];

interface QuickCreateMenuProps {
    mode?: 'sidebar' | 'header';
    /** Controlled: when provided, parent controls open state (e.g. to close when mega menu opens) */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export const QuickCreateMenu: React.FC<QuickCreateMenuProps> = ({ mode = 'sidebar', open: controlledOpen, onOpenChange }) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;
    const setIsOpen = (value: boolean) => {
        if (!isControlled) setInternalOpen(value);
        onOpenChange?.(value);
    };
    const menuRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    // Handle keyboard shortcuts (Shift + C)
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.shiftKey && (event.key === 'C' || event.key === 'c')) {
                event.preventDefault();
                setIsOpen(prev => !prev);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleQuickCreate = (type: string) => {
        console.log(`Quick Create triggered for: ${type}`);
        setIsOpen(false);
        // Placeholder for future modal logic
    };

    const isSidebar = mode === 'sidebar';

    return (
        <div className="relative w-full" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={
                    isSidebar 
                    ? `relative flex flex-col items-center justify-center gap-1.5 h-[80px] w-full text-xs font-medium transition-colors duration-200 ${isOpen ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'}`
                    : `relative flex flex-col items-center justify-center gap-1 w-full transition-colors duration-200 group`
                }
                aria-label="Create New"
                aria-expanded={isOpen}
            >
                {isSidebar ? (
                    <>
                        <Plus size={24} strokeWidth={2} className="shrink-0" />
                        <span>Create</span>
                    </>
                ) : (
                    <>
                        <div className="relative flex items-center justify-center w-[30.6px] h-[30.6px]">
                            <div className={`flex items-center justify-center shrink-0 transition-colors duration-200 ${isOpen ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
                                    <path d="M8 12H16"/>
                                    <path d="M12 8V16"/>
                                </svg>
                            </div>
                            <motion.div 
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute -bottom-0.5 -right-3 bg-black rounded-full p-0.5"
                            >
                                <ChevronDown size={14} className="text-gray-400 group-hover:text-white" />
                            </motion.div>
                        </div>
                        <span className="text-[12px] font-bold text-white whitespace-nowrap leading-none">Create</span>
                    </>
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={isSidebar ? { opacity: 0, x: 10, scale: 0.95 } : { opacity: 0, y: 10, scale: 0.95 }}
                        animate={isSidebar ? { opacity: 1, x: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
                        exit={isSidebar ? { opacity: 0, x: 10, scale: 0.95 } : { opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className={
                            isSidebar
                            ? "absolute left-full top-0 ml-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50 origin-top-left"
                            : "absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50 origin-top-left"
                        }
                    >
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="text-sm font-semibold text-gray-900">Quick Create</h3>
                        </div>

                        {/* Menu Items */}
                        <div className="py-1">
                            {quickCreateItems.map((item) => (
                                <button
                                    key={item.type}
                                    onClick={() => handleQuickCreate(item.type)}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors group focus:outline-none focus:bg-gray-50"
                                >
                                    <item.icon size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </div>
                        
                        {/* Footer Hint */}
                        <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-400 text-center flex justify-between items-center">
                            <span>Quick Add</span>
                            <span className="font-mono bg-gray-200 px-1.5 py-0.5 rounded text-gray-500">Shift + C</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
