import React, { useState } from 'react';
import { ShoppingCart, Filter, Search } from 'lucide-react';
import { Product, PricingUnit, CartItem } from '../types';

interface ShopProps {
  products: Product[];
  addToCart: (item: CartItem) => void;
}

const Shop: React.FC<ShopProps> = ({ products, addToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  
  // Local state to track selected variant for each product card
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});

  const categories = ['All', 'Seasonal', 'Regular', 'Exotic', 'Dry Fruits'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVariantChange = (productId: string, variantIndex: number) => {
    setSelectedVariants(prev => ({ ...prev, [productId]: variantIndex }));
  };

  const handleAddToCart = (product: Product) => {
    const variantIndex = selectedVariants[product.id] || 0;
    const variant = product.variants[variantIndex];
    
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      unit: variant.unit,
      price: variant.price,
      quantity: variant.minQty
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div>
           <h2 className="text-3xl font-bold text-gray-800">Our Fresh Collection</h2>
           <p className="text-gray-500 text-sm">Explore {products.length} types of fruits</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search fruits (e.g. Apple)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green w-full"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                  filterCategory === cat 
                    ? 'bg-brand-green text-white border-brand-green' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          const selectedVariantIndex = selectedVariants[product.id] || 0;
          const currentVariant = product.variants[selectedVariantIndex];

          return (
            <div key={product.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col h-full">
              <div className="relative h-56 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold">
                    OUT OF STOCK
                  </div>
                )}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.category === 'Dry Fruits' && (
                     <span className="bg-amber-700 text-white text-xs font-bold px-2 py-1 rounded shadow">DRY FRUIT</span>
                  )}
                  {product.category === 'Seasonal' && (
                     <span className="bg-brand-green text-white text-xs font-bold px-2 py-1 rounded shadow">SEASONAL</span>
                  )}
                </div>
              </div>
              
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                   <div>
                      <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{product.category}</span>
                   </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="mt-auto space-y-4">
                  {/* Variant Selector */}
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleVariantChange(product.id, idx)}
                        className={`text-xs border px-2 py-1 rounded transition-colors ${
                          selectedVariantIndex === idx 
                            ? 'bg-brand-lightGreen border-brand-green text-brand-green font-bold' 
                            : 'border-gray-200 text-gray-600 hover:border-brand-green'
                        }`}
                      >
                        {v.unit}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                       <span className="text-2xl font-bold text-brand-green">₹{currentVariant.price}</span>
                       <span className="text-gray-400 text-sm ml-1">/ {currentVariant.unit}</span>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`p-2 rounded-full transition-colors ${
                        product.inStock 
                          ? 'bg-brand-green text-white hover:bg-emerald-700' 
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-xl border border-dashed">
          <p className="text-lg">No products found matching "{searchTerm}".</p>
          <button onClick={() => setSearchTerm('')} className="text-brand-green font-bold mt-2 hover:underline">Clear Search</button>
        </div>
      )}
    </div>
  );
};

export default Shop;