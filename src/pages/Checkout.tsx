import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CircleCheck, CreditCard, Landmark, Phone, QrCode, 
  Truck, ShieldCheck, ArrowRight, ArrowLeft, PackageCheck, PartyPopper 
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const steps = ['Information', 'Shipping', 'Payment', 'Review'];
const CART_STORAGE_KEY = 'land_trust_cart';
const ORDERS_STORAGE_KEY = 'land_trust_orders';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ShippingInfo {
  street: string;
  city: string;
  state: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Form state
  const [contact, setContact] = useState<ContactInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  const [shipping, setShipping] = useState<ShippingInfo>({
    street: '',
    city: '',
    state: ''
  });

  // Load cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping_fee = 0; // Free shipping
  const tax = subtotal * 0.075; // 7.5% VAT
  const total = subtotal + shipping_fee + tax;

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const handleNext = () => {
    // Validation
    if (currentStep === 0) {
      if (!contact.firstName || !contact.lastName || !contact.email || !contact.phone) {
        toast.error('Please fill in all contact information');
        return;
      }
    }
    
    if (currentStep === 1) {
      if (!shipping.street || !shipping.city || !shipping.state) {
        toast.error('Please fill in all shipping details');
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Place order
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = () => {
    const newOrderId = `ORD-${Date.now()}`;
    const order = {
      id: newOrderId,
      date: new Date().toISOString(),
      items: cartItems,
      contact,
      shipping,
      paymentMethod,
      subtotal,
      shipping_fee,
      tax,
      total,
      status: 'pending'
    };

    // Save order to localStorage
    try {
      const existingOrders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      existingOrders.push(order);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existingOrders));
      
      // Clear cart
      localStorage.removeItem(CART_STORAGE_KEY);
      
      setOrderId(newOrderId);
      setOrderPlaced(true);
      localStorage.setItem('land_trust_has_purchased', 'true');
      toast.success('Order placed successfully! You can now download the Land Apps!');
    } catch (error) {
      toast.error('Failed to save order. Please try again.');
      console.error('Failed to save order:', error);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Order Success Screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl w-full"
        >
          <Card className="border-2 shadow-2xl overflow-hidden">
            <CardContent className="p-12 text-center space-y-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mx-auto h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center"
              >
                <PartyPopper className="h-12 w-12 text-primary" />
              </motion.div>
              
              <div className="space-y-4">
                <h1 className="text-4xl font-bold">Order Confirmed!</h1>
                <p className="text-lg text-muted-foreground">
                  Thank you for your purchase. Your order has been received and is being processed.
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase text-muted-foreground">Order ID</span>
                  <Badge variant="outline" className="font-mono text-sm">{orderId}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase text-muted-foreground">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">{formatCurrency(total)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase text-muted-foreground">Status</span>
                  <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20">
                    Processing
                  </Badge>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to <strong>{contact.email}</strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="h-12 px-8"
                  >
                    View Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/store')}
                    className="h-12 px-8"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Empty cart check
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center px-4 py-12">
        <Card className="max-w-md w-full border shadow-md">
          <CardContent className="p-12 text-center space-y-6">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <PackageCheck className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Your cart is empty</h2>
              <p className="text-muted-foreground">Add some items to your cart before checking out.</p>
            </div>
            <Button onClick={() => navigate('/store')} className="h-12 px-8">
              Browse Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Progress Stepper */}
        <div className="relative mb-12 flex justify-between max-w-2xl mx-auto">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 z-0" />
          <motion.div 
            className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0"
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
          {steps.map((step, i) => (
            <div key={step} className="relative z-10 flex flex-col items-center gap-2">
              <motion.div
                animate={{
                  backgroundColor: i <= currentStep ? 'hsl(var(--primary))' : 'white',
                  borderColor: i <= currentStep ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                }}
                transition={{ duration: 0.3 }}
                className="h-10 w-10 rounded-full flex items-center justify-center border-4"
              >
                {i < currentStep ? (
                  <CircleCheck className="h-5 w-5 text-primary-foreground" />
                ) : (
                  <span className={i <= currentStep ? 'text-primary-foreground' : 'text-muted-foreground'}>
                    {i + 1}
                  </span>
                )}
              </motion.div>
              <span className={`text-xs font-bold uppercase tracking-widest ${
                i <= currentStep ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border shadow-md">
              <CardContent className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentStep === 0 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase">First Name</label>
                            <Input 
                              placeholder="John" 
                              value={contact.firstName}
                              onChange={(e) => setContact({...contact, firstName: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase">Last Name</label>
                            <Input 
                              placeholder="Doe" 
                              value={contact.lastName}
                              onChange={(e) => setContact({...contact, lastName: e.target.value})}
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-bold uppercase">Email Address</label>
                            <Input 
                              placeholder="john@example.com" 
                              type="email"
                              value={contact.email}
                              onChange={(e) => setContact({...contact, email: e.target.value})}
                            />
                          </div>
                          <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-bold uppercase">Phone Number</label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 border border-r-0 rounded-l-md bg-muted text-sm">+234</span>
                              <Input 
                                className="rounded-l-none" 
                                placeholder="801 234 5678"
                                value={contact.phone}
                                onChange={(e) => setContact({...contact, phone: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Shipping Details</h2>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase">Street Address</label>
                            <Input 
                              placeholder="123 Victoria Island"
                              value={shipping.street}
                              onChange={(e) => setShipping({...shipping, street: e.target.value})}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase">City</label>
                              <Input 
                                placeholder="Lagos"
                                value={shipping.city}
                                onChange={(e) => setShipping({...shipping, city: e.target.value})}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase">State</label>
                              <Input 
                                placeholder="Lagos State"
                                value={shipping.state}
                                onChange={(e) => setShipping({...shipping, state: e.target.value})}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 flex gap-4">
                          <Truck className="h-6 w-6 text-primary shrink-0" />
                          <div>
                            <p className="font-bold text-sm">Professional Installation Included</p>
                            <p className="text-xs text-muted-foreground">Certified engineers will handle the setup of your energy system.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Payment Method</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            { id: 'card', label: 'Debit/Credit Card', icon: CreditCard },
                            { id: 'transfer', label: 'Bank Transfer', icon: Landmark },
                            { id: 'ussd', label: 'USSD Code', icon: Phone },
                            { id: 'qr', label: 'QR Payment', icon: QrCode },
                          ].map(method => (
                            <button
                              key={method.id}
                              onClick={() => setPaymentMethod(method.id)}
                              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                                paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
                              }`}
                            >
                              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                                paymentMethod === method.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                              }`}>
                                <method.icon className="h-5 w-5" />
                              </div>
                              <span className="font-bold text-sm">{method.label}</span>
                            </button>
                          ))}
                        </div>
                        
                        {paymentMethod === 'card' && (
                          <div className="space-y-4 pt-4 border-t">
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase">Card Number</label>
                              <Input placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-xs font-bold uppercase">Expiry</label>
                                <Input placeholder="MM / YY" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold uppercase">CVV</label>
                                <Input placeholder="123" type="password" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Review Your Order</h2>
                        
                        {/* Contact Info */}
                        <div className="py-4 flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="text-xs font-bold uppercase text-muted-foreground">Contact</p>
                            <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                            <p className="text-sm text-muted-foreground">{contact.email}</p>
                            <p className="text-sm text-muted-foreground">+234 {contact.phone}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setCurrentStep(0)}>Edit</Button>
                        </div>

                        {/* Shipping Info */}
                        <div className="py-4 flex justify-between items-start border-t">
                          <div className="space-y-1">
                            <p className="text-xs font-bold uppercase text-muted-foreground">Shipping to</p>
                            <p className="font-medium">{shipping.street}</p>
                            <p className="text-sm text-muted-foreground">{shipping.city}, {shipping.state}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>Edit</Button>
                        </div>

                        {/* Payment Method */}
                        <div className="py-4 flex justify-between items-start border-t">
                          <div className="space-y-1">
                            <p className="text-xs font-bold uppercase text-muted-foreground">Payment Method</p>
                            <p className="font-medium capitalize">
                              {paymentMethod === 'card' ? 'Debit/Credit Card' : 
                               paymentMethod === 'transfer' ? 'Bank Transfer' :
                               paymentMethod === 'ussd' ? 'USSD Code' : 'QR Payment'}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setCurrentStep(2)}>Edit</Button>
                        </div>

                        {/* Order Items */}
                        <div className="py-4 border-t space-y-3">
                          <p className="text-xs font-bold uppercase text-muted-foreground">Order Items</p>
                          <div className="space-y-3">
                            {cartItems.map(item => (
                              <div key={item.id} className="flex items-center gap-3">
                                <div className="h-12 w-12 bg-muted rounded-lg p-2 shrink-0">
                                  <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                                </div>
                                <div className="flex-grow">
                                  <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-bold text-sm">{formatCurrency(item.price * item.quantity)}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-4 bg-muted/50 rounded-xl flex items-center gap-4">
                          <ShieldCheck className="h-5 w-5 text-green-600" />
                          <p className="text-xs text-muted-foreground">Your transaction is encrypted and secured by industrial-grade protection.</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-12 flex justify-between gap-4">
                  {currentStep > 0 ? (
                    <Button variant="outline" onClick={handleBack} className="h-12 px-8 gap-2">
                      <ArrowLeft className="h-4 w-4" /> Back
                    </Button>
                  ) : <div></div>}
                  <Button onClick={handleNext} className="h-12 px-10 gap-2">
                    {currentStep === steps.length - 1 ? 'Place Order' : 'Continue'} <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Summary */}
          <div className="space-y-6">
            <Card className="border shadow-md sticky top-32">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-bold text-lg border-b pb-4">In your cart</h3>
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-16 w-16 bg-muted rounded-lg p-2 shrink-0">
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-primary mt-1">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2 pt-6 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-bold uppercase tracking-tighter">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">VAT (7.5%)</span>
                    <span className="font-bold">{formatCurrency(tax)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="text-xl font-bold text-primary">{formatCurrency(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;