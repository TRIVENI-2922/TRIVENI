import React, { useEffect, useState } from 'react';
import { FileText, Share2 } from 'lucide-react';
import { Product } from '../types';
import { geminiService } from '../services/geminiService';
import { WHATSAPP_LINK } from '../constants';

interface TodayPriceProps {
  products: Product[];
}

const TodayPrice: React.FC<TodayPriceProps> = ({ products }) => {
  const [marketAnalysis, setMarketAnalysis] = useState<string>('Loading market analysis...');
  const date = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    const fetchAnalysis = async () => {
      const text = await geminiService.generateDailyMarketReport(products);
      setMarketAnalysis(text);
    };
    fetchAnalysis();
  }, [products]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Triveni Renuka Fruit Prices - ${date}`,
        text: `Check out today's fresh fruit prices in Khammam! \n\n${marketAnalysis}`,
        url: window.location.href
      }).catch(console.error);
    } else {
      alert("Share feature not supported on this browser.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-green mb-2">Today's Price List</h1>
            <p className="text-gray-500 font-medium">{date}</p>
          </div>
          <button onClick={handleShare} className="flex items-center gap-2 text-brand-green hover:bg-brand-lightGreen px-4 py-2 rounded-lg transition-colors">
            <Share2 size={20} /> <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* AI Analysis Box */}
        <div className="bg-brand-lightGreen/50 border border-brand-lightGreen p-4 rounded-lg mb-8">
          <div className="flex gap-3">
             <div className="mt-1 text-brand-green"><FileText size={20} /></div>
             <div>
               <h3 className="font-bold text-brand-green text-sm mb-1">Market Update (AI Generated)</h3>
               <p className="text-gray-700 text-sm italic">{marketAnalysis}</p>
             </div>
          </div>
        </div>

        {/* Price Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-left">
                <th className="py-4 px-4 font-semibold text-gray-600">Product Name</th>
                <th className="py-4 px-4 font-semibold text-gray-600">Retail Price</th>
                <th className="py-4 px-4 font-semibold text-gray-600">Wholesale Price</th>
                <th className="py-4 px-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const retailVariant = product.variants.find(v => !v.isWholesale) || product.variants[0];
                const wholesaleVariant = product.variants.find(v => v.isWholesale);

                return (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt="" className="w-10 h-10 rounded-full object-cover bg-gray-100" />
                        <span className="font-medium text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      ₹{retailVariant.price} / {retailVariant.unit}
                    </td>
                    <td className="py-4 px-4 text-brand-green font-medium">
                      {wholesaleVariant 
                        ? `₹${wholesaleVariant.price} / ${wholesaleVariant.unit}` 
                        : <span className="text-gray-400 text-xs">N/A</span>}
                    </td>
                    <td className="py-4 px-4">
                      {product.inStock 
                        ? <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Available</span>
                        : <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">Sold Out</span>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 text-center">
           <p className="text-sm text-gray-500 mb-4">* Prices are subject to change based on market arrival.</p>
           <a href={`${WHATSAPP_LINK}?text=Hi, I want to inquire about today's prices.`} className="bg-brand-green text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-800 transition-colors">
             Book on WhatsApp
           </a>
        </div>
      </div>
    </div>
  );
};

export default TodayPrice;
