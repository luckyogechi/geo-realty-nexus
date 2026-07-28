import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import GetStartedModal from './components/GetStartedModal';
import { Toaster } from './components/ui/sonner';
import Home from './pages/Home';
import PropertyListings from './pages/PropertyListings';
import PropertyDetail from './pages/PropertyDetail';
import EnergyStore from './pages/EnergyStore';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import BiogasProducts from './pages/BiogasProducts';
import About from './pages/About';
import Contact from './pages/Contact';

// Global context for onboarding modal
const GetStartedContext = React.createContext<{
  openGetStarted: () => void;
}>({ openGetStarted: () => {} });

export const useGetStarted = () => React.useContext(GetStartedContext);

function App() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  const openGetStarted = useCallback(() => setIsGetStartedOpen(true), []);
  const closeGetStarted = useCallback(() => setIsGetStartedOpen(false), []);

  return (
    <GetStartedContext.Provider value={{ openGetStarted }}>
      <Router>
        <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<PropertyListings />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/store" element={<EnergyStore />} />
              <Route path="/store/:id" element={<ProductDetail />} />
              <Route path="/dashboard/*" element={<Dashboard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/biogas" element={<BiogasProducts />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
        </Layout>
        <GetStartedModal open={isGetStartedOpen} onClose={closeGetStarted} />
        <Toaster position="top-right" richColors />
      </Router>
    </GetStartedContext.Provider>
  );
}

export default App;