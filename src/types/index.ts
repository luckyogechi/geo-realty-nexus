export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: 'sale' | 'rent' | 'lease';
  category: 'house' | 'apartment' | 'land' | 'commercial';
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  verified: boolean;
  description: string;
  amenities: string[];
  status?: string;
  plotsAvailable?: number;
  priceLabel?: string;
  agent: {
    name: string;
    image: string;
    phone: string;
    email: string;
  };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  specifications: Record<string, string>;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: 'successful' | 'pending' | 'failed';
  method: string;
  propertyTitle: string;
}

export interface VerificationTask {
  id: string;
  propertyTitle: string;
  status: 'pending' | 'approved' | 'rejected';
  assignedTo: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface LandApp {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'gis-mapping' | 'soil-agtech' | 'zoning' | 'drone-surveying' | 'forestry' | 'valuation' | 'cadastral';
  categoryLabel: string;
  rating: number;
  reviewsCount: number;
  icon: string;
  bannerImage: string;
  screenshots: string[];
  developer: string;
  developerUrl: string;
  version: string;
  size: string;
  lastUpdated: string;
  installed: boolean;
  status: 'available' | 'installing' | 'installed' | 'update_available';
  pricing: 'Free' | 'Freemium' | 'Subscription';
  tags: string[];
  features: string[];
  permissions: string[];
  documentationUrl: string;
  accentColor: string;
}

export interface AppConfig {
  notificationsEnabled: boolean;
  autoSync: boolean;
  apiKey: string;
  dataRetentionDays: number;
}