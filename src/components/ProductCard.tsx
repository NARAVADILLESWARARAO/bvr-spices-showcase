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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-product group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badge */}
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-secondary text-secondary-foreground font-medium">
            {product.badge}
          </Badge>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Link to={`/products/${product.id}`}>
              <Button
                size="icon"
                variant="secondary"
                className="w-11 h-11 rounded-full shadow-lg"
              >
                <Eye className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <Button
              size="icon"
              className="w-11 h-11 rounded-full shadow-lg"
              onClick={() => addToCart(product)}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {product.category}
        </p>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-heading text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">{product.weight}</p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">₹{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ₹{typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => addToCart(product)}
            className="btn-primary text-xs px-3"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
