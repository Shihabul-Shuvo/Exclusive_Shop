
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { CreditCard } from "lucide-react";

const Checkout = () => {
  const { cart, getCartTotal } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phoneNumber: "",
    email: "",
    saveInfo: false
  });

  useEffect(() => {
    // Check if user is logged in
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    } else {
      // Redirect to login if not logged in
      alert("Login Required: Please login to proceed to checkout");
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleCouponApply = () => {
    if (couponCode) {
      alert("Coupon Applied: Your discount has been applied to the order");
    } else {
      alert("Invalid Coupon: Please enter a valid coupon code");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      alert("Login Required: Please login to place an order");
      navigate("/login");
      return;
    }
    
    // Validate form
    const requiredFields = ['firstName', 'lastName', 'streetAddress', 'city', 'phoneNumber', 'email'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      alert("Missing Information: Please fill in all required fields");
      return;
    }
    
    // Save checkout information to localStorage
    localStorage.setItem('checkoutInfo', JSON.stringify(formData));
    
    // Navigate to payment page
    navigate('/payment');
  };

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-gray-500 mb-8">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/cart">Cart</Link>
          <span>/</span>
          <span className="text-black">Checkout</span>
        </div>

        <h1 className="text-3xl font-bold mb-10">Checkout</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-8">Your cart is empty. Please add products to your cart before checkout.</p>
            <Link 
              to="/" 
              className="bg-[#e74c3c] text-white px-8 py-3 rounded-md hover:bg-[#c0392b] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold mb-6">Billing Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block mb-2">First Name*</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-4 py-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Last Name*</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full border rounded-md px-4 py-2"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block mb-2">Company Name (Optional)</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-4 py-2"
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2">Street Address*</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-4 py-2"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2">Apartment, floor, etc. (Optional)</label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-4 py-2"
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2">Town/City*</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-4 py-2"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2">Phone Number*</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-4 py-2"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block mb-2">Email Address*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border rounded-md px-4 py-2"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    Save this information for faster check-out next time
                  </label>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-xl font-bold mb-6">Your Order</h2>
                  
                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-cover rounded" />
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-4 mb-6">
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
                  
                  <div className="mb-6">
                    <div className="flex">
                      <input 
                        type="text" 
                        placeholder="Coupon Code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="border rounded-l-md px-4 py-2 flex-grow focus:outline-none focus:border-[#e74c3c]"
                      />
                      <button 
                        type="button"
                        className="bg-[#e74c3c] text-white px-6 py-2 rounded-r-md hover:bg-[#c0392b]"
                        onClick={handleCouponApply}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    className="bg-[#e74c3c] text-white w-full py-3 rounded-md hover:bg-[#c0392b] flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    Continue to Payment
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
