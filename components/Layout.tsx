import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Phone, MapPin, User, LogOut } from 'lucide-react';
import { storageService } from '../services/storageService';
import { CartItem, User as UserType } from '../types';
import { CONTACT_PHONE } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
  user: UserType | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, cartCount, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Today Price', path: '/prices' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  if (user?.role === 'admin') {
    navLinks.push({ name: 'Admin Panel', path: '/admin' });
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-brand-green text-white py-2 px-4 text-xs sm:text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={14} /> {CONTACT_PHONE}</span>
            <span className="hidden sm:flex items-center gap-1"><MapPin size={14} /> Khammam, Telangana</span>
          </div>
          <div className="flex gap-4">
            <span>Wholesale & Retail</span>
            <span>Morning: 6AM - 10PM</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-brand-green font-bold text-xl">TR</div>
              <div>
                <h1 className="text-xl font-bold text-brand-green leading-none">Triveni Renuka</h1>
                <p className="text-xs text-gray-500 font-medium">Wholesale Fruits</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 font-medium text-gray-700">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`hover:text-brand-green transition-colors ${location.pathname === link.path ? 'text-brand-green font-bold' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-brand-green">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-brand-yellow text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center text-brand-green">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium hidden sm:block text-brand-green">Hi, {user.name.split(' ')[0]}</span>
                  <button onClick={onLogout} title="Logout" className="text-gray-500 hover:text-red-600">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center gap-1 text-sm font-medium bg-brand-lightGreen text-brand-green px-3 py-2 rounded-lg hover:bg-brand-green hover:text-white transition-colors">
                  <User size={16} /> <span className="hidden sm:inline">Login</span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 shadow-lg">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className="text-gray-700 hover:text-brand-green font-medium py-2 border-b border-gray-50 last:border-0"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-green text-white pt-10 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-brand-yellow mb-4">Triveni Renuka</h3>
              <p className="text-gray-200 text-sm mb-4">
                The most trusted wholesale and retail fruit shop in Khammam. Quality freshness guaranteed every day.
              </p>
              <div className="flex gap-2">
                {/* Social Icons Mock */}
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-yellow hover:text-brand-green">f</div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-yellow hover:text-brand-green">in</div>
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-brand-yellow hover:text-brand-green">IG</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-200">
                <li><Link to="/shop" className="hover:text-brand-yellow">Shop Now</Link></li>
                <li><Link to="/prices" className="hover:text-brand-yellow">Today's Price</Link></li>
                <li><Link to="/wholesale" className="hover:text-brand-yellow">Bulk Orders</Link></li>
                <li><Link to="/contact" className="hover:text-brand-yellow">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Categories</h4>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>Seasonal Fruits</li>
                <li>Exotic Fruits</li>
                <li>Regular Daily Fruits</li>
                <li>Dry Fruits</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4">Contact Info</h4>
              <ul className="space-y-3 text-sm text-gray-200">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0 text-brand-yellow" />
                  <span>Wyra Rd, Near New Bus Stand, Khammam, Telangana 507001</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} className="text-brand-yellow" />
                  <span>{CONTACT_PHONE}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-emerald-700 pt-6 text-center text-xs text-gray-300">
            <p>&copy; {new Date().getFullYear()} Triveni Renuka Wholesale Fruit Shop. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
