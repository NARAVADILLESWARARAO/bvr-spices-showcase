import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Minus, Plus, ArrowLeft, Check, Leaf, Shield, Package, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useProduct, useProducts } from '@/hooks/useProducts'; // Assuming useProducts is needed for related items
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { data: product, isLoading, error } = useProduct(id || '');
  const { data: allProducts } = useProducts();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = allProducts
    ? allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'usage', label: 'Usage Tips' },
    { id: 'storage', label: 'Storage' },
  ];

  const highlights = [
    { icon: Leaf, text: 'No artificial colors' },
    { icon: Shield, text: 'Freshly ground' },
    { icon: Package, text: 'Sealed for freshness' },
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="section-padding">
        <div className="container-custom">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {product.badge && (
                <span className="absolute top-4 left-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-medium">
                  {product.badge}
                </span>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                {product.category}
              </span>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">₹{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice}
                    </span>
                    <span className="text-sm bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="text-muted-foreground mb-4">{product.weight}</p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-3 mb-8">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.text}
                    className="flex items-center gap-2 bg-card px-4 py-2 rounded-full"
                  >
                    <highlight.icon className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{highlight.text}</span>
                  </div>
                ))}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-6 mb-8">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-3 bg-card rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                size="xl"
                className="w-full md:w-auto btn-primary"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart - ₹{(product.price * quantity).toFixed(2)}
              </Button>

              {/* Tabs */}
              <div className="mt-12">
                <div className="flex border-b border-border overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors relative ${activeTab === tab.id
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="py-6"
                  >
                    {activeTab === 'description' && (
                      <p className="text-muted-foreground leading-relaxed">
                        {product.description}
                      </p>
                    )}
                    {activeTab === 'ingredients' && (
                      <p className="text-muted-foreground leading-relaxed">
                        {product.ingredients || 'Information not available'}
                      </p>
                    )}
                    {activeTab === 'usage' && (
                      <p className="text-muted-foreground leading-relaxed">
                        {product.usage || 'Information not available'}
                      </p>
                    )}
                    {activeTab === 'storage' && (
                      <p className="text-muted-foreground leading-relaxed">
                        {product.storage || 'Information not available'}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Quality Promise */}
              <div className="bg-card rounded-xl p-6 mt-6">
                <div className="flex items-start gap-3">
                  <Check className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-semibold mb-1">BVR Quality Promise</h4>
                    <p className="text-sm text-muted-foreground">
                      Every product from BVR Spices undergoes rigorous quality checks to ensure
                      purity, freshness, and authentic taste. We guarantee 100% natural ingredients
                      with no preservatives or artificial additives.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding bg-card">
          <div className="container-custom">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
