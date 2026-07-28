import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../lib/mock-data';
import ProductCard from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Search, ShoppingCart, Zap, Droplets, Sun, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EnergyStore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(
    urlCategory && ['Solar Systems', 'Generators', 'Biogas Plants', 'Accessories'].includes(urlCategory)
      ? urlCategory
      : 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Solar Systems', 'Generators', 'Biogas Plants', 'Accessories'];

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredProducts = useMemo(() => {
    let result = activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const quickCategories = [
    { icon: Sun, label: 'Solar Power', sub: 'Complete home systems', category: 'Solar Systems' },
    { icon: Zap, label: 'Generators', sub: 'Portable solar power', category: 'Generators' },
    { icon: Droplets, label: 'Biogas', sub: 'Clean waste-to-energy', category: 'Biogas Plants' },
    { icon: ShoppingCart, label: 'Accessories', sub: 'Inverters & Batteries', category: 'Accessories' },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Promo Banner */}
      <section className="bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[100px] rounded-full -mr-20 -mt-20" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground">
              New Arrivals
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Sustainable Energy for the Modern Nigerian Home
            </h1>
            <p className="text-xl text-gray-400">
              High-efficiency solar panels, portable generators, and biogas solutions with 5-year warranty and free installation.
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="h-12 px-8" onClick={() => handleCategoryChange('All')}>Shop Now</Button>
              <Button size="lg" variant="outline" className="h-12 px-8 border-white/20 hover:bg-white/10" onClick={() => handleCategoryChange('Accessories')}>
                View Accessories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickCategories.map((qc) => (
            <motion.div
              key={qc.category}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCategoryChange(qc.category)}
              className={`bg-white p-6 rounded-2xl shadow-lg border transition-all cursor-pointer group ${
                activeCategory === qc.category ? 'border-primary ring-2 ring-primary/20' : 'hover:border-primary'
              }`}
            >
              <qc.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold">{qc.label}</h3>
              <p className="text-sm text-muted-foreground">{qc.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="container mx-auto px-4 mt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Categories
              </h3>
              <div className="flex flex-col gap-1">
                {categories.map(cat => (
                  <motion.button
                    key={cat}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleCategoryChange(cat)}
                    className={`text-left px-3 py-2 rounded-md transition-colors ${
                      activeCategory === cat ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">Price Range</h3>
              <div className="flex items-center gap-2">
                <Input placeholder="Min" type="number" />
                <span className="text-muted-foreground">-</span>
                <Input placeholder="Max" type="number" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">Brand</h3>
              <div className="space-y-2">
                {['Lumous', 'Zunera', 'GreenPower', 'SunWay'].map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-muted-foreground" />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Products Area */}
          <main className="flex-1">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                <select className="bg-transparent border-none font-bold text-sm focus:ring-0 cursor-pointer">
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Active filter indicator */}
            {activeCategory !== 'All' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-6"
              >
                <span className="text-sm text-muted-foreground">
                  Showing <span className="font-bold text-foreground">{filteredProducts.length}</span> {activeCategory === 'All' ? 'products' : `products in "${activeCategory}"`}
                </span>
                <button
                  onClick={() => handleCategoryChange('All')}
                  className="text-xs text-primary hover:underline font-medium"
                >
                  Clear filter
                </button>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="col-span-full py-16 text-center text-muted-foreground">
                <p className="text-lg">No products found in this category.</p>
                <Button variant="outline" className="mt-4" onClick={() => handleCategoryChange('All')}>
                  View All Products
                </Button>
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <Button variant="outline" size="lg" className="px-10">Load More Products</Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default EnergyStore;
