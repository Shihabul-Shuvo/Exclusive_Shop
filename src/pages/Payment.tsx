
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { CreditCard, ArrowRight } from "lucide-react";

const Payment = () => {
  const { getCartTotal } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get checkout information from localStorage
  const checkoutInfo = JSON.parse(localStorage.getItem('checkoutInfo') || '{}');
  
  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateCardDetails = () => {
    const newErrors: Record<string, string> = {};
    
    if (paymentMethod === 'card') {
      if (!cardDetails.cardNumber.trim()) {
        newErrors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(cardDetails.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = "Invalid card number";
      }
      
      if (!cardDetails.cardHolder.trim()) {
        newErrors.cardHolder = "Cardholder name is required";
      }
      
      if (!cardDetails.expiryDate.trim()) {
        newErrors.expiryDate = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate)) {
        newErrors.expiryDate = "Invalid format (MM/YY)";
      }
      
      if (!cardDetails.cvv.trim()) {
        newErrors.cvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(cardDetails.cvv)) {
        newErrors.cvv = "Invalid CVV";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateCardDetails()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Save payment method to localStorage
    localStorage.setItem('paymentMethod', paymentMethod);
    
    // Simulate payment processing
    setTimeout(() => {
      alert("Payment Verified. Proceeding to order confirmation.");
      
      navigate("/order-confirmation");
      setIsProcessing(false);
    }, 1500);
  };
  
  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Payment Details</h1>
            <p className="text-gray-600">Complete your purchase by providing payment details</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center p-4 border rounded-lg">
                      <input
                        type="radio"
                        id="card-payment"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="mr-3"
                      />
                      <label htmlFor="card-payment" className="flex items-center gap-2 flex-grow">
                        <CreditCard className="text-[#e74c3c]" />
                        <span>Credit / Debit Card</span>
                      </label>
                      <div className="flex gap-2">
                        <img src="https://www.mastercard.us/content/dam/mccom/global/logos/logo-mastercard-mobile.svg" alt="Mastercard" className="h-6" />
                        <img src="https://www.visa.com/images/visa-logo.png" alt="Visa" className="h-6" />
                      </div>
                    </div>
                    
                    <div className="flex items-center p-4 border rounded-lg">
                      <input
                        type="radio"
                        id="cash-payment"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={() => setPaymentMethod("cash")}
                        className="mr-3"
                      />
                      <label htmlFor="cash-payment" className="flex-grow">
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                </div>
                
                {paymentMethod === "card" && (
                  <div className="space-y-4 mb-6 p-4 border rounded-lg">
                    <div>
                      <label className="block mb-2">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={handleCardInputChange}
                        className={`w-full border rounded-md px-4 py-2 ${errors.cardNumber ? 'border-red-500' : ''}`}
                        maxLength={19}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>
                    
                    <div>
                      <label className="block mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        name="cardHolder"
                        placeholder="John Doe"
                        value={cardDetails.cardHolder}
                        onChange={handleCardInputChange}
                        className={`w-full border rounded-md px-4 py-2 ${errors.cardHolder ? 'border-red-500' : ''}`}
                      />
                      {errors.cardHolder && <p className="text-red-500 text-sm mt-1">{errors.cardHolder}</p>}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={cardDetails.expiryDate}
                          onChange={handleCardInputChange}
                          className={`w-full border rounded-md px-4 py-2 ${errors.expiryDate ? 'border-red-500' : ''}`}
                          maxLength={5}
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className="block mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={handleCardInputChange}
                          className={`w-full border rounded-md px-4 py-2 ${errors.cvv ? 'border-red-500' : ''}`}
                          maxLength={4}
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`w-full bg-[#e74c3c] text-white py-3 rounded-md flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#c0392b]'} transition-colors`}
                  >
                    {isProcessing ? 'Processing...' : (
                      <>
                        Continue to Confirmation <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-gray-50 p-5 rounded-lg">
                <h3 className="font-bold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                  </div>
                </div>
                
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Shipping To:</h4>
                  <p>{checkoutInfo.firstName} {checkoutInfo.lastName}</p>
                  <p>{checkoutInfo.streetAddress}</p>
                  {checkoutInfo.apartment && <p>{checkoutInfo.apartment}</p>}
                  <p>{checkoutInfo.city}</p>
                  <p>{checkoutInfo.phoneNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
