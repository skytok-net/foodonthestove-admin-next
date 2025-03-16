'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, Trash2, DollarSign } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

// Helper function to format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Define the Product interface based on the GraphQL schema
interface Product {
  id: string;
  name: string;
  shortDescription: string;
  photoUrl?: string;
  unitPrice: number;
  unit: string;
  productType: {
    name: string;
    key: string;
  };
}

interface ProductCollectionProps {
  searchQuery?: string;
  productType?: string | null;
}

export default function ProductCollection({ searchQuery = '', productType = null }: ProductCollectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for initial development
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Grilled Chicken Meal Prep',
      shortDescription: 'Healthy grilled chicken with vegetables and quinoa',
      photoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
      unitPrice: 12.99,
      unit: 'meal',
      productType: {
        name: 'Meal',
        key: 'meal'
      }
    },
    {
      id: '2',
      name: 'Protein Smoothie',
      shortDescription: 'High protein smoothie with berries and greens',
      photoUrl: 'https://images.unsplash.com/photo-1622597467836-f3e6707e1e57',
      unitPrice: 7.99,
      unit: 'bottle',
      productType: {
        name: 'Beverage',
        key: 'beverage'
      }
    },
    {
      id: '3',
      name: 'Energy Bar',
      shortDescription: 'Nutritious energy bar with nuts and dried fruits',
      photoUrl: 'https://images.unsplash.com/photo-1582093458243-9a7b53524159',
      unitPrice: 3.49,
      unit: 'bar',
      productType: {
        name: 'Snack',
        key: 'snack'
      }
    },
    {
      id: '4',
      name: 'Vegetarian Buddha Bowl',
      shortDescription: 'Plant-based bowl with roasted vegetables and tahini dressing',
      photoUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
      unitPrice: 11.99,
      unit: 'meal',
      productType: {
        name: 'Meal',
        key: 'meal'
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be an API call
        // For now, we'll use mock data
        setTimeout(() => {
          let filteredProducts = [...mockProducts];
          
          // Filter by product type if specified
          if (productType) {
            filteredProducts = filteredProducts.filter(
              product => product.productType.key === productType
            );
          }
          
          // Filter by search query if provided
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredProducts = filteredProducts.filter(
              product => 
                product.name.toLowerCase().includes(query) || 
                product.shortDescription.toLowerCase().includes(query)
            );
          }
          
          setProducts(filteredProducts);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError('Failed to fetch products: ' + (err instanceof Error ? err.message : 'Unknown error'));
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, productType]);

  if (isLoading) {
    return <ProductLoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-2">{error}</p>
        <Button 
          onClick={() => setIsLoading(true)} 
          variant="outline"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-muted-foreground">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        {product.photoUrl ? (
          <Image
            src={product.photoUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">No image</p>
          </div>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{product.name}</CardTitle>
          <Badge variant="outline" className="ml-2">
            {product.productType.name}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm mb-4">{product.shortDescription}</p>
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
          <span className="font-medium">{formatCurrency(product.unitPrice)}</span>
          <span className="text-muted-foreground text-sm ml-1">/ {product.unit}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
        <Button variant="outline" size="sm" className="text-destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProductLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-4 w-1/4" />
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
