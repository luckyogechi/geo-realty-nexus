import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted mt-20 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Home className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Land<span className="text-primary">&</span>Trust
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Nigeria's leading platform for secure real estate transactions and renewable energy solutions. We bridge the gap between trust and technology.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/properties" className="hover:text-primary transition-colors">Property Listings</Link></li>
              <li><Link to="/store" className="hover:text-primary transition-colors">Renewable Energy Store</Link></li>
              <li><Link to="/biogas" className="hover:text-primary transition-colors">Biogas Products</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Verifier Dashboard</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Property Verification</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Payment Methods</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Info</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>123 Victoria Island, Lagos, Nigeria</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+234 800 LAND TRUST</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>info@landandtrust.ng</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2023 Land and Trust Nigeria (a subsidiary of Landbusiness Transact Nigeria). All rights reserved.</p>
          <div className="flex gap-6">
            <span className="flex items-center gap-1">WCAG 2.1 AA Compliant</span>
            <span className="flex items-center gap-1">SEC Licensed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;