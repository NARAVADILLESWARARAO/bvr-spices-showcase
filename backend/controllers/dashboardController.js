const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

// @desc    Get dashboard summary
// @route   GET /api/dashboard/summary
// @access  Private/Admin
const getDashboardSummary = asyncHandler(async (req, res) => {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const orders = await Order.find({});

    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
    const pendingOrders = await Order.countDocuments({ isDelivered: false });

    // Last 5 orders
    const recentOrders = await Order.find({})
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'name');

    // Monthly revenue (simplified for demo: last 6 months)
    const monthlyRevenue = await Order.aggregate([
        {
            $group: {
                _id: { $month: "$createdAt" },
                revenue: { $sum: "$totalPrice" }
            }
        },
        { $sort: { "_id": 1 } }
    ]);

    res.json({
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue,
        pendingOrders,
        recentOrders,
        monthlyRevenue
    });
});

module.exports = {
    getDashboardSummary
};
