import React from 'react';
import { Home, ClipboardList, PawPrint, User } from 'lucide-react';

const BottomNavbar = ({ currentPage, onNavigate }) => {
    const navItems = [
        { name: 'home', label: 'Home', icon: Home },
        // Arahkan 'tips' ke home untuk pemilihan hewan, atau ke halaman list tips umum
        { name: 'tips', label: 'Tips', icon: ClipboardList }, 
        { name: 'adopsi', label: 'Adopsi', icon: PawPrint },
        { name: 'profile', label: 'Profil', icon: User },
    ];

    return (
        // Fixed bottom navbar for mobile/small screens
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40 md:hidden">
            <div className="flex justify-around items-center h-16 max-w-xl mx-auto">
                {navItems.map((item) => {
                    // Check if current page is active or if 'detail' is active when navigating from 'home'
                    const isActive = currentPage.startsWith(item.name) || (item.name === 'home' && currentPage === 'detail');
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.name}
                            onClick={() => onNavigate(item.name)}
                            className={`flex flex-col items-center justify-center p-2 transition-colors duration-200 focus:outline-none rounded-xl ${
                                isActive 
                                    ? 'text-indigo-600 bg-indigo-50' 
                                    : 'text-gray-500 hover:text-indigo-500 hover:bg-gray-50'
                            } w-1/4`}
                            aria-label={item.label}
                        >
                            <Icon className="w-6 h-6" />
                            <span className="text-xs mt-0.5 font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNavbar;