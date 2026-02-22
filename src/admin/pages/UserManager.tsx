import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import {
    Trash2,
    ShieldCheck,
    ShieldAlert,
    Search,
    User,
    Mail,
    Calendar,
    ShoppingBag,
    MoreVertical,
    CheckCircle2,
    Ban
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const UserManager = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchUsers = async () => {
        try {
            const data = await adminService.getUsers();
            setUsers(data);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleRoleUpdate = async (id: string, isAdmin: boolean) => {
        try {
            await adminService.updateUser(id, { isAdmin });
            toast.success(`User role updated to ${isAdmin ? 'Admin' : 'User'}`);
            fetchUsers();
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    const handleBlockUpdate = async (id: string, isBlocked: boolean) => {
        try {
            await adminService.updateUser(id, { isBlocked });
            toast.success(`User ${isBlocked ? 'blocked' : 'unblocked'}`);
            fetchUsers();
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Delete this user? This action cannot be undone.')) {
            try {
                await adminService.deleteUser(id);
                toast.success('User removed');
                fetchUsers();
            } catch (error) {
                toast.error('Failed to delete user');
            }
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all shadow-sm italic hover:border-gray-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/80 border-b border-gray-100 italic">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User Info</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Registration</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Orders</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 italic">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-inner ${user.isAdmin ? 'bg-indigo-500' : 'bg-rose-500'
                                                }`}>
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 leading-tight uppercase tracking-tight">{user.name}</p>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 lowercase font-medium">
                                                    <Mail size={12} /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-600 flex items-center gap-1">
                                            <Calendar size={14} className="text-gray-400" />
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.isAdmin ? (
                                            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-200">
                                                Admin
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">
                                                Customer
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 font-bold text-gray-900">
                                            <ShoppingBag size={16} className="text-red-500" />
                                            {user.totalOrders || 0}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleRoleUpdate(user._id, !user.isAdmin)}
                                                className={`p-2 rounded-lg transition-all border border-transparent ${user.isAdmin
                                                    ? 'text-amber-500 hover:bg-amber-50 hover:border-amber-100'
                                                    : 'text-indigo-500 hover:bg-indigo-50 hover:border-indigo-100'
                                                    }`}
                                                title={user.isAdmin ? 'Demote to User' : 'Promote to Admin'}
                                            >
                                                {user.isAdmin ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
                                            </button>
                                            <button
                                                onClick={() => handleBlockUpdate(user._id, !user.isBlocked)}
                                                className={`p-2 rounded-lg transition-all border border-transparent ${user.isBlocked
                                                        ? 'text-emerald-500 hover:bg-emerald-50 hover:border-emerald-100'
                                                        : 'text-rose-600 hover:bg-rose-50 hover:border-rose-100'
                                                    }`}
                                                title={user.isBlocked ? 'Unblock User' : 'Block User'}
                                                disabled={user.isAdmin}
                                            >
                                                {user.isBlocked ? <CheckCircle2 size={18} /> : <Ban size={18} />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all border border-transparent hover:border-rose-100"
                                                title="Delete User"
                                                disabled={user.isAdmin}
                                            >
                                                <Trash2 size={18} className={user.isAdmin ? 'opacity-20' : ''} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserManager;
