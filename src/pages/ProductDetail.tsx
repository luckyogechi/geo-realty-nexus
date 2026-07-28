import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../lib/mock-data';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCcw, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const product = PRODUCTS.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="p-20 text-center">Product not found</div>;
  }

  const addToCart = () => {
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-white border-b py-4 mb-8">
        <div className="container mx-auto px-4">
          <Link to="/store" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Store
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl bg-muted overflow-hidden border p-8">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square rounded-xl bg-muted border overflow-hidden cursor-pointer hover:border-primary transition-colors">
                  <img src={product.image} alt="Thumbnail" className="w-full h-full object-contain p-2" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="capitalize">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className={`h-4 w-4 ${i <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                  ))}
                  <span className="font-bold ml-1">{product.rating}</span>
                </div>
                <span className="text-muted-foreground text-sm">|</span>
                <span className="text-muted-foreground text-sm">{product.reviews} Customer Reviews</span>
              </div>
              <p className="text-3xl font-bold text-primary">₦{product.price.toLocaleString()}</p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg h-12">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 h-full hover:bg-muted transition-colors font-bold"
                  >-</button>
                  <span className="px-4 font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 h-full hover:bg-muted transition-colors font-bold"
                  >+</button>
                </div>
                <Button onClick={addToCart} className="flex-1 h-12 text-lg gap-2">
                  <ShoppingCart className="h-5 w-5" /> Add to Cart
                </Button>
              </div>
              <Button variant="outline" className="w-full h-12">Buy Now</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <Truck className="h-5 w-5 text-primary" />
                <div className="text-xs">
                  <p className="font-bold uppercase tracking-wider">Free Shipping</p>
                  <p className="text-muted-foreground">Orders over ₦500k</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div className="text-xs">
                  <p className="font-bold uppercase tracking-wider">Warranty</p>
                  <p className="text-muted-foreground">5 Year Full Cover</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl">
                <RefreshCcw className="h-5 w-5 text-primary" />
                <div className="text-xs">
                  <p className="font-bold uppercase tracking-wider">Return Policy</p>
                  <p className="text-muted-foreground">30-day Easy Return</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs */}
        <div className="mt-20">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-12 p-0 gap-8">
              <TabsTrigger 
                value="specifications" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent px-0 font-bold uppercase tracking-wider h-full"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger 
                value="description"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent px-0 font-bold uppercase tracking-wider h-full"
              >
                Product Details
              </TabsTrigger>
              <TabsTrigger 
                value="reviews"
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none bg-transparent px-0 font-bold uppercase tracking-wider h-full"
              >
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="py-8">
              <div className="max-w-2xl divide-y border rounded-xl overflow-hidden">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex p-4 odd:bg-muted/30">
                    <span className="w-1/3 font-bold text-muted-foreground">{key}</span>
                    <span className="flex-1 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="description" className="py-8 space-y-4 max-w-4xl text-muted-foreground leading-relaxed">
              <p>The {product.name} is a high-performance solution designed specifically for the Nigerian environment. It features advanced technology that ensures maximum energy conversion and reliability even in challenging weather conditions.</p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Professional installation included by certified Land & Trust engineers.</li>
                <li>Real-time monitoring via mobile app (iOS & Android).</li>
                <li>Scalable architecture - add more capacity whenever needed.</li>
                <li>Built-in surge protection and voltage regulation.</li>
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="py-8">
              <div className="space-y-8">
                {[1, 2].map(i => (
                  <div key={i} className="flex gap-4 border-b pb-8">
                    <div className="h-12 w-12 rounded-full bg-muted shrink-0" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">Customer Name</span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(star => <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">"Excellent product, has really changed how we power our home. Installation was smooth."</p>
                      <p className="text-xs text-muted-foreground">Verified Purchase • Nov 10, 2023</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline">Write a Review</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
