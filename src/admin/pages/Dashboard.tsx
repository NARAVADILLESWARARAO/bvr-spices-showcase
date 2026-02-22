import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import {
    Package,
    ShoppingCart,
    Users,
    IndianRupee,
    Clock,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon, color, trend }: any) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50"
    >
        <div className={`p-4 rounded-xl ${color} text-white shadow-inner`}>
            {icon}
        </div>
        <div className="flex-1">
            <h3 className="text-gray-500 text-sm font-medium tracking-wide uppercase italic">{title}</h3>
            <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
                {trend && (
                    <span className={`text-xs font-semibold mb-1 flex items-center ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {Math.abs(trend)}%
                    </span>
                )}
            </div>
        </div>
    </motion.div>
);

const Dashboard = () => {
    const [summary, setSummary] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await adminService.getDashboardSummary();
                setSummary(data);
            } catch (error) {
                console.error('Error fetching summary:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    if (loading) return (
        <div className="space-y-8 animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-32 bg-gray-200 rounded-2xl shadow-sm"></div>)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-96 bg-gray-200 rounded-2xl"></div>
                <div className="h-96 bg-gray-200 rounded-2xl"></div>
            </div>
        </div>
    );

    const stats = [
        { title: 'Total Products', value: summary?.totalProducts, icon: <Package size={24} />, color: 'bg-indigo-500', trend: 12 },
        { title: 'Total Orders', value: summary?.totalOrders, icon: <ShoppingCart size={24} />, color: 'bg-blue-500', trend: 8 },
        { title: 'Total Revenue', value: `₹${summary?.totalRevenue?.toLocaleString()}`, icon: <IndianRupee size={24} />, color: 'bg-emerald-500', trend: 15 },
        { title: 'Total Users', value: summary?.totalUsers, icon: <Users size={24} />, color: 'bg-amber-500', trend: 5 },
        { title: 'Pending Orders', value: summary?.pendingOrders, icon: <Clock size={24} />, color: 'bg-rose-500', trend: -2 },
    ];

    return (
        <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders - Takes 2 columns */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <Clock size={20} className="text-gray-400" />
                            Recent Orders
                        </h3>
                        <button className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 italic">
                                {summary?.recentOrders?.map((order: any) => (
                                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-400 font-mono tracking-tighter">
                                            {order._id.substring(order._id.length - 8)}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{order.user?.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full ${order.isDelivered ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                                }`}>
                                                {order.status || (order.isDelivered ? 'Delivered' : 'Pending')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                                            ₹{order.totalPrice.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Top Products / Analytics Quick View - Takes 1 column */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <TrendingUp size={20} className="text-gray-400" />
                            Business Growth
                        </h3>
                    </div>

                    <div className="space-y-6">
                        {/* Placeholder for small chart or key metrics */}
                        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                            <div className="h-40 w-full flex items-end gap-2 px-2">
                                {[40, 60, 45, 80, 55, 70, 90].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        className="bg-red-500/20 hover:bg-red-500 rounded-t-md flex-1 transition-colors cursor-help"
                                    />
                                ))}
                            </div>
                            <p className="mt-4 text-sm text-gray-500 font-medium italic">Weekly Sales Activity</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                                <div>
                                    <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">Growth Rate</p>
                                    <p className="text-xl font-bold text-emerald-900">+24.5%</p>
                                </div>
                                <div className="p-2 bg-emerald-500 text-white rounded-lg shadow-lg shadow-emerald-200">
                                    <ArrowUpRight size={20} />
                                </div>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <div>
                                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Avg Order Value</p>
                                    <p className="text-xl font-bold text-blue-900">₹842</p>
                                </div>
                                <div className="p-2 bg-blue-500 text-white rounded-lg shadow-lg shadow-blue-200">
                                    < IndianRupee size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
