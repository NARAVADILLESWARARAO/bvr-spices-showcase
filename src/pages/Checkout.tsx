import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Package, Truck, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }

    // Fetch latest user profile to pre-fill data
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/users/profile', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        const data = await res.json();
        if (res.ok) {
          // meaningful defaults from profile
          const defaultAddress = data.addresses && data.addresses.length > 0
            ? data.addresses.find((a: any) => a.isDefault) || data.addresses[0]
            : null;

          setFormData(prev => ({
            ...prev,
            firstName: data.name.split(' ')[0] || '',
            lastName: data.name.split(' ').slice(1).join(' ') || '',
            email: data.email || '',
            phone: data.phone || '',
            address: defaultAddress?.street || '',
            city: defaultAddress?.city || '',
            state: defaultAddress?.state || '',
            pincode: defaultAddress?.postalCode || '',
          }));
        }
      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };
    fetchProfile();
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);

      try {
        // Create order
        const orderData = {
          orderItems: items.map(item => ({
            name: item.name,
            qty: item.quantity,
            image: item.image,
            price: item.price,
            product: item.id,
          })),
          shippingAddress: {
            address: formData.address,
            city: formData.city,
            postalCode: formData.pincode,
            country: 'India', // Default or add to form
          },
          paymentMethod: 'Card', // Hardcoded for demo/MVP or selected from UI
          itemsPrice: totalPrice,
          taxPrice: 0,
          shippingPrice: 0,
          totalPrice: totalPrice,
        };

        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(orderData),
        });

        if (!res.ok) throw new Error('Failed to place order');

        const createdOrder = await res.json();

        // Optionally update profile with new address if needed? 
        // User logic: "orders will update into the user profile myorders".
        // This is handled by backend Order creation linking to user.

        setIsSubmitting(false);
        setOrderComplete(true);
        clearCart(); // Clear frontend context cart
      } catch (error) {
        console.error('Order failed', error);
        setIsSubmitting(false);
        // Show error toast?
      }
    }
  };

  const steps = [
    { id: 1, name: 'Information', icon: Package },
    { id: 2, name: 'Shipping', icon: Truck },
    { id: 3, name: 'Payment', icon: CreditCard },
  ];

  if (items.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg mx-auto p-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-primary-foreground" />
          </motion.div>
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-muted-foreground mb-2">
            Order #BVR{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <p className="text-muted-foreground mb-8">
            Thank you for choosing BVR Spices! We've received your order and will
            send you a confirmation email shortly.
          </p>
          <div className="bg-card rounded-xl p-6 mb-8">
            <p className="text-secondary font-heading font-semibold text-lg">
              "Taste You Can Trust"
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Your spices will be freshly packed and shipped within 24 hours.
            </p>
          </div>
          <Link to="/">
            <Button size="lg">
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-card border-b border-border py-6">
        <div className="container-custom">
          <div className="flex items-center gap-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Checkout
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-6 gap-4">
            {steps.map((s, index) => (
              <div key={s.id} className="flex items-center">
                <motion.div
                  animate={{
                    scale: step >= s.id ? 1 : 0.9,
                    opacity: step >= s.id ? 1 : 0.5,
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${step >= s.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                >
                  {step > s.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <s.icon className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium hidden sm:inline">{s.name}</span>
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 ${step > s.id ? 'bg-primary' : 'bg-muted'
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card rounded-xl p-6 md:p-8"
                >
                  {step === 1 && (
                    <>
                      <h2 className="font-heading text-xl font-bold mb-6">
                        Customer Information
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="input-styled"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="input-styled"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="input-styled"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="input-styled"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <h2 className="font-heading text-xl font-bold mb-6">
                        Delivery Address
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="input-styled"
                            placeholder="House/Flat No., Street, Landmark"
                            required
                          />
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">City</label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="input-styled"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">State</label>
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              className="input-styled"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">PIN Code</label>
                            <input
                              type="text"
                              name="pincode"
                              value={formData.pincode}
                              onChange={handleInputChange}
                              className="input-styled"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <h2 className="font-heading text-xl font-bold mb-6">
                        Payment (Demo)
                      </h2>
                      <div className="bg-muted rounded-lg p-6 text-center">
                        <CreditCard className="w-12 h-12 mx-auto mb-4 text-primary" />
                        <p className="text-muted-foreground mb-4">
                          This is a demo checkout. No real payment will be processed.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                          <div className="px-4 py-2 bg-card rounded-lg border border-border">
                            Credit Card
                          </div>
                          <div className="px-4 py-2 bg-card rounded-lg border border-border">
                            UPI
                          </div>
                          <div className="px-4 py-2 bg-card rounded-lg border border-border">
                            Net Banking
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-4 mt-8">
                    {step > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(step - 1)}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Processing...'
                      ) : step === 3 ? (
                        'Place Order'
                      ) : (
                        'Continue'
                      )}
                    </Button>
                  </div>
                </motion.div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 sticky top-24">
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-primary">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">₹{totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
