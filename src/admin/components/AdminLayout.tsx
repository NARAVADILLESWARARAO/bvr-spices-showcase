import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
    LayoutDashboard,
    ShoppingBag,
    ShoppingCart,
    Users,
    BarChart3,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    User as UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/products', icon: <ShoppingBag size={20} />, label: 'Products' },
        { path: '/admin/orders', icon: <ShoppingCart size={20} />, label: 'Orders' },
        { path: '/admin/users', icon: <Users size={20} />, label: 'Users' },
        { path: '/admin/reports', icon: <BarChart3 size={20} />, label: 'Reports' },
        { path: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#f3f4f6] text-gray-800 font-sans overflow-hidden">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 260 : 80 }}
                className="bg-[#111827] text-gray-300 flex flex-col transition-all duration-300 ease-in-out border-r border-gray-800"
            >
                <div className="p-6 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <Link to="/admin" className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                            <span className="text-red-500">BVR</span> Admin
                        </Link>
                    ) : (
                        <div className="w-full flex justify-center">
                            <span className="text-red-500 font-bold text-xl">B</span>
                        </div>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-1 hover:bg-gray-800 rounded transition-colors"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="flex-1 mt-6 px-3 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group ${isActive
                                        ? 'bg-red-600 text-white shadow-lg shadow-red-900/20'
                                        : 'hover:bg-gray-800/50 hover:text-white'
                                    }`}
                            >
                                <span className={`${isActive ? 'text-white' : 'text-gray-400 group-hover:text-red-400'}`}>
                                    {item.icon}
                                </span>
                                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 group"
                    >
                        <LogOut size={20} className="text-gray-400 group-hover:text-red-400" />
                        {isSidebarOpen && <span className="font-medium">Logout</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm z-10">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {menuItems.find(item => item.path === location.pathname)?.label || 'Admin Panel'}
                    </h2>

                    <div className="flex items-center gap-6">
                        <button className="relative text-gray-500 hover:text-red-500 transition-colors">
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">3</span>
                        </button>

                        <div className="h-8 w-px bg-gray-200 mx-2"></div>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-gray-900 leading-none">{user?.name}</p>
                                <p className="text-xs text-gray-500 mt-1">Administrator</p>
                            </div>
                            <div className="bg-red-100 p-2 rounded-full text-red-600 border border-red-200">
                                <UserIcon size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
