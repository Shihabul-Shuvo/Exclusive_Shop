
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert("You have successfully subscribed to our newsletter.");
      setEmail("");
    }
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-4 py-16">
        <div>
          <h3 className="text-2xl font-bold mb-6">Exclusive</h3>
          <h4 className="mb-4">Subscribe</h4>
          <p className="mb-4">Get 10% off your first order</p>
          <form onSubmit={handleSubscribe} className="flex border border-white">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black px-4 py-2 flex-1 focus:outline-none"
            />
            <button type="submit" className="p-2 border-l border-white">
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div>
          <h4 className="font-medium mb-4">Support</h4>
          <p className="mb-2">111 Bijoy sarani, Dhaka,</p>
          <p className="mb-2">DH 1515, Bangladesh.</p>
          <p className="mb-2">exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        <div>
          <h4 className="font-medium mb-4">Account</h4>
          <ul className="space-y-2">
            <li><Link to="/account">My Account</Link></li>
            <li><Link to="/login">Login / Register</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/">Shop</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4">Quick Link</h4>
          <ul className="space-y-2">
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms Of Use</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-4">Download App</h4>
          <p className="text-sm mb-4">Save $3 with App New User Only</p>
          <div className="mb-4">
            <img 
              src="src\assets\photos\e-commerce_qr.png"
              alt="QR Code"
              className="w-32 h-32 bg-white p-1 rounded mb-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" alt="Google Play" className="w-full" />
            <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" alt="App Store" className="w-full" />
          </div>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-white hover:text-[#e74c3c]" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:text-[#e74c3c]" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:text-[#e74c3c]" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-white hover:text-[#e74c3c]" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-sm">
        © Copyright Rimel 2022. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
