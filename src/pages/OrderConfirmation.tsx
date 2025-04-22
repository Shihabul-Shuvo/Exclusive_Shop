
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { Check, CreditCard } from "lucide-react";

const OrderConfirmation = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Get checkout information from localStorage
  const checkoutInfo = JSON.parse(localStorage.getItem('checkoutInfo') || '{}');
  const paymentMethod = localStorage.getItem('paymentMethod') || 'card';
  
  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;
  
  const handlePlaceOrder = () => {
    setIsLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      alert("Order Placed Successfully! Thank you for your order. We've sent you a confirmation email.");
      
      // Clear cart and checkout data
      clearCart();
      localStorage.removeItem('checkoutInfo');
      localStorage.removeItem('paymentMethod');
      
      // Navigate to home page
      navigate("/");
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-2">Order Confirmation</h1>
            <p className="text-gray-600">Review your order details before placing the order</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 mb-6 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Shipping Details</h2>
              <div className="bg-white border rounded-lg p-4">
                <p className="mb-1"><span className="font-medium">Name:</span> {checkoutInfo.firstName} {checkoutInfo.lastName}</p>
                <p className="mb-1"><span className="font-medium">Address:</span> {checkoutInfo.streetAddress}</p>
                {checkoutInfo.apartment && (
                  <p className="mb-1"><span className="font-medium">Apt/Suite:</span> {checkoutInfo.apartment}</p>
                )}
                <p className="mb-1"><span className="font-medium">City:</span> {checkoutInfo.city}</p>
                <p className="mb-1"><span className="font-medium">Phone:</span> {checkoutInfo.phoneNumber}</p>
                <p className="mb-1"><span className="font-medium">Email:</span> {checkoutInfo.email}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="bg-white border rounded-lg p-4">
                {paymentMethod === 'card' ? (
                  <div className="flex items-center gap-2">
                    <CreditCard className="text-[#e74c3c]" />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-gray-500">**** **** **** 1234</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Check className="text-[#e74c3c]" />
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-gray-500">Pay when you receive the order</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={handlePlaceOrder}
              disabled={isLoading}
              className={`bg-[#e74c3c] text-white py-3 px-12 rounded-md text-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#c0392b]'} transition-colors`}
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
