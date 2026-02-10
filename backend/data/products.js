const products = [
    {
        name: 'Premium Red Chilli Powder',
        image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&h=400&fit=crop',
        description:
            'Our premium red chilli powder is made from handpicked Kashmiri and Guntur chillies, sun-dried and stone-ground to preserve their natural oils and vibrant color. Perfect for adding authentic heat and rich color to your dishes.',
        brand: 'BVR Spices',
        category: 'Powders',
        price: 149,
        countInStock: 50,
        rating: 4.5,
        numReviews: 12,
        weight: '200g',
        ingredients: '100% Pure Red Chilli (Capsicum annuum)',
        isBestSeller: true,
        usageTips: 'Add to curries, marinades, and dry rubs. Use 1-2 teaspoons per serving depending on your heat preference.'
    },
    {
        name: 'Golden Turmeric Powder',
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop',
        description:
            'Pure golden turmeric sourced from the fertile lands of Salem. Our turmeric contains high curcumin content, providing both vibrant color and health benefits. Traditionally processed to maintain maximum potency.',
        brand: 'BVR Spices',
        category: 'Powders',
        price: 129,
        countInStock: 100,
        rating: 4.8,
        numReviews: 8,
        weight: '200g',
        ingredients: '100% Pure Turmeric (Curcuma longa)',
        isBestSeller: false,
        usageTips: 'Essential for curries, rice dishes, and golden milk. Use ½-1 teaspoon per serving.'
    },
    {
        name: 'Royal Garam Masala',
        image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&h=400&fit=crop',
        description:
            'A royal blend of 12 aromatic spices including cardamom, cinnamon, cloves, and black pepper. Our signature garam masala recipe has been perfected over generations for the perfect balance of warmth and fragrance.',
        brand: 'BVR Spices',
        category: 'Masalas',
        price: 199,
        countInStock: 25,
        rating: 4.9,
        numReviews: 20,
        weight: '100g',
        ingredients: 'Coriander, Cumin, Black Pepper, Cardamom, Cinnamon, Cloves, Bay Leaves, Nutmeg, Mace, Fennel, Caraway, Star Anise',
        isBestSeller: true,
        usageTips: 'Add at the end of cooking for maximum aroma. Use ½-1 teaspoon per serving.'
    },
    {
        name: 'Fresh Coriander Powder',
        image: 'https://images.unsplash.com/photo-1599909533621-9b41e878798c?w=400&h=400&fit=crop',
        description:
            'Aromatic coriander powder made from premium quality coriander seeds. Freshly ground to release the essential oils that give your dishes that distinctive warm, citrusy flavor.',
        brand: 'BVR Spices',
        category: 'Powders',
        price: 99,
        countInStock: 60,
        rating: 4.2,
        numReviews: 5,
        weight: '200g',
        ingredients: '100% Pure Coriander Seeds (Coriandrum sativum)',
        isBestSeller: false,
        usageTips: 'Add to curries, soups, and vegetable dishes. Use 1-2 teaspoons per serving.'
    },
    {
        name: 'Roasted Cumin Powder',
        image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&h=400&fit=crop',
        description:
            'Premium cumin seeds, carefully roasted and ground to bring out their earthy, nutty flavor. A staple spice that forms the backbone of countless Indian recipes.',
        brand: 'BVR Spices',
        category: 'Powders',
        price: 119,
        countInStock: 30,
        rating: 4.6,
        numReviews: 15,
        weight: '200g',
        ingredients: '100% Pure Cumin Seeds (Cuminum cyminum)',
        isBestSeller: false,
        usageTips: 'Perfect for raitas, chaats, and curries. Use ½-1 teaspoon per serving.'
    },
    {
        name: 'South Indian Sambar Powder',
        image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=400&fit=crop',
        description:
            'Traditional South Indian sambar powder made with authentic recipes from Tamil Nadu. The perfect balance of heat, tanginess, and aromatic spices.',
        brand: 'BVR Spices',
        category: 'Blends',
        price: 139,
        countInStock: 40,
        rating: 4.7,
        numReviews: 18,
        weight: '200g',
        ingredients: 'Toor Dal, Coriander, Red Chilli, Cumin, Fenugreek, Curry Leaves, Mustard, Asafoetida, Turmeric',
        isBestSeller: false,
        usageTips: 'Add 2-3 tablespoons to sambar while cooking. Adjust to taste.'
    },
    {
        name: 'Kitchen King Masala',
        image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&h=400&fit=crop',
        description:
            'An all-purpose masala blend that brings restaurant-quality taste to your home cooking. Perfect for vegetables, paneer, and everyday dishes.',
        brand: 'BVR Spices',
        category: 'Masalas',
        price: 179,
        countInStock: 40,
        rating: 4.7,
        numReviews: 18,
        weight: '100g',
        ingredients: 'Coriander, Red Chilli, Turmeric, Cumin, Amchur, Black Pepper, Fenugreek, Ginger, Cardamom, Cinnamon, Cloves, Bay Leaves',
        isBestSeller: true,
        usageTips: 'Add 1-2 teaspoons while cooking vegetables or paneer dishes.'
    },
    {
        name: 'Hyderabadi Biryani Masala',
        image: 'https://images.unsplash.com/photo-1596097635121-14b63a7b0da8?w=400&h=400&fit=crop',
        description:
            'Authentic Hyderabadi biryani masala with a perfect balance of spices. This aromatic blend will transport you to the royal kitchens of Nizam.',
        brand: 'BVR Spices',
        category: 'Blends',
        price: 229,
        countInStock: 40,
        rating: 4.7,
        numReviews: 18,
        weight: '100g',
        ingredients: 'Shah Jeera, Mace, Nutmeg, Star Anise, Green Cardamom, Black Cardamom, Bay Leaves, Cinnamon, Cloves, Saffron Strands',
        isBestSeller: true,
        usageTips: 'Use 2 tablespoons for 1kg of rice. Layer between rice and meat for best results.'
    },
];

module.exports = products;
