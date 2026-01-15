import React, { useState } from 'react';
import { Plus, Trash2, Save, Wand2, Star } from 'lucide-react';
import { Product, PricingUnit } from '../types';
import { storageService } from '../services/storageService';
import { geminiService } from '../services/geminiService';

interface AdminProps {
  products: Product[];
  refreshProducts: () => void;
}

const Admin: React.FC<AdminProps> = ({ products, refreshProducts }) => {
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);

  const handleSave = () => {
    if (editingProduct && editingProduct.name) {
      const productToSave = {
        ...editingProduct,
        id: editingProduct.id || Date.now().toString(),
        variants: editingProduct.variants || [],
        inStock: editingProduct.inStock ?? true,
        isPopular: editingProduct.isPopular ?? false,
      } as Product;
      
      storageService.saveProduct(productToSave);
      refreshProducts();
      setEditingProduct(null);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      storageService.deleteProduct(id);
      refreshProducts();
    }
  };

  const handleGenerateDesc = async () => {
    if (editingProduct?.name) {
      setIsGeneratingDesc(true);
      const desc = await geminiService.generateProductDescription(editingProduct.name);
      setEditingProduct({ ...editingProduct, description: desc });
      setIsGeneratingDesc(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button 
          onClick={() => setEditingProduct({
            name: '', category: 'Regular', image: 'https://picsum.photos/400/400', 
            description: '', inStock: true, isPopular: false,
            variants: [{ unit: PricingUnit.KG, price: 0, minQty: 1, isWholesale: false }]
          })}
          className="bg-brand-green text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-emerald-700"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingProduct.id ? 'Edit Product' : 'New Product'}</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    className="w-full border p-2 rounded" 
                    value={editingProduct.name} 
                    onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select 
                    className="w-full border p-2 rounded" 
                    value={editingProduct.category} 
                    onChange={e => setEditingProduct({...editingProduct, category: e.target.value as any})}
                  >
                    <option>Seasonal</option>
                    <option>Regular</option>
                    <option>Exotic</option>
                    <option>Dry Fruits</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input 
                  className="w-full border p-2 rounded" 
                  value={editingProduct.image} 
                  onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 flex justify-between">
                  Description 
                  <button 
                    onClick={handleGenerateDesc} 
                    disabled={!editingProduct.name || isGeneratingDesc}
                    className="text-brand-green text-xs flex items-center gap-1 hover:underline disabled:opacity-50"
                  >
                    <Wand2 size={12} /> {isGeneratingDesc ? 'Generating...' : 'Generate with AI'}
                  </button>
                </label>
                <textarea 
                  className="w-full border p-2 rounded" 
                  rows={3}
                  value={editingProduct.description} 
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center gap-2 border p-2 rounded cursor-pointer hover:bg-gray-50">
                  <input 
                    type="checkbox"
                    checked={editingProduct.inStock ?? true}
                    onChange={e => setEditingProduct({...editingProduct, inStock: e.target.checked})}
                    className="w-4 h-4 text-brand-green rounded focus:ring-brand-green"
                  />
                  <span className="text-sm font-medium">In Stock</span>
                </label>

                <label className="flex items-center gap-2 border p-2 rounded cursor-pointer hover:bg-gray-50">
                  <input 
                    type="checkbox"
                    checked={editingProduct.isPopular || false}
                    onChange={e => setEditingProduct({...editingProduct, isPopular: e.target.checked})}
                    className="w-4 h-4 text-brand-green rounded focus:ring-brand-green"
                  />
                  <span className="text-sm font-medium text-brand-yellow flex items-center gap-1">
                    Mark as Popular <Star size={14} fill="currentColor" />
                  </span>
                </label>
              </div>

              <div>
                 <label className="block text-sm font-medium mb-2">Pricing Variants</label>
                 {editingProduct.variants?.map((v, idx) => (
                   <div key={idx} className="flex gap-2 mb-2 items-center">
                     <select 
                        className="border p-2 rounded w-24"
                        value={v.unit}
                        onChange={(e) => {
                          const newVariants = [...(editingProduct.variants || [])];
                          newVariants[idx].unit = e.target.value as PricingUnit;
                          setEditingProduct({...editingProduct, variants: newVariants});
                        }}
                     >
                       {Object.values(PricingUnit).map(u => <option key={u}>{u}</option>)}
                     </select>
                     <input 
                       type="number"
                       placeholder="Price"
                       className="border p-2 rounded w-24"
                       value={v.price}
                       onChange={(e) => {
                          const newVariants = [...(editingProduct.variants || [])];
                          newVariants[idx].price = Number(e.target.value);
                          setEditingProduct({...editingProduct, variants: newVariants});
                       }}
                     />
                     <label className="flex items-center gap-1 text-sm">
                       <input 
                         type="checkbox"
                         checked={v.isWholesale}
                         onChange={(e) => {
                          const newVariants = [...(editingProduct.variants || [])];
                          newVariants[idx].isWholesale = e.target.checked;
                          setEditingProduct({...editingProduct, variants: newVariants});
                         }}
                       /> Wholesale
                     </label>
                     <button 
                       className="text-red-500"
                       onClick={() => {
                         const newVariants = editingProduct.variants?.filter((_, i) => i !== idx);
                         setEditingProduct({...editingProduct, variants: newVariants});
                       }}
                     >
                       <Trash2 size={16} />
                     </button>
                   </div>
                 ))}
                 <button 
                   className="text-sm text-brand-green font-medium"
                   onClick={() => setEditingProduct({
                     ...editingProduct, 
                     variants: [...(editingProduct.variants || []), { unit: PricingUnit.KG, price: 0, minQty: 1, isWholesale: false }]
                   })}
                 >
                   + Add Variant
                 </button>
              </div>

              <div className="flex gap-4 pt-4">
                <button onClick={handleSave} className="bg-brand-green text-white px-4 py-2 rounded flex-1">Save Product</button>
                <button onClick={() => setEditingProduct(null)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded flex-1">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-sm font-medium text-gray-500">
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4">Price Range</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <img src={p.image} className="w-10 h-10 rounded object-cover" alt="" />
                  <div>
                    <span className="font-medium block">{p.name}</span>
                    {p.isPopular && <span className="text-xs text-brand-yellow font-bold flex items-center gap-1"><Star size={10} fill="currentColor" /> Popular Pick</span>}
                  </div>
                </td>
                <td className="p-4 text-gray-600">{p.category}</td>
                <td className="p-4">
                  {p.inStock 
                    ? <span className="text-green-600 text-sm bg-green-50 px-2 py-1 rounded">In Stock</span>
                    : <span className="text-red-600 text-sm bg-red-50 px-2 py-1 rounded">Out of Stock</span>
                  }
                </td>
                <td className="p-4 text-gray-600">
                   {p.variants.map(v => `₹${v.price}/${v.unit}`).join(', ')}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => setEditingProduct(p)} className="text-blue-600 hover:text-blue-800">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:text-red-800">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;