import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
    User,
    Lock,
    Mail,
    Bell,
    Shield,
    Smartphone,
    Save,
    Camera
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const Settings = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate update
        setTimeout(() => {
            toast.success('Profile updated successfully');
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="max-w-4xl space-y-8 italic">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-widest">Admin Profile</h3>
                        <p className="text-sm text-gray-500 font-medium">Update your administrative credentials and info</p>
                    </div>
                    <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-200 border-4 border-white">
                        <User size={32} />
                    </div>
                </div>

                <form onSubmit={handleSaveProfile} className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-bold"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-bold"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Phone Number</label>
                            <div className="relative">
                                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all font-bold"
                                    value={profileData.phone}
                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest">Admin Role</label>
                            <div className="relative">
                                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
                                <input
                                    type="text"
                                    disabled
                                    className="w-full pl-10 pr-4 py-3 bg-indigo-50 border border-indigo-100 rounded-xl font-black text-indigo-700 uppercase tracking-tighter"
                                    value="Super Administrator"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 font-black uppercase tracking-widest text-xs flex items-center gap-2 group"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                            <Save size={16} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="p-4 bg-amber-100 text-amber-600 rounded-2xl border border-amber-200 shadow-inner">
                        <Lock size={24} />
                    </div>
                    <div>
                        <h4 className="font-black text-gray-900 uppercase tracking-widest text-sm">Security & Password</h4>
                        <p className="text-sm text-gray-500 font-medium">Last changed 3 months ago</p>
                    </div>
                </div>
                <button className="px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all font-black uppercase tracking-widest text-[10px] shadow-lg shadow-gray-200">
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default Settings;
