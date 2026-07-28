import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { PROPERTIES, PRODUCTS } from '../lib/mock-data';
import PropertyCard from '../components/PropertyCard';
import ProductCard from '../components/ProductCard';
import { useGetStarted } from '../App';
import { MagnifyingGlass, MapPin, Buildings, ShieldCheck, Lightning, Globe, ArrowRight, Sparkle } from '@phosphor-icons/react';
import LandAppsSection from '../components/LandAppsSection';

const Home = () => {
  const { openGetStarted } = useGetStarted();
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.set('location', location.trim());
    if (propertyType) params.set('type', propertyType);
    const qs = params.toString();
    navigate(qs ? `/properties?${qs}` : '/properties');
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000"
            alt="Modern Real Estate"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Invest in <span className="text-primary">Nigeria's</span> Premier Real Estate
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Secure, verified property listings and sustainable energy solutions for the modern home. Trust built on technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto" onClick={openGetStarted}>
                Get Started
              </Button>
              <Link to="/properties">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 w-full sm:w-auto">
                  Find a Property
                </Button>
              </Link>
              <Link to="/store">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 w-full sm:w-auto">
                  Explore Energy Solutions
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Quick Search Bar */}
          <div className="mt-16 max-w-4xl bg-white rounded-xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Location</label>
              <div className="flex items-center gap-2 text-gray-900 border-b pb-2">
                <MapPin className="h-5 w-5 text-primary" weight="bold" />
                <input
                  type="text"
                  placeholder="Where are you looking?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="bg-transparent border-none focus:ring-0 w-full text-lg outline-none"
                />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
              <div className="flex items-center gap-2 text-gray-900 border-b pb-2">
                <Buildings className="h-5 w-5 text-primary" weight="bold" />
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 w-full text-lg appearance-none outline-none"
                >
                  <option value="">Any Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <Button className="w-full md:w-auto h-full px-10 text-lg" onClick={handleSearch}>
                <MagnifyingGlass className="h-5 w-5 mr-2" weight="bold" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Verified Listings</h3>
            <p className="text-muted-foreground">Every property undergoes a rigorous multi-step verification process before listing.</p>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Lightning className="h-6 w-6" weight="fill" />
            </div>
            <h3 className="text-xl font-bold">Clean Energy</h3>
            <p className="text-muted-foreground">Seamlessly integrate solar and biogas solutions into your new or existing property.</p>
          </div>
          <div className="space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Globe className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Secure Transactions</h3>
            <p className="text-muted-foreground">Payment gateway integrations with local leaders like Paystack and Flutterwave.</p>
          </div>
        </div>
      </section>

      {/* GOLD City Annex Premium Banner */}
      <section className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950 via-amber-900 to-yellow-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent" />
          <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-16 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                  <Sparkle className="h-5 w-5 text-amber-400" weight="fill" />
                </div>
                <span className="text-amber-400 font-bold tracking-widest text-sm uppercase">Premium Development</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                GOLD City <span className="text-amber-400">Annex</span>
              </h2>
              <p className="text-lg text-amber-100/80 leading-relaxed max-w-xl">
                Prime investment opportunity in the heart of Umuahia. 25 verified and surveyed plots in a secure, access-controlled layout — each with Certificate of Occupancy.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                  <p className="text-2xl font-bold text-amber-400">25</p>
                  <p className="text-xs text-amber-100/70">Plots Available</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                  <p className="text-2xl font-bold text-amber-400">₦3.5M</p>
                  <p className="text-xs text-amber-100/70">Per Plot</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                  <p className="text-2xl font-bold text-amber-400">100%</p>
                  <p className="text-xs text-amber-100/70">Verified</p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                  <p className="text-2xl font-bold text-amber-400">C of O</p>
                  <p className="text-xs text-amber-100/70">Included</p>
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <Link to="/properties/p4">
                  <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 h-14 text-lg">
                    View Details
                  </Button>
                </Link>
                <Link to="/properties">
                  <Button size="lg" variant="outline" className="border-amber-500/30 text-amber-200 hover:bg-white/10 hover:text-white h-14 px-8 text-lg">
                    All Properties
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <img
                src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9cebb6e-cc53-4bde-bbec-8e27656f3e98/gold-city-annex-hero-2f960c2d-1783941561757.webp"
                alt="GOLD City Annex"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-amber-500/30 blur-xl" />
              <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-amber-500/20 blur-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container mx-auto px-4 space-y-8">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Featured Properties</h2>
            <p className="text-muted-foreground text-lg">Hand-picked premium listings for you.</p>
          </div>
          <Link to="/properties" className="text-primary font-semibold flex items-center gap-1 hover:underline">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Energy Store CTA */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-bold tracking-tight leading-tight">
                Power Your Future with Renewable Energy
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We don't just find you a home; we help you sustain it. Explore our curated selection of solar generators, biogas plants, and energy-efficient appliances.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">40%</p>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Cost Savings</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Uninterrupted Power</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/store">
                  <Button size="lg" className="px-10">Visit Energy Store</Button>
                </Link>
                <Link to="/store?category=Accessories">
                  <Button size="lg" variant="outline" className="px-10">Shop Accessories</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {PRODUCTS.slice(0, 2).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Land Apps Section */}
      <LandAppsSection />

      {/* Trust & Performance Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold max-w-3xl mx-auto leading-tight">
            The Secure Way to Real Estate in Nigeria
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-8">
            <div className="space-y-2">
              <p className="text-4xl font-bold">₦10M+</p>
              <p className="text-gray-400">Monthly Revenue Goal</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold">100%</p>
              <p className="text-gray-400">Verified Listings</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold">2.1 AA</p>
              <p className="text-gray-400">Accessibility Standards</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;