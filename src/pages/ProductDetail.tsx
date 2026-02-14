import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Minus, Plus, ArrowLeft, Check, Leaf, Shield, Package, Loader2, Info, FlaskConical, Utensils } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-stone-950">
        <div className="text-center">
          <h2 className="text-3xl font-heading text-white mb-6">Discovery Failed</h2>
          <Link to="/products">
            <button className="btn-premium">Return to Boutique</button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = allProducts
    ? allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  const tabs = [
    { id: 'description', label: 'The Essence', icon: Info },
    { id: 'ingredients', label: 'Composition', icon: FlaskConical },
    { id: 'usage', label: 'Culinary Use', icon: Utensils },
    { id: 'usage', label: 'Culinary Use', icon: Utensils },
    { id: 'storage', label: 'Preservation', icon: Package },
  ];

  const highlights = [
    { text: "100% Organic", icon: Leaf },
    { text: "Quality Verified", icon: Check },
    { text: "Sustainable", icon: Shield },
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Header */}
      <section className="relative h-[10vh] md:h-[15vh] bg-stone-950 flex items-end pb-8">
        <div className="container-custom">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-stone-400 hover:text-secondary transition-colors text-xs font-bold uppercase tracking-[0.3em]"
          >
            <ArrowLeft className="w-4 h-4" />
            Collection
          </button>
        </div>
      </section>

      {/* Main Detail Section */}
      <section className="py-20 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            {/* Left: Cinematic Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-stone-50 shadow-2xl relative group">
                <motion.img
                  layoutId={`product-image-${product.id}`}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-stone-900/10 transition-opacity group-hover:opacity-0" />
              </div>

              {/* Floating Accents */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-[80px]" />
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/5 rounded-full blur-[100px]" />
            </motion.div>

            {/* Right: Sophisticated Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
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

              <p className="text-stone-500 text-lg font-light leading-relaxed mb-10">
                {product.description}
              </p>


              {/* Interaction Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-16 p-6 rounded-[2rem] bg-stone-50 border border-stone-100">
                <div className="flex items-center gap-4 bg-white rounded-full p-2 border border-stone-200 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-50 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-stone-500" />
                  </button>
                  <span className="w-8 text-center font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-stone-50 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-stone-500" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn-premium flex-1 w-full justify-center !py-6"
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Add to Collection • ₹{product.price * quantity}
                </button>
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
                      <div className="flex items-center gap-2">
                        <tab.icon className="w-3 h-3" />
                        {tab.label}
                      </div>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-stone-50 p-8 rounded-[2rem] border border-stone-100 min-h-[150px]"
                  >
                    <h4 className="font-heading text-lg font-bold text-stone-900 mb-4">{tabs.find(t => t.id === activeTab)?.label}</h4>
                    <p className="text-stone-500 font-light leading-[1.8] text-sm md:text-base">
                      {activeTab === 'description' && product.description}
                      {activeTab === 'ingredients' && (product.ingredients || 'A 100% natural composition of single-origin Indian botanical elements, sustainably sourced.')}
                      {activeTab === 'usage' && (product.usage || 'Elevate your culinary creations by adding this masterpiece during the final stages of cooking to preserve its delicate aromatic profile.')}
                      {activeTab === 'storage' && (product.storage || 'Protect the purity by storing in our bespoke airtight vessels, away from direct sunlight at room temperature.')}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div >
      </section >

      {/* Related Experiences */}
      {
        relatedProducts.length > 0 && (
          <section className="section-padding bg-stone-50">
            <div className="container-custom">
              <div className="flex items-center justify-between mb-12">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-stone-900">
                  Related <span className="text-stone-400 italic">Treasures</span>
                </h2>
                <Link to="/products" className="text-primary font-bold text-xs uppercase tracking-[0.3em] hover:underline underline-offset-8 transition-all">
                  View Boutique
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map((p, index) => (
                  <ProductCard key={p.id} product={p} index={index} />
                ))}
              </div>
            </div>
          </section>
        )
      }
    </div >
  );
};

export default ProductDetail;
