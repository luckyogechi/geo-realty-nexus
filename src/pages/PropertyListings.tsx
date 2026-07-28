import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PROPERTIES } from '../lib/mock-data';
import PropertyCard from '../components/PropertyCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Slider } from '../components/ui/slider';
import { Search, Map as MapIcon, Filter, X, ChevronDown, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const PropertyListings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500000000]);
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [searchInput, setSearchInput] = useState(searchParams.get('location') || '');
  const [bedroomsFilter, setBedroomsFilter] = useState<string>('Any');

  // Extract query params
  const locationParam = searchParams.get('location') || '';
  const typeParam = searchParams.get('type') || '';

  // Filter properties based on URL params and local search
  const filteredProperties = useMemo(() => {
    let filtered = [...PROPERTIES];

    // Search by keyword (title, description, location)
    const searchQuery = searchInput || locationParam;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q)
      );
    }

    // Filter by property type
    if (typeParam) {
      filtered = filtered.filter((p) =>
        p.category === typeParam
      );
    }

    // Filter by bedrooms
    if (bedroomsFilter !== 'Any') {
      const minBeds = parseInt(bedroomsFilter.replace('+', ''));
      filtered = filtered.filter((p) => p.beds >= minBeds);
    }

    // Price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    return filtered;
  }, [locationParam, typeParam, searchInput, priceRange, bedroomsFilter]);

  // Sync search input to URL params
  const handleSearchSubmit = () => {
    const params = new URLSearchParams();
    if (searchInput.trim()) params.set('location', searchInput.trim());
    if (typeParam) params.set('type', typeParam);
    setSearchParams(params, { replace: true });
  };

  const handleClearFilters = () => {
    setSearchParams({}, { replace: true });
    setSearchInput('');
    setPriceRange([0, 500000000]);
    setBedroomsFilter('Any');
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Search & Filter Header */}
      <div className="bg-white border-b sticky top-16 z-40 px-4 py-4">
        <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by location, title, or keywords..."
              className="pl-10 h-12 bg-muted/50 border-none focus-visible:ring-primary"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              className="h-12 gap-2 flex-1 md:flex-none"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" /> Filters
            </Button>
            <div className="flex bg-muted p-1 rounded-lg">
              <Button
                variant={view === 'grid' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-10"
                onClick={() => setView('grid')}
              >
                Grid
              </Button>
              <Button
                variant={view === 'map' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-10 gap-1"
                onClick={() => setView('map')}
              >
                <MapIcon className="h-4 w-4" /> Map
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* GOLD City Featured Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-950 via-amber-900 to-yellow-950 text-white mx-4 mt-6 mb-6 p-6 md:p-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent" />
        <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm tracking-widest uppercase">Premium Development</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold">GOLD City Annex</h3>
            <p className="text-amber-100/80 text-sm max-w-lg">
              25 verified plots available in Ubani Ibeku, Umuahia. Each plot comes with C of O. Starting at ₦3.5M per plot.
            </p>
            <div className="flex gap-3">
              <Link to="/properties/p4">
                <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
                  View Details
                </Button>
              </Link>
              <Link to="/properties?category=gold">
                <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-md transition-all">
                  Browse Plots
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6 ml-auto">
            {[
              { label: 'Plots', value: '25' },
              { label: 'Price', value: '₦3.5M' },
              { label: 'C of O', value: '✓' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl md:text-2xl font-bold text-amber-400">{stat.value}</p>
                <p className="text-xs text-amber-100/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (Desktop) */}
          <aside className={`lg:w-80 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary h-8 px-2"
                  onClick={handleClearFilters}
                >
                  Clear All
                </Button>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold">Property Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {['House', 'Apartment', 'Land', 'Office'].map(type => {
                    const typeValue = type.toLowerCase();
                    const isActive = typeParam === typeValue;
                    return (
                      <Button
                        key={type}
                        variant={isActive ? 'default' : 'outline'}
                        size="sm"
                        className="justify-start font-normal"
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          if (isActive) {
                            params.delete('type');
                          } else {
                            params.set('type', typeValue);
                          }
                          setSearchParams(params, { replace: true });
                        }}
                      >
                        {type}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold">Price Range</label>
                  <span className="text-xs text-muted-foreground">₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}</span>
                </div>
                <Slider
                  defaultValue={[0, 500000000]}
                  max={500000000}
                  step={1000000}
                  onValueChange={setPriceRange}
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-semibold">Bedrooms</label>
                <div className="flex gap-2">
                  {['Any', '1+', '2+', '3+', '4+'].map(num => (
                    <Button 
                      key={num} 
                      variant={bedroomsFilter === num ? 'default' : 'outline'} 
                      size="sm" 
                      className="flex-1 px-0"
                      onClick={() => setBedroomsFilter(num)}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-xl border border-primary/20">
              <h4 className="font-bold mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-4">Our property experts are available 24/7 to help you find your dream home.</p>
              <Button className="w-full">Chat with Agent</Button>
            </div>
          </aside>

          {/* Listings Grid / Map */}
          <main className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {filteredProperties.length}
                {filteredProperties.length === 1 ? ' Property' : ' Properties'} Found
                {(locationParam || typeParam) && (
                  <span className="text-base font-normal text-muted-foreground ml-2">
                    {locationParam && `in "${locationParam}"`}
                    {locationParam && typeParam && ' · '}
                    {typeParam && `${typeParam}`}
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Sort by:
                <Button variant="ghost" size="sm" className="font-semibold text-foreground gap-1">
                  Newest <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-xl border p-12 text-center space-y-4">
                <div className="h-16 w-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No Properties Found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {locationParam || typeParam
                    ? `No properties match your search for "${locationParam}${typeParam ? ` · ${typeParam}` : ''}". Try adjusting your filters or search terms.`
                    : 'No properties match your current filters. Try adjusting your search criteria.'}
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border h-[600px] flex items-center justify-center relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200"
                  alt="Map Placeholder"
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 text-center p-8">
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Interactive Map View</h3>
                  <p className="text-muted-foreground max-w-md">Integrating Mapbox GL JS for dynamic cluster markers and real-time property pins.</p>
                  <Button onClick={() => setView('grid')}>Back to Grid</Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PropertyListings;