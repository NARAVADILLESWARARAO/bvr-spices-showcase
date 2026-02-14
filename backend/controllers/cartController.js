const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        res.json(cart);
    } else {
        res.json({ user: req.user._id, cartItems: [] });
    }
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
    const { productId, qty } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        // Check if product already exists in cart
        const itemIndex = cart.cartItems.findIndex(
            (p) => p.product.toString() === productId
        );

        if (itemIndex > -1) {
            // Product exists in cart, update the quantity
            cart.cartItems[itemIndex].qty = qty;
        } else {
            // Product does not exist in cart, add new item
            cart.cartItems.push({
                product: productId,
                name: product.name,
                qty: qty,
                image: product.image,
                price: product.price,
            });
        }
    } else {
        // No cart for user, create new cart
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [
                {
                    product: productId,
                    name: product.name,
                    qty: qty,
                    image: product.image,
                    price: product.price,
                },
            ],
        });
    }

    await cart.save();
    res.status(201).json(cart);
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeFromCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.cartItems = cart.cartItems.filter(
            (item) => item.product.toString() !== req.params.id
        );

        await cart.save();
        res.json(cart);
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.cartItems = [];
        await cart.save();
        res.json({ message: 'Cart cleared' });
    } else {
        res.status(404);
        throw new Error('Cart not found');
    }
});

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    clearCart
};
