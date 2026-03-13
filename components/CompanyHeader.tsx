import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    MessageCircle,
    HelpCircle,
    Bell,
    FolderKanban,
    Settings,
    BarChart3,
    ChevronDown,
} from 'lucide-react';
import Tooltip from './Tooltip';
import AdminMegaMenu from './AdminMegaMenu';

// --- Icon Wrappers ---
const NavIconWrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`flex items-center justify-center w-6 h-6 ${className}`}>
        {children}
    </div>
);

// --- Nav Icons ---
const SearchIcon = () => <NavIconWrapper><Search size={20} /></NavIconWrapper>;
const ChatIcon = () => <NavIconWrapper><MessageCircle size={20} /></NavIconWrapper>;
const HelpIcon = () => <NavIconWrapper><HelpCircle size={20} /></NavIconWrapper>;
const BellIcon = () => <NavIconWrapper><Bell size={20} /></NavIconWrapper>;

// --- Linarc Logo ---
const LinarcLogoHeader = ({ onHomeClick }: { onHomeClick?: () => void }) => (
    <div
        className="flex items-center justify-center h-full cursor-pointer"
        onClick={onHomeClick}
        role="button"
        aria-label="Go to Company Home"
    >
        <svg width="60" height="60" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-1">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.6389 7.41738V7.42106C23.6038 7.65064 23.5706 7.87839 23.5373 8.10798L23.0367 11.4673L22.913 12.3563C22.8927 12.5142 22.8816 12.6795 22.8724 12.843C22.8613 13.0046 22.852 13.1626 22.8336 13.3077C22.7911 13.9726 22.8022 14.6374 22.8687 15.295C22.9315 16.0113 23.094 16.7129 23.3508 17.3796C23.6278 18.14 24.073 18.8251 24.6548 19.389C25.2625 19.9602 26.0125 20.3698 26.8418 20.581C27.5474 20.7518 28.2807 20.8143 29.0159 20.7665C29.5257 20.7353 30.0041 20.693 30.4659 20.6508C31.177 20.5883 31.8512 20.5277 32.555 20.513C33.5561 20.4983 34.5517 20.559 35.5344 20.6967C35.5713 20.7041 35.6101 20.6967 35.6434 20.6802C35.6766 20.6636 35.7043 20.6343 35.7209 20.6012C35.7376 20.5681 35.7413 20.5296 35.7339 20.4947C35.7246 20.4598 35.7043 20.4286 35.6748 20.4065C34.8491 19.76 33.9126 19.2567 32.9041 18.9133C32.3093 18.7057 31.6998 18.5386 31.0773 18.4137L29.3207 18.0831C28.8589 17.9986 28.4137 17.8553 27.9981 17.6551C27.7044 17.5064 27.4532 17.2896 27.2704 17.0233C26.8714 16.3511 26.659 15.5833 26.6497 14.7917C26.622 14.3142 26.6183 13.8091 26.622 13.2948L26.7218 11.6473C26.7883 10.4424 26.7661 9.23939 26.6516 8.04737C26.55 6.83699 26.332 5.64497 25.9995 4.48418C25.7132 3.45011 25.281 2.46564 24.7158 1.55832C24.6955 1.53444 24.6678 1.51607 24.6364 1.50689C24.605 1.4977 24.5717 1.4977 24.5385 1.50689C24.5071 1.51607 24.4775 1.53444 24.4535 1.55832C24.4313 1.58219 24.4147 1.61342 24.4092 1.64464C24.193 3.6595 23.9141 5.53844 23.6371 7.42289L23.6389 7.41738ZM42.3262 32.3579C40.6878 31.1696 39.1991 29.9959 37.7047 28.8186C37.5219 28.6753 37.339 28.5302 37.1561 28.387L34.4944 26.2858L33.787 25.7366C33.6595 25.6411 33.521 25.5493 33.3862 25.4593C33.2513 25.3711 33.1202 25.2829 33.0038 25.1948C32.4497 24.8274 31.8678 24.5079 31.2638 24.236C30.6099 23.933 29.9228 23.7236 29.2172 23.6134C28.4211 23.4738 27.6047 23.5142 26.8252 23.7346C26.0272 23.9715 25.2976 24.4142 24.701 25.0221C24.2004 25.5438 23.7811 26.1425 23.456 26.8001C23.2288 27.2537 23.0275 27.6853 22.8317 28.1041C22.5325 28.747 22.2462 29.3567 21.9082 29.9684C21.4224 30.8353 20.8719 31.6618 20.2624 32.4387C20.2384 32.4663 20.2236 32.503 20.2217 32.5416C20.2199 32.5801 20.231 32.6169 20.2513 32.6481C20.2716 32.6793 20.303 32.7014 20.3381 32.7124C20.3732 32.7234 20.4101 32.7197 20.4434 32.705C21.415 32.3157 22.3201 31.7628 23.1217 31.0667C23.5983 30.659 24.0471 30.2182 24.4664 29.7461L25.6301 28.4017C25.933 28.0472 26.2803 27.7368 26.6608 27.4778C26.936 27.2978 27.2482 27.1913 27.5714 27.1656C28.3528 27.1582 29.1249 27.3566 29.8157 27.7423C30.2442 27.9553 30.682 28.2033 31.1271 28.4641L32.5051 29.3696C33.5155 30.0271 34.5702 30.6057 35.66 31.1016C36.759 31.6177 37.9024 32.0236 39.0735 32.3138C40.1134 32.582 41.181 32.6995 42.2505 32.6665C42.2819 32.661 42.3115 32.6463 42.3355 32.6242C42.3595 32.6022 42.3761 32.5728 42.3835 32.5397C42.3909 32.5067 42.3909 32.4736 42.3817 32.4406C42.3724 32.4093 42.3539 32.3799 42.3281 32.3597L42.3262 32.3579ZM11.6566 30.3008C9.876 31.0024 8.10092 31.7022 6.23902 32.525C6.20762 32.5361 6.17437 32.5379 6.14112 32.5306C6.10787 32.5232 6.07832 32.5067 6.05431 32.4828C6.03029 32.4589 6.01367 32.4295 6.00443 32.3983C5.99704 32.3671 5.99889 32.334 6.00997 32.3046C6.51793 31.3606 7.15704 30.4937 7.91436 29.7278C8.75665 28.859 9.68575 28.0729 10.6887 27.3805C11.6696 26.6843 12.7058 26.0617 13.7882 25.518L15.2733 24.7797C15.724 24.5244 16.1618 24.2691 16.5626 24.0064C17.2479 23.6024 17.8094 23.033 18.1954 22.3516C18.3358 22.0595 18.3986 21.7344 18.3802 21.4057C18.3469 20.9447 18.249 20.4892 18.0902 20.0465L17.4972 18.3623C17.294 17.7617 17.1333 17.15 17.017 16.5329C16.8101 15.4878 16.7805 14.4262 16.9283 13.3885C16.932 13.3518 16.9486 13.3187 16.9745 13.293C17.0004 13.2673 17.0354 13.2526 17.0742 13.2507C17.1112 13.2489 17.15 13.2581 17.1814 13.2783C17.2128 13.2985 17.2386 13.3297 17.2516 13.3646C17.6247 14.283 18.0717 15.1756 18.5852 16.0333C18.9509 16.6358 19.3407 17.1886 19.7526 17.7727C20.0204 18.151 20.2956 18.5441 20.5801 18.9684C20.992 19.58 21.306 20.2467 21.5092 20.9428C21.7419 21.7638 21.7622 22.6197 21.5683 23.4297C21.3688 24.2158 20.9957 24.9432 20.4729 25.564C20.0222 26.1186 19.4921 26.6109 18.8992 27.0241C18.3598 27.4098 17.7872 27.7533 17.1869 28.049C17.0502 28.1059 16.908 28.1757 16.7621 28.2474C16.6143 28.3208 16.4647 28.3943 16.3169 28.4549L15.482 28.7929L12.3068 30.0418C12.0889 30.1281 11.8709 30.2126 11.6548 30.299L11.6566 30.3008Z" fill="#F97316" />
            <path d="M10.381 45.1653V46.4998H6V39.2974H7.68671V45.1653H10.3817H10.381Z" fill="white" />
            <path d="M13.2163 46.4998H11.4121V39.2974H13.2163V46.4991V46.4998Z" fill="white" />
            <path d="M20.5621 39.2974V46.4998H19.6888C19.5599 46.4998 19.4503 46.4799 19.3614 46.4402C19.2755 46.3975 19.1895 46.3246 19.1036 46.2223L15.6932 41.9266C15.7066 42.0554 15.7147 42.1805 15.7177 42.302C15.7243 42.4205 15.7273 42.5324 15.7273 42.6384V46.4991H14.248V39.2974H15.1318C15.2043 39.2974 15.2658 39.3003 15.3155 39.3069C15.3651 39.3136 15.4095 39.3268 15.4495 39.3467C15.4895 39.3629 15.5273 39.3879 15.5636 39.421C15.5999 39.4541 15.6414 39.4983 15.688 39.5543L19.1281 43.8794C19.1118 43.741 19.0999 43.6078 19.0932 43.479C19.0866 43.3472 19.0836 43.2236 19.0836 43.108V39.2974H20.5629H20.5621Z" fill="white" />
            <path d="M25.9239 43.7454L25.2626 41.7728C25.2137 41.6476 25.1618 41.5012 25.1063 41.3326C25.0507 41.1611 24.9952 40.9763 24.9397 40.7791C24.8907 40.98 24.8381 41.1662 24.7826 41.3377C24.727 41.5093 24.6752 41.6572 24.6262 41.7823L23.97 43.7447H25.9239V43.7454ZM28.5529 46.4991H27.2698C27.1259 46.4991 27.0104 46.4659 26.922 46.4004C26.8336 46.3312 26.7671 46.2436 26.7211 46.1384L26.3002 44.8827H23.5879L23.167 46.1384C23.1312 46.2304 23.0662 46.315 22.9712 46.3909C22.8799 46.4637 22.7659 46.4998 22.6285 46.4998H21.3359L24.0972 39.2974H25.7909L28.5521 46.4998L28.5529 46.4991Z" fill="white" />
            <path d="M31.6839 42.6837C31.9125 42.6837 32.107 42.6557 32.2658 42.5998C32.4283 42.5402 32.5612 42.4599 32.6636 42.3576C32.7667 42.2553 32.8409 42.1368 32.8877 42.0014C32.9337 41.863 32.9575 41.7144 32.9575 41.5569C32.9575 41.2404 32.8528 40.9931 32.6443 40.8157C32.4387 40.6376 32.1188 40.5486 31.6847 40.5486H31.0086V42.6837H31.6847H31.6839ZM35.2544 46.4998H33.7322C33.4502 46.4998 33.2484 46.3946 33.1259 46.1833L31.9222 44.0924C31.8658 44.0033 31.8027 43.9393 31.7329 43.8995C31.6632 43.8568 31.5637 43.8355 31.4346 43.8355H31.0071V46.4998H29.3262V39.2974H31.6832C32.2072 39.2974 32.6532 39.3518 33.0213 39.4608C33.3923 39.566 33.6944 39.7147 33.9267 39.9053C34.1619 40.0967 34.3326 40.3219 34.4388 40.5824C34.5449 40.843 34.5983 41.1263 34.5983 41.4325C34.5983 41.6665 34.5672 41.8873 34.5041 42.0949C34.441 42.3024 34.3482 42.4953 34.2258 42.6734C34.1033 42.8478 33.9504 43.0046 33.7679 43.1429C33.589 43.2813 33.382 43.3954 33.146 43.4837C33.2551 43.5396 33.3582 43.6103 33.4547 43.6964C33.5504 43.7788 33.6373 43.8775 33.713 43.993L35.2544 46.4991V46.4998Z" fill="white" />
            <path d="M41.2029 44.5976C41.2422 44.5976 41.2807 44.6056 41.3199 44.6221C41.3592 44.6351 41.3962 44.6589 41.4318 44.6949L42.0844 45.3769C41.7988 45.7479 41.4398 46.028 41.0082 46.2189C40.5794 46.4062 40.0714 46.4998 39.4843 46.4998C38.9458 46.4998 38.4618 46.4098 38.033 46.229C37.6079 46.0453 37.246 45.794 36.9473 45.4742C36.6516 45.1515 36.4248 44.7712 36.2657 44.3326C36.1066 43.8911 36.0273 43.4121 36.0273 42.8957C36.0273 42.3793 36.1131 41.8881 36.2853 41.4495C36.4576 41.0079 36.6995 40.6269 37.0106 40.3079C37.3216 39.9888 37.6959 39.7403 38.1304 39.5631C38.5657 39.386 39.0446 39.2974 39.5671 39.2974C39.8331 39.2974 40.0831 39.3219 40.3171 39.3701C40.554 39.4155 40.7749 39.4796 40.9791 39.5639C41.1833 39.6445 41.3715 39.7425 41.5437 39.8592C41.716 39.9751 41.8686 40.1012 42.0016 40.2366L41.4464 40.977C41.4108 41.0223 41.3686 41.0641 41.3199 41.103C41.2712 41.1383 41.2029 41.1563 41.115 41.1563C41.0569 41.1563 41.0016 41.1433 40.9493 41.1174C40.897 41.0915 40.8425 41.0612 40.7836 41.0252C40.7255 40.9863 40.6601 40.946 40.5889 40.9042C40.5205 40.8589 40.4377 40.8185 40.3403 40.7832C40.2459 40.7443 40.1339 40.7119 40.0046 40.6867C39.8781 40.6608 39.7284 40.6478 39.5569 40.6478C39.2844 40.6478 39.0344 40.6975 38.807 40.7976C38.5832 40.8977 38.3884 41.0447 38.2227 41.2377C38.0607 41.4278 37.9335 41.6634 37.8426 41.9443C37.7547 42.2216 37.7111 42.5392 37.7111 42.8971C37.7111 43.2551 37.7598 43.5792 37.8572 43.8594C37.9575 44.1396 38.0926 44.3772 38.2612 44.5703C38.4335 44.7604 38.6326 44.9059 38.86 45.0053C39.0875 45.1047 39.3309 45.1551 39.5904 45.1551C39.7393 45.1551 39.876 45.1486 39.9995 45.1357C40.123 45.1198 40.2379 45.0953 40.3454 45.0629C40.4522 45.0276 40.5533 44.9822 40.647 44.9275C40.7415 44.8692 40.8367 44.7971 40.934 44.71C40.9733 44.6776 41.0154 44.6517 41.0605 44.6329C41.1063 44.6106 41.1528 44.5991 41.2015 44.5991L41.2029 44.5976Z" fill="white" />
        </svg>
    </div>
);

