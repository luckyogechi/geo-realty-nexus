import React from 'react';
import { Property } from '../types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bed, Bath, Maximize, MapPin, BadgeCheck, LayoutGrid, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground capitalize">
            {property.type === 'sale' ? 'For Sale' : property.type}
          </Badge>
          {property.verified && (
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-green-600 flex gap-1 items-center">
              <BadgeCheck className="h-3 w-3" /> Verified
            </Badge>
          )}
          {property.plotsAvailable && (
            <Badge className="bg-amber-500/90 backdrop-blur-sm text-white flex gap-1 items-center">
              <LayoutGrid className="h-3 w-3" /> {property.plotsAvailable} Plots
            </Badge>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <p className="text-white font-bold text-xl drop-shadow-md">
            {property.priceLabel || `₦${property.price.toLocaleString()}`}
          </p>
        </div>
        {property.title === 'GOLD City Annex' && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-amber-500 text-white animate-pulse shadow-lg flex gap-1 items-center">
              <Sparkles className="h-3 w-3" /> Premium
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{property.location}</span>
        </div>
        <h3 className="font-semibold text-lg line-clamp-1 mb-4 group-hover:text-primary transition-colors">
          {property.title}
        </h3>
        {property.plotsAvailable ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground border-t pt-4">
            <LayoutGrid className="h-4 w-4 text-amber-500" />
            <span className="font-medium">{property.plotsAvailable} plots available</span>
            <span className="ml-auto text-amber-600 font-bold">₦{property.price.toLocaleString()}/plot</span>
          </div>
        ) : (
          <div className="flex items-center justify-between text-muted-foreground text-sm border-t pt-4">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.beds}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.baths}</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="h-4 w-4" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Link to={`/properties/${property.id}`} className="flex-1">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
        <Button className="flex-none">Contact</Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;