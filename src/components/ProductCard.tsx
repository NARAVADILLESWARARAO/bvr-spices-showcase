import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product, useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
      className="group relative"
    >
      {/* Card Body */}
      <div className="bg-white rounded-[2rem] overflow-hidden border border-stone-100 hover:border-secondary/30 transition-all duration-700 hover:shadow-premium group">
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-[4/5] bg-stone-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          
          {/* Glass Overlay (Boutique Style) */}
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-4">
            <Link to={`/products/${product.id}`} className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <Button
                variant="secondary"
                className="rounded-full px-8 bg-white text-stone-900 hover:bg-secondary hover:text-stone-950 font-bold tracking-widest text-xs uppercase"
              >
                View Details
              </Button>
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-stone-950 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 hover:scale-110"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* Gold Foil Badge */}
          {product.badge && (
            <div className="absolute top-5 left-5">
              <div className="bg-gradient-to-br from-secondary via-secondary-foreground to-secondary px-4 py-1.5 rounded-full shadow-lg border border-white/20">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-950">
                  {product.badge}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-8 text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-3 block">
            {product.category}
          </span>
          <Link to={`/products/${product.id}`}>
            <h3 className="font-heading text-xl font-bold text-stone-900 mb-2 group-hover:text-primary transition-colors duration-300">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center justify-center gap-2 mb-6 text-stone-500 text-sm font-light">
            <span>{product.weight}</span>
            <div className="w-1 h-1 rounded-full bg-stone-300" />
            <span>Single Origin</span>
          </div>
          
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-bold text-primary">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-stone-300 line-through font-light">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
