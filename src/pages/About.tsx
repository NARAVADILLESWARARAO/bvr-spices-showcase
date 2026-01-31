import { motion } from 'framer-motion';
import { Leaf, Shield, Package, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  const processSteps = [
    {
      step: 1,
      title: 'Sourcing',
      description: 'We source our spices directly from trusted farmers across India who follow traditional farming methods.',
      icon: Leaf,
    },
    {
      step: 2,
      title: 'Grinding',
      description: 'Using state-of-the-art machinery while preserving traditional grinding techniques for optimal flavor.',
      icon: Package,
    },
    {
      step: 3,
      title: 'Packing',
      description: 'Hygienically packed in airtight containers to preserve freshness and extend shelf life.',
      icon: Package,
    },
    {
      step: 4,
      title: 'Quality Check',
      description: 'Every batch undergoes rigorous testing for purity, flavor, and freedom from contaminants.',
      icon: Shield,
    },
  ];

  const values = [
    { icon: Leaf, title: 'Purity', description: '100% natural ingredients with no additives' },
    { icon: Shield, title: 'Quality', description: 'Rigorous testing at every stage' },
    { icon: Award, title: 'Trust', description: 'Loved by thousands of families' },
    { icon: CheckCircle, title: 'Consistency', description: 'Same great taste, every time' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-20 md:py-28">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              Our Story
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6">
              Bringing India's Finest Spices to Your Kitchen
            </h1>
            <p className="text-muted-foreground text-lg">
              For over 14 years, BVR Spices has been on a mission to deliver the most 
              authentic, pure, and flavorful spices to Indian households.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=500&fit=crop"
                alt="BVR Spices Story"
                className="w-full rounded-2xl shadow-card"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                Since 2010
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                A Legacy of Flavor & Trust
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  BVR Spices was born from a simple observation – Indian families 
                  deserved better access to pure, authentic spices that reminded them 
                  of their grandmothers' cooking.
                </p>
                <p>
                  What started as a small family venture in Chennai has grown into 
                  a trusted brand serving thousands of households across India. Our 
                  founder's vision was clear: bring the taste of traditional Indian 
                  spices to modern kitchens without compromising on quality.
                </p>
                <p>
                  Today, we continue to honor that vision by carefully sourcing, 
                  processing, and packaging our spices with the same love and attention 
                  to detail that defined our humble beginnings.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              How We Work
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Our Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From farm to your kitchen, every step is carefully monitored to ensure 
              the highest quality spices reach your table.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-background rounded-xl p-6 h-full border border-border hover:border-primary/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold">{step.step}</span>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-secondary font-medium text-sm uppercase tracking-wider">
              What We Stand For
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Our Promise to You
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-card hover:shadow-card transition-shadow"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
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
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Experience the BVR Difference
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of happy customers who have made BVR Spices a part of 
              their daily cooking.
            </p>
            <Link to="/products">
              <Button variant="cta" size="xl">
                Shop Our Collection
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
