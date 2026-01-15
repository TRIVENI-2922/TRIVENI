import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import TodayPrice from './pages/TodayPrice';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import { Product, CartItem, User } from './types';
import { storageService } from './services/storageService';

// Mock Auth Component for simplicity
const Login = ({ onLogin }: { onLogin: (u: User) => void }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if(phone.length === 10) setStep(2);
    else alert("Please enter valid 10 digit number");
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234') { // Mock OTP
       const user: User = { 
         name: phone === '9999999999' ? 'Admin User' : 'Customer', 
         phone, 
         role: phone === '9999999999' ? 'admin' : 'customer' 
       };
       storageService.saveUser(user);
       onLogin(user);
    } else {
      alert("Invalid OTP (Use 1234)");
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm border">
        <h2 className="text-2xl font-bold text-center mb-6 text-brand-green">Login</h2>
        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input 
              type="tel" placeholder="Mobile Number" 
              className="w-full border p-3 rounded-lg"
              value={phone} onChange={e => setPhone(e.target.value)}
            />
            <button className="w-full bg-brand-green text-white py-3 rounded-lg font-bold">Send OTP</button>
            <p className="text-xs text-gray-400 text-center">Use 9999999999 for Admin access</p>
          </form>
        ) : (
           <form onSubmit={handleVerify} className="space-y-4">
            <input 
              type="text" placeholder="Enter OTP" 
              className="w-full border p-3 rounded-lg text-center letter-spacing-2"
              value={otp} onChange={e => setOtp(e.target.value)}
            />
            <button className="w-full bg-brand-green text-white py-3 rounded-lg font-bold">Verify OTP</button>
            <p className="text-xs text-gray-400 text-center">Use OTP: 1234</p>
          </form>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load initial data
    setProducts(storageService.getProducts());
    setUser(storageService.getUser());
    
    // Load cart from local storage if needed, skipping for simplicity here
  }, []);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.productId === item.productId && i.unit === item.unit);
      if (existing) {
        return prev.map(i => i.productId === item.productId && i.unit === item.unit 
          ? { ...i, quantity: i.quantity + item.quantity } 
          : i
        );
      }
      return [...prev, item];
    });
    // In a real app, save to storageService
  };

  const removeFromCart = (productId: string, unit: string) => {
    setCart(prev => prev.filter(i => !(i.productId === productId && i.unit === unit)));
  };

  const clearCart = () => setCart([]);

  const refreshProducts = () => {
    setProducts(storageService.getProducts());
  };

  return (
    <HashRouter>
      <Layout cartCount={cart.length} user={user} onLogout={() => { setUser(null); storageService.saveUser(null); }}>
        <Routes>
          <Route path="/" element={<Home featuredProducts={products} />} />
          <Route path="/shop" element={<Shop products={products} addToCart={addToCart} />} />
          <Route path="/prices" element={<TodayPrice products={products} />} />
          <Route path="/login" element={!user ? <Login onLogin={setUser} /> : <Navigate to="/" />} />
          
          <Route 
            path="/cart" 
            element={
              <div className="container mx-auto px-4 py-8 max-w-4xl">
                <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
                {cart.length === 0 ? <p>Your cart is empty.</p> : (
                  <>
                    <div className="bg-white rounded-lg shadow border overflow-hidden">
                       {cart.map((item, idx) => (
                         <div key={idx} className="flex items-center justify-between p-4 border-b last:border-0">
                            <div className="flex items-center gap-4">
                               <img src={item.image} alt="" className="w-16 h-16 object-cover rounded" />
                               <div>
                                  <h3 className="font-medium">{item.name}</h3>
                                  <p className="text-sm text-gray-500">{item.quantity} {item.unit} x ₹{item.price}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-4">
                               <span className="font-bold">₹{item.price * item.quantity}</span>
                               <button onClick={() => removeFromCart(item.productId, item.unit)} className="text-red-500 hover:text-red-700">Remove</button>
                            </div>
                         </div>
                       ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                       <button onClick={() => window.location.hash = '#/checkout'} className="bg-brand-green text-white px-8 py-3 rounded-lg font-bold">Proceed to Checkout</button>
                    </div>
                  </>
                )}
              </div>
            } 
          />
          
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={clearCart} />} />
          
          <Route 
            path="/admin" 
            element={user?.role === 'admin' ? <Admin products={products} refreshProducts={refreshProducts} /> : <Navigate to="/login" />} 
          />
          
          <Route path="*" element={<div className="p-20 text-center">Page Not Found</div>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
