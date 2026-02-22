import React, { useEffect, useState } from 'react';
import { adminService } from '../services/adminService';
import {
    Eye,
    CheckCircle2,
    Truck,
    PackageCheck,
    X,
    ExternalLink,
    Clock,
    User,
    MapPin,
    CreditCard,
    ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const OrderManager = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);

    const fetchOrders = async () => {
        try {
            const data = await adminService.getOrders();
            setOrders(data);
        } catch (error) {
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await adminService.updateOrderStatus(id, status);
            toast.success(`Order status updated to ${status}`);
            fetchOrders();
            if (selectedOrder && selectedOrder._id === id) {
                // Update modal view too
                setSelectedOrder({ ...selectedOrder, status });
            }
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const viewOrderDetails = async (id: string) => {
        try {
            const data = await adminService.getOrderDetails(id);
            setSelectedOrder(data);
            setShowModal(true);
        } catch (error) {
            toast.error('Failed to fetch order details');
        }
    };

    const statusColors: any = {
        'Pending': 'bg-amber-100 text-amber-700 border-amber-200',
        'Confirmed': 'bg-blue-100 text-blue-700 border-blue-200',
        'Shipped': 'bg-indigo-100 text-indigo-700 border-indigo-200',
        'Delivered': 'bg-emerald-100 text-emerald-700 border-emerald-200',
        'Cancelled': 'bg-rose-100 text-rose-700 border-rose-200',
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/80 border-b border-gray-100 italic">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 italic">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-xs font-bold text-gray-400 tracking-tighter">
                                        #{order._id.substring(order._id.length - 10).toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-gray-900 leading-tight">{order.user?.name}</p>
                                        <p className="text-xs text-gray-500 italic mt-0.5">{order.user?.email || 'Guest'}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                            day: '2-digit', month: 'short', year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                        ₹{order.totalPrice.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-[10px] font-bold rounded-full border uppercase tracking-widest ${statusColors[order.status || (order.isDelivered ? 'Delivered' : 'Pending')]}`}>
                                            {order.status || (order.isDelivered ? 'Delivered' : 'Pending')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => viewOrderDetails(order._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            <AnimatePresence>
                {showModal && selectedOrder && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-60"
                        >
                            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-2xl font-black text-gray-900 italic tracking-tighter uppercase">
                                            Order Details
                                        </h3>
                                        <span className={`px-4 py-1.5 text-xs font-bold rounded-full border shadow-sm ${statusColors[selectedOrder.status || (selectedOrder.isDelivered ? 'Delivered' : 'Pending')]}`}>
                                            {selectedOrder.status || (selectedOrder.isDelivered ? 'Delivered' : 'Pending')}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 font-mono mt-2 tracking-tighter uppercase">ID: {selectedOrder._id}</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                    <X size={24} className="text-gray-500" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar italic">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Order Status Timeline / Actions */}
                                    <div className="md:col-span-1 space-y-6">
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2 uppercase text-xs tracking-widest">
                                                Update Status
                                            </h4>
                                            <div className="space-y-3">
                                                {['Pending', 'Confirmed', 'Shipped', 'Delivered'].map((s) => (
                                                    <button
                                                        key={s}
                                                        onClick={() => handleStatusUpdate(selectedOrder._id, s)}
                                                        className={`w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all font-bold group ${(selectedOrder.status || (selectedOrder.isDelivered ? 'Delivered' : 'Pending')) === s
                                                                ? 'border-red-500 bg-red-50 text-red-600'
                                                                : 'border-white bg-white hover:border-gray-200 text-gray-600'
                                                            }`}
                                                    >
                                                        <span className="text-sm">{s}</span>
                                                        {s === 'Pending' && <Clock size={16} />}
                                                        {s === 'Confirmed' && <CheckCircle2 size={16} />}
                                                        {s === 'Shipped' && <Truck size={16} />}
                                                        {s === 'Delivered' && <PackageCheck size={16} />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2 uppercase text-xs tracking-widest">
                                                Payment Info
                                            </h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CreditCard size={16} className="text-gray-400" />
                                                    <span className="text-gray-500 uppercase font-black text-[10px]">Method:</span>
                                                    <span className="font-bold text-gray-900 uppercase">{selectedOrder.paymentMethod}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 size={16} className={selectedOrder.isPaid ? "text-emerald-500" : "text-gray-400"} />
                                                    <span className="text-gray-500 uppercase font-black text-[10px]">Paid:</span>
                                                    <span className={`font-bold uppercase ${selectedOrder.isPaid ? "text-emerald-600" : "text-rose-600"}`}>
                                                        {selectedOrder.isPaid ? "Successful" : "Pending"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Items and Shipping */}
                                    <div className="md:col-span-2 space-y-8">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <h4 className="font-bold text-gray-900 flex items-center gap-2 uppercase text-xs tracking-widest">
                                                    <User size={16} className="text-red-500" /> Customer
                                                </h4>
                                                <div>
                                                    <p className="font-bold text-gray-900 text-lg leading-tight">{selectedOrder.user?.name}</p>
                                                    <p className="text-sm text-gray-500 italic lowercase">{selectedOrder.user?.email}</p>
                                                    <p className="text-sm text-gray-500 font-mono mt-1 tracking-tighter uppercase">{selectedOrder.user?._id}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <h4 className="font-bold text-gray-900 flex items-center gap-2 uppercase text-xs tracking-widest">
                                                    <MapPin size={16} className="text-red-500" /> Shipping Address
                                                </h4>
                                                <div className="text-sm text-gray-700 not-italic uppercase font-medium leading-relaxed">
                                                    <p>{selectedOrder.shippingAddress.address}</p>
                                                    <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                                                    <p className="font-black text-gray-900 mt-1">{selectedOrder.shippingAddress.country}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h4 className="font-bold text-gray-900 flex items-center gap-2 uppercase text-xs tracking-widest">
                                                <ShoppingBag size={16} className="text-red-500" /> Items Summary
                                            </h4>
                                            <div className="divide-y divide-gray-100 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                                {selectedOrder.orderItems.map((item: any, idx: number) => (
                                                    <div key={idx} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
                                                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-bold text-gray-900 truncate leading-tight uppercase tracking-tight">{item.name}</p>
                                                            <p className="text-xs text-gray-500">Qty: {item.qty} × ₹{item.price}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-bold text-gray-900">₹{item.qty * item.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="p-6 bg-gray-50/50 space-y-3">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500 font-medium italic">Items Total</span>
                                                        <span className="font-bold text-gray-900">₹{(selectedOrder.totalPrice - selectedOrder.shippingPrice - selectedOrder.taxPrice).toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-500 font-medium italic">Shipping Fee</span>
                                                        <span className="font-bold text-gray-900">₹{selectedOrder.shippingPrice.toLocaleString()}</span>
                                                    </div>
                                                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                                                        <span className="text-gray-900 font-black uppercase tracking-widest text-sm">Grand Total</span>
                                                        <span className="text-2xl font-black text-red-600 shadow-sm px-1">₹{selectedOrder.totalPrice.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrderManager;
