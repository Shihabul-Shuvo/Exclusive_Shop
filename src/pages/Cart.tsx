
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { ChevronUp, ChevronDown, Trash2 } from "lucide-react";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();
  
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handleCouponApply = () => {
    if (couponCode) {
      console.log("Applying coupon:", couponCode);
      alert("Coupon applied successfully!");
    } else {
      alert("Please enter a valid coupon code");
    }
  };
  
  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <p className="text-xl text-gray-600 mb-8">Your cart is currently empty</p>
            <Link 
              to="/" 
              className="bg-[#e74c3c] text-white px-8 py-3 rounded-md hover:bg-[#c0392b] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 text-gray-500 mb-8">
              <Link to="/">Home</Link>
              <span>/</span>
              <span className="text-black">Cart</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-10">Your Cart</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="border-b pb-4 mb-4 hidden md:grid md:grid-cols-12 font-medium">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>
                
                {cart.map((item) => (
                  <div key={item.id} className="border-b py-6 grid grid-cols-1 md:grid-cols-12 items-center">
                    <div className="col-span-6 flex items-center gap-4 mb-4 md:mb-0">
                      <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-contain" />
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#e74c3c] text-sm flex items-center gap-1 mt-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="col-span-2 text-center">
                      <p className="md:hidden font-medium inline-block mr-2">Price:</p>
                      ${item.price}
                    </div>
                    <div className="col-span-2 text-center">
                      <p className="md:hidden font-medium inline-block mr-2">Quantity:</p>
                      <div className="inline-flex items-center border rounded">
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-2 py-1"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-2 py-1"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="col-span-2 text-right font-medium">
                      <p className="md:hidden font-medium inline-block mr-2">Subtotal:</p>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between mt-10">
                  <Link 
                    to="/" 
                    className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50"
                  >
                    Return To Shop
                  </Link>
                  <button 
                    className="border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-50"
                    onClick={() => window.location.reload()}
                  >
                    Update Cart
                  </button>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-6">Cart Total</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between border-b pb-4">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-b pb-4">
                      <span>Shipping</span>
                      <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <button 
                      className="bg-[#e74c3c] text-white w-full py-3 rounded-md hover:bg-[#c0392b]"
                      onClick={() => navigate('/checkout')}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Coupon Code" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="border rounded-l-md px-4 py-2 flex-grow focus:outline-none focus:border-[#e74c3c]"
                    />
                    <button 
                      className="bg-[#e74c3c] text-white px-6 py-2 rounded-r-md hover:bg-[#c0392b]"
                      onClick={handleCouponApply}
                    >
                      Apply Coupon
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
