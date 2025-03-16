'use client';

import React, { useState } from 'react';
import ProductCollection from './product-collection';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProductContent() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button className="bg-primary text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Search & Filter</CardTitle>
            <CardDescription>
              Find products by name, type, or other attributes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="search">Search</Label>
                <Input 
                  id="search" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="meals">Meals</TabsTrigger>
          <TabsTrigger value="snacks">Snacks</TabsTrigger>
          <TabsTrigger value="beverages">Beverages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <ProductCollection searchQuery={searchQuery} productType={null} />
        </TabsContent>
        
        <TabsContent value="meals" className="space-y-4">
          <ProductCollection searchQuery={searchQuery} productType="meal" />
        </TabsContent>
        
        <TabsContent value="snacks" className="space-y-4">
          <ProductCollection searchQuery={searchQuery} productType="snack" />
        </TabsContent>
        
        <TabsContent value="beverages" className="space-y-4">
          <ProductCollection searchQuery={searchQuery} productType="beverage" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
