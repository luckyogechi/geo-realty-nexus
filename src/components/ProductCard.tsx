import React from 'react';
import { Product } from '../types';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group flex flex-col h-full border-none shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
        <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">
          {product.category}
        </Badge>
      </div>
      <CardContent className="p-4 flex-1">
        <div className="flex items-center gap-1 mb-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>
        <h3 className="font-semibold text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-primary">
          ₦{product.price.toLocaleString()}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Link to={`/store/${product.id}`} className="flex-1">
          <Button variant="outline" className="w-full">Details</Button>
        </Link>
        <Button size="icon" className="shrink-0">
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
