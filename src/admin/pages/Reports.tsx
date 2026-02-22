import React from 'react';
import {
    BarChart3,
    LineChart,
    PieChart,
    TrendingUp,
    IndianRupee,
    Download,
    Calendar,
    ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Reports = () => {
    return (
        <div className="space-y-8 italic">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Analytics & Reports</h2>
                    <p className="text-sm text-gray-500 font-medium">Detailed breakdown of your business performance</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all font-black uppercase tracking-widest text-xs shadow-lg shadow-gray-200">
                    <Download size={16} />
                    Export PDF
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Breakdown */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm flex items-center gap-2">
                            <IndianRupee size={18} className="text-red-500" /> Revenue Growth
                        </h3>
                        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-100">
                            <button className="px-3 py-1 text-[10px] font-black uppercase bg-white shadow-sm rounded-md text-red-600">6 Months</button>
                            <button className="px-3 py-1 text-[10px] font-black uppercase text-gray-400 hover:text-gray-600">1 Year</button>
                        </div>
                    </div>

                    <div className="h-64 w-full flex items-end gap-4 px-4 relative">
                        {/* Grid lines */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gray-50"></div>
                        <div className="absolute inset-x-0 top-1/4 h-px bg-gray-50"></div>
                        <div className="absolute inset-x-0 top-2/4 h-px bg-gray-50"></div>
                        <div className="absolute inset-x-0 top-3/4 h-px bg-gray-50"></div>

                        {[45, 65, 55, 85, 95, 80].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-4 relative z-10">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t-xl shadow-lg shadow-red-100 hover:brightness-110 transition-all cursor-pointer group"
                                >
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        ₹{h * 1000}
                                    </div>
                                </motion.div>
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Month {i + 1}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Orders Distribution */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm mb-8 flex items-center gap-2">
                        <PieChart size={18} className="text-red-500" /> Sales Share
                    </h3>

                    <div className="flex flex-col items-center gap-8">
                        <div className="relative w-48 h-48 rounded-full border-[16px] border-gray-50 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border-[16px] border-emerald-500 border-r-transparent border-b-transparent -rotate-12 shadow-sm"></div>
                            <div className="absolute inset-0 rounded-full border-[16px] border-indigo-500 border-l-transparent border-t-transparent border-b-transparent rotate-45"></div>
                            <div className="text-center">
                                <p className="text-xs font-black text-gray-400 uppercase">Total</p>
                                <p className="text-2xl font-black text-gray-900 leading-none">842</p>
                                <p className="text-[10px] font-black text-emerald-500 uppercase mt-1">+12%</p>
                            </div>
                        </div>

                        <div className="w-full space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                    <span className="text-xs font-bold text-gray-600 uppercase">Powders</span>
                                </div>
                                <span className="text-xs font-black text-gray-900">42%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                    <span className="text-xs font-bold text-gray-600 uppercase">Masalas</span>
                                </div>
                                <span className="text-xs font-black text-gray-900">35%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <span className="text-xs font-bold text-gray-600 uppercase">Blends</span>
                                </div>
                                <span className="text-xs font-black text-gray-900">23%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Products Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100">
                    <h3 className="font-black text-gray-900 uppercase tracking-widest text-sm flex items-center gap-2">
                        <TrendingUp size={18} className="text-red-500" /> Top Selling Products
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 italic">
                            <tr>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Sales</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Profit</th>
                                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 italic">
                            {[
                                { name: 'Chilli Powder', cat: 'Powders', sales: 452, profit: '₹12,400', trend: 15 },
                                { name: 'Garam Masala', cat: 'Masalas', sales: 382, profit: '₹18,200', trend: 8 },
                                { name: 'Turmeric Powder', cat: 'Powders', sales: 312, profit: '₹8,900', trend: -2 },
                                { name: 'Biryani Masala', cat: 'Blends', sales: 284, profit: '₹14,500', trend: 24 },
                            ].map((p, i) => (
                                <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-4 font-black text-gray-900 uppercase tracking-tight">{p.name}</td>
                                    <td className="px-8 py-4"><span className="text-xs font-bold text-gray-500 uppercase">{p.cat}</span></td>
                                    <td className="px-8 py-4 font-black text-gray-900">{p.sales}</td>
                                    <td className="px-8 py-4 font-black text-red-600">{p.profit}</td>
                                    <td className="px-8 py-4">
                                        <div className={`flex items-center gap-1 font-black shadow-sm px-2 py-1 rounded-lg w-fit ${p.trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                            {p.trend > 0 ? <ArrowUpRight size={14} /> : <BarChart3 size={14} className="rotate-180" />}
                                            <span className="text-[10px] uppercase font-black">{Math.abs(p.trend)}%</span>
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

export default Reports;
