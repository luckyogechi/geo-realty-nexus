import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, BIOGAS_PRODUCTS } from '../lib/mock-data';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

const ALL_PRODUCTS = [...PRODUCTS, ...BIOGAS_PRODUCTS];
const CART_STORAGE_KEY = 'land_trust_cart';

const loadCart = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [{ ...ALL_PRODUCTS[0], quantity: 1 }];
};

const Cart = () => {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast.info('Item removed from cart');
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.075; // 7.5% VAT
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-6">
        <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        </div>
        <Link to="/store">
          <Button size="lg" className="px-10">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <Card key={item.id} className="border-none shadow-sm overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="h-24 w-24 bg-muted rounded-xl flex-shrink-0 p-4">
                      <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="flex-grow space-y-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                        <div className="flex items-center border rounded-lg h-9">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="px-3 hover:bg-muted transition-colors"
                          ><Minus className="h-3 w-3" /></button>
                          <span className="px-3 text-sm font-bold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="px-3 hover:bg-muted transition-colors"
                          ><Plus className="h-3 w-3" /></button>
                        </div>
                        <p className="font-bold text-primary">₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="pt-4">
              <Link to="/store">
                <Button variant="ghost" className="gap-2">
                  <ArrowRight className="h-4 w-4 rotate-180" /> Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border shadow-md">
              <CardContent className="p-6 space-y-6">
                <h3 className="font-bold text-xl border-b pb-4">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">VAT (7.5%)</span>
                    <span className="font-bold">₦{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-600 font-bold uppercase tracking-tighter">Calculated at Checkout</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="text-2xl font-bold text-primary">₦{total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Coupon Code</label>
                    <div className="flex gap-2">
                      <Input placeholder="Enter code" className="h-10" />
                      <Button variant="outline" className="h-10">Apply</Button>
                    </div>
                  </div>
                  <Link to="/checkout" className="block">
                    <Button className="w-full h-12 text-lg">Proceed to Checkout</Button>
                  </Link>
                </div>

                <div className="pt-4 flex flex-col items-center gap-4 border-t">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-center">Secure checkout via Paystack</p>
                  <div className="flex gap-4 opacity-50 grayscale">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 mt-1" />
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

export default Cart;