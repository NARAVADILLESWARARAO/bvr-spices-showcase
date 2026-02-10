import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Leaf, Package, Star, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const Home = () => {
  const { data: products, isLoading } = useProducts();
  const bestsellers = products?.filter(p => p.badge === 'Bestseller').slice(0, 4) || [];

  const trustIndicators = [
    { icon: Leaf, title: '100% Natural', description: 'No artificial additives or preservatives' },
    { icon: Shield, title: 'Premium Quality', description: 'Rigorous quality testing standards' },
    { icon: Package, title: 'Hygienic Packing', description: 'Sealed for freshness & purity' },
    { icon: Star, title: 'Authentic Taste', description: 'Traditional Indian recipes' },
  ];

  const qualityBadges = [
    { icon: CheckCircle, text: 'Quality Checked' },
    { icon: CheckCircle, text: 'Trusted by 10,000+ Families' },
    { icon: CheckCircle, text: 'Made in India' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary to-accent">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block mb-6"
              >
                <span className="bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium">
                  Premium Quality Since 2010
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6"
              >
                Experience the
                <span className="block text-secondary">Rich Flavors</span>
                of India
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-lg mx-auto lg:mx-0"
              >
                Pure • Authentic • Trusted Spices from BVR Spices. Bringing the
                essence of traditional Indian cooking to your kitchen.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/products">
                  <Button variant="hero" size="lg" className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Shop Now
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="heroOutline" size="lg" className="w-full sm:w-auto">
                    Explore Products
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block relative"
            >
              <div className="relative">
                <motion.img
                  src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=600&fit=crop"
                  alt="Premium Indian Spices"
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-background p-4 rounded-xl shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-secondary fill-secondary" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">4.9/5 Rating</p>
                      <p className="text-sm text-muted-foreground">5000+ Reviews</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {trustIndicators.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <item.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestselling Products */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Our Collection
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
              Bestselling Spices
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most loved spices, carefully selected and packed to bring
              authentic flavors to your kitchen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <div className="col-span-full flex justify-center py-10">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : (
              bestsellers.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/products">
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                Our Promise
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Why Choose BVR Spices?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-1">Traditional Sourcing</h3>
                    <p className="text-muted-foreground">
                      We source our spices directly from trusted farmers across India,
                      ensuring freshness and authenticity in every batch.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-1">Quality Testing</h3>
                    <p className="text-muted-foreground">
                      Every batch undergoes rigorous quality checks to ensure purity,
                      flavor, and freedom from contaminants.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-1">Careful Packaging</h3>
                    <p className="text-muted-foreground">
                      Our spices are hygienically packed in airtight containers to
                      preserve freshness and extend shelf life.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&h=500&fit=crop"
                alt="Spice Processing"
                className="w-full rounded-2xl shadow-card"
              />
              <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-6 rounded-xl shadow-lg max-w-[200px]">
                <p className="font-heading text-3xl font-bold">14+</p>
                <p className="text-sm">Years of Trust & Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Assurance */}
      <section className="py-12 bg-background border-y border-border">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {qualityBadges.map((badge, index) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <badge.icon className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">{badge.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Bring Home the Taste of Purity
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Experience the difference that quality makes. Order now and taste
              the authentic flavors of India.
            </p>
            <Link to="/products">
              <Button variant="cta" size="xl">
                Buy Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
