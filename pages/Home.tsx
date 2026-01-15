import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Award, Percent, MessageCircle, MapPin, Star } from 'lucide-react';
import { Product } from '../types';
import { WHATSAPP_LINK } from '../constants';

interface HomeProps {
  featuredProducts: Product[];
}

const Home: React.FC<HomeProps> = ({ featuredProducts }) => {
  // Filter popular products, fallback to first 4 if none marked popular
  const popularProducts = featuredProducts.filter(p => p.isPopular);
  const displayProducts = popularProducts.length > 0 ? popularProducts : featuredProducts.slice(0, 4);

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[500px] bg-emerald-900 flex items-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2670&auto=format&fit=crop" 
          alt="Fresh Fruits" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-2xl">
            <span className="inline-block bg-brand-yellow text-brand-green font-bold px-3 py-1 rounded-full text-sm mb-4">
              #1 in Khammam
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Fresh Fruits at <br/> <span className="text-brand-yellow">Wholesale Prices</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Premium quality seasonal and exotic fruits delivered to your doorstep. Best rates for hotels, functions, and daily needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="bg-brand-green hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/prices" className="bg-white hover:bg-gray-100 text-brand-green font-bold py-3 px-8 rounded-lg flex items-center justify-center transition-all">
                View Today's Prices
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Fast Delivery", desc: "Morning & Evening Slots" },
            { icon: Award, title: "Premium Quality", desc: "Hand-picked daily" },
            { icon: Percent, title: "Wholesale Rates", desc: "Direct from farmers" },
            { icon: MessageCircle, title: "Order on WhatsApp", desc: "Easy bulk ordering" }
          ].map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-brand-lightGreen text-brand-green rounded-full flex items-center justify-center mb-4">
                <f.icon size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Popular Fruits</h2>
            <p className="text-gray-500 mt-2">Our best-selling picks this week</p>
          </div>
          <Link to="/shop" className="text-brand-green font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map(product => (
            <div key={product.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group relative">
              {product.isPopular && (
                 <div className="absolute top-2 right-2 z-10 bg-brand-yellow text-brand-green text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                   <Star size={10} fill="currentColor" /> Popular
                 </div>
              )}
              <div className="relative h-48 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {product.category === 'Seasonal' && (
                  <span className="absolute top-2 left-2 bg-brand-green text-white text-xs font-bold px-2 py-1 rounded">SEASONAL</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                   <div className="flex flex-col">
                      <span className="text-xs text-gray-400">Starts from</span>
                      <span className="font-bold text-brand-green">₹{product.variants[0]?.price} / {product.variants[0]?.unit}</span>
                   </div>
                   <Link to="/shop" className="bg-brand-lightGreen p-2 rounded-full text-brand-green hover:bg-brand-green hover:text-white transition-colors">
                      <ArrowRight size={18} />
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-yellow py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-emerald-900 mb-4">Buying in Bulk for Hotel or Function?</h2>
          <p className="text-emerald-800 mb-8 max-w-2xl mx-auto">
            Get special discounted rates for bulk orders above 50kg. We supply to major hotels and juice centers in Khammam.
          </p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-brand-green text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-900 transition-colors">
            <MessageCircle size={20} /> Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Map Section */}
      <section className="container mx-auto px-4">
         <h2 className="text-2xl font-bold text-gray-800 mb-6">Visit Our Shop</h2>
         <div className="bg-gray-200 w-full h-80 rounded-xl overflow-hidden relative flex items-center justify-center">
             {/* Simulating a map embed since we can't use real Google Maps API Key here effectively without billing */}
             <div className="text-center p-6 bg-white/80 rounded-lg shadow-lg">
                <MapPin size={48} className="text-brand-green mx-auto mb-2" />
                <h3 className="font-bold text-xl">Triveni Renuka Wholesale Fruit Shop</h3>
                <p className="text-gray-600">Wyra Rd, Near New Bus Stand, Khammam</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Wyra+Road+Khammam" 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-4 inline-block text-brand-green font-bold hover:underline"
                >
                  Open in Google Maps
                </a>
             </div>
             <img src="https://images.unsplash.com/photo-1577234181974-95d666d3d440?q=80&w=2670&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover -z-10 opacity-30 mix-blend-multiply" alt="Map Background" />
         </div>
      </section>
    </div>
  );
};

export default Home;