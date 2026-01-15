import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, Order } from '../types';
import { storageService } from '../services/storageService';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    deliverySlot: 'Morning (8AM - 11AM)',
    paymentMethod: 'COD'
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order: Order = {
      id: Date.now().toString(),
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      items: cart,
      totalAmount: total,
      status: 'Pending',
      date: new Date().toISOString(),
      deliverySlot: formData.deliverySlot as any,
      paymentMethod: formData.paymentMethod as any
    };

    storageService.saveOrder(order);
    clearCart();
    alert('Order placed successfully! You will receive a WhatsApp confirmation shortly.');
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/shop')} className="text-brand-green underline">Go back to shop</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Form */}
        <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Delivery Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input required className="w-full border p-2 rounded" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <input required type="tel" className="w-full border p-2 rounded" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Delivery Address</label>
              <textarea required className="w-full border p-2 rounded" rows={3} value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium mb-1">Delivery Slot</label>
                  <select className="w-full border p-2 rounded" value={formData.deliverySlot} onChange={e => setFormData({...formData, deliverySlot: e.target.value})}>
                    <option>Morning (8AM - 11AM)</option>
                    <option>Evening (4PM - 8PM)</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1">Payment Method</label>
                  <select className="w-full border p-2 rounded" value={formData.paymentMethod} onChange={e => setFormData({...formData, paymentMethod: e.target.value})}>
                    <option value="COD">Cash on Delivery</option>
                    <option value="UPI">UPI (GPay/PhonePe)</option>
                    <option value="Online">Credit/Debit Card</option>
                  </select>
               </div>
            </div>

            <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 rounded-lg hover:bg-emerald-800 transition-colors mt-4">
              Place Order (₹{total})
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-gray-50 p-6 rounded-xl border">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
              {cart.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.quantity} x {item.name} ({item.unit})</span>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-brand-green">₹{total}</span>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              By placing an order, you agree to our Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