// --- Nav Link Data ---
interface CompanyNavLink {
    key: string;
    label: string;
    icon: React.ReactNode;
}

const companyNavLinks: CompanyNavLink[] = [
    { key: 'portfolio', label: 'Portfolio', icon: <NavIconWrapper><FolderKanban size={20} /></NavIconWrapper> },
    { key: 'analytics', label: 'Analytics', icon: <NavIconWrapper><BarChart3 size={20} /></NavIconWrapper> },
];

interface CompanyHeaderProps {
    activeNavKey: string;
    onNavChange: (key: string) => void;
    onHomeClick?: () => void;
}

const CompanyHeader: React.FC<CompanyHeaderProps> = ({ activeNavKey, onNavChange, onHomeClick }) => {
    const [isAdminMenuVisible, setAdminMenuVisible] = useState(false);
    const adminMenuRef = useRef<HTMLLIElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (adminMenuRef.current && !adminMenuRef.current.contains(event.target as Node)) {
                setAdminMenuVisible(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setAdminMenuVisible(false);
            }
        };

        if (isAdminMenuVisible) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isAdminMenuVisible]);

    return (
        <header className="bg-black text-white font-['Lato'] shadow-xl min-h-[72px] md:h-[72px] border-b border-gray-800">
            <div className="pl-4 pr-2 md:pr-0 pt-3 pb-2 flex items-center h-full">
                {/* Left: Logo + Nav Links */}
                <div className="flex items-center flex-1 min-w-0 h-full justify-start gap-x-5 md:gap-x-5">
                    <LinarcLogoHeader onHomeClick={onHomeClick} />

                    {/* Company Nav Links - same style as v3 header NavItem */}
                    <nav className="hidden md:block flex-1 min-w-0">
                        <ul className="flex items-center gap-x-5 lg:gap-x-7 xl:gap-x-9">
                            {companyNavLinks.map((link) => (
                                <li key={link.key}>
                                    <a
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onNavChange(link.key);
                                        }}
                                        className={`flex flex-col items-center gap-2 transition-colors duration-200 ${link.key === 'portfolio' ? 'text-orange-500' : (activeNavKey === link.key ? 'text-orange-500' : 'text-gray-300 hover:text-white')}`}
                                    >
                                        {link.icon}
                                        <span className={`text-[12px] ${activeNavKey === link.key ? 'font-semibold' : 'font-medium'}`}>
                                            {link.label}
                                        </span>
                                    </a>
                                </li>
                            ))}
                            <li
                                ref={adminMenuRef}
                                className="relative flex flex-col items-center gap-2 transition-colors cursor-pointer group"
                                onMouseEnter={() => {
                                    if (!isMobile) {
                                        setAdminMenuVisible(true);
                                    }
                                }}
                                onMouseLeave={() => !isMobile && setAdminMenuVisible(false)}
                                onClick={() => {
                                    if (isMobile) {
                                        setAdminMenuVisible(!isAdminMenuVisible);
                                    }
                                }}
                            >
                                <div className="relative flex items-center justify-center">
                                    <NavIconWrapper><Settings size={20} /></NavIconWrapper>
                                    <motion.div
                                        animate={{ rotate: isAdminMenuVisible ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute -bottom-1 -right-2 rounded-full p-0.5"
                                    >
                                        <ChevronDown className="w-[14px] h-[14px] text-gray-400 group-hover:text-white transition-colors flex flex-col gap-0 justify-center items-center p-0 -mx-[5px] -my-[9px]" />
                                    </motion.div>
                                </div>
                                <span className={`text-[12px] ${activeNavKey === 'admin' ? 'font-semibold text-orange-500' : 'font-medium text-gray-300 group-hover:text-white'}`}>
                                    Admin
                                </span>
                                <div className="absolute top-full h-4 w-full" />
                                <AnimatePresence>
                                    {isAdminMenuVisible &&
                                        <AdminMegaMenu
                                            onSelect={(subcategory) => {
                                                onNavChange('admin');
                                                setAdminMenuVisible(false);
                                            }}
                                        />
                                    }
                                </AnimatePresence>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Right: Action Icons */}
                <div className="hidden md:flex items-center gap-x-3 lg:gap-x-4 pr-3 lg:pr-4">
                    <Tooltip content="Search" position="bottom" delay={400}>
                        <button className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="Search">
                            <SearchIcon />
                        </button>
                    </Tooltip>
                    <Tooltip content="Chat" position="bottom" delay={400}>
                        <button className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="Chat">
                            <ChatIcon />
                        </button>
                    </Tooltip>
                    <Tooltip content="Help" position="bottom" delay={400}>
                        <button className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="Help">
                            <HelpIcon />
                        </button>
                    </Tooltip>
                    <Tooltip content="Notifications" position="left" delay={400}>
                        <button className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="Notifications">
                            <BellIcon />
                        </button>
                    </Tooltip>
                    <Tooltip content="User Profile" position="left" delay={400}>
                        <div className="w-9 h-9 rounded-full bg-black border border-gray-600 flex items-center justify-center cursor-pointer hover:border-gray-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
                            </svg>
                        </div>
                    </Tooltip>
                </div>
            </div>
        </header>
    );
};

export default CompanyHeader;
