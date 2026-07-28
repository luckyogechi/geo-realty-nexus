import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROPERTIES } from '../lib/mock-data';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { 
  Bed, Bath, Maximize, MapPin, CheckCircle2, Share2, Heart, 
  MessageSquare, Phone, Calendar, ArrowLeft, ExternalLink, ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';

const PropertyDetail = () => {
  const { id } = useParams();
  const property = PROPERTIES.find(p => p.id === id);
  const [activeTab, setActiveTab] = useState('overview');

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Property Not Found</h2>
        <Link to="/properties">
          <Button variant="outline">Back to Listings</Button>
        </Link>
      </div>
    );
  }

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Inquiry sent successfully! The agent will contact you soon.');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Top Navigation */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/properties" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Listings
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Heart className="h-4 w-4" /> Save
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="aspect-video rounded-2xl overflow-hidden bg-muted relative">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 right-6">
                  <Button variant="secondary" className="gap-2">
                    <ExternalLink className="h-4 w-4" /> 360° Virtual Tour
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-muted border">
                    <img 
                      src={`https://images.unsplash.com/photo-${1580000000000 + i}?auto=format&fit=crop&q=80&w=400`} 
                      alt="Thumbnail" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Title & Info */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/90 capitalize">{property.type}</Badge>
                {property.verified && (
                  <Badge variant="secondary" className="text-green-600 gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Verified
                  </Badge>
                )}
                <Badge variant="outline">New Construction</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">{property.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{property.location}</span>
              </div>
              <div className="flex gap-8 py-6 border-y">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Price</p>
                  <p className="text-2xl font-bold text-primary">₦{property.price.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-primary" />
                    <span className="text-xl font-bold">{property.beds}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-primary" />
                    <span className="text-xl font-bold">{property.baths}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Size</p>
                  <div className="flex items-center gap-2">
                    <Maximize className="h-5 w-5 text-primary" />
                    <span className="text-xl font-bold">{property.sqft} sqft</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Content */}
            <div className="space-y-6">
              <div className="flex border-b gap-8">
                {['Overview', 'Amenities', 'Neighborhood', 'Floor Plan'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${
                      activeTab === tab.toLowerCase() ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab}
                    {activeTab === tab.toLowerCase() && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />
                    )}
                  </button>
                ))}
              </div>

              <div className="py-4 leading-relaxed text-muted-foreground">
                {activeTab === 'overview' && (
                  <div className="space-y-4">
                    <p>{property.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                      <div className="p-4 bg-muted/50 rounded-xl space-y-1">
                        <p className="text-xs text-muted-foreground uppercase font-bold">Category</p>
                        <p className="font-semibold text-foreground capitalize">{property.category}</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-xl space-y-1">
                        <p className="text-xs text-muted-foreground uppercase font-bold">Listed Date</p>
                        <p className="font-semibold text-foreground">Nov 15, 2023</p>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-xl space-y-1">
                        <p className="text-xs text-muted-foreground uppercase font-bold">Property ID</p>
                        <p className="font-semibold text-foreground">#{property.id.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'amenities' && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {property.amenities.map(amenity => (
                      <div key={amenity} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'neighborhood' && (
                  <div className="space-y-6">
                    <p>Located in a prime area with excellent transport links and local amenities.</p>
                    <div className="aspect-[21/9] rounded-xl overflow-hidden bg-muted border">
                      <img 
                        src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200" 
                        alt="Map" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                {activeTab === 'floor plan' && (
                  <div className="flex flex-col items-center justify-center py-10 bg-muted/30 rounded-2xl border-2 border-dashed">
                    <Maximize className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="font-bold">Interactive Floor Plan Coming Soon</p>
                    <p className="text-sm">We are processing the architectural drawings for this property.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Agent & Inquiry */}
          <div className="space-y-8">
            {/* Agent Profile */}
            <Card className="border shadow-md overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-muted border-2 border-primary/20">
                    <img src={property.agent.image} alt={property.agent.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{property.agent.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-primary" /> Licensed Agent
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full gap-2 h-11">
                    <Phone className="h-4 w-4" /> {property.agent.phone}
                  </Button>
                  <Button variant="outline" className="w-full gap-2 h-11">
                    <MessageSquare className="h-4 w-4" /> WhatsApp Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Inquiry Form */}
            <Card className="border shadow-md overflow-hidden bg-primary/5 border-primary/10">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-bold text-xl mb-1">Make an Inquiry</h3>
                  <p className="text-sm text-muted-foreground">Interested in this property? Send us a message.</p>
                </div>
                <form onSubmit={handleInquiry} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Your Name</label>
                    <Input placeholder="Enter your full name" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Email Address</label>
                    <Input type="email" placeholder="Enter your email" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Message</label>
                    <Textarea 
                      placeholder="I am interested in this property..." 
                      className="min-h-[120px] resize-none"
                      defaultValue={`I am interested in "${property.title}" (${property.id}). Please provide more details.`}
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 text-lg">Send Message</Button>
                  <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">
                    Protected by reCAPTCHA
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Verification Badge */}
            <div className="p-6 bg-white rounded-2xl border shadow-sm flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">Title Verified</p>
                <p className="text-xs text-muted-foreground">This property has been verified by Land & Trust Nigeria.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
