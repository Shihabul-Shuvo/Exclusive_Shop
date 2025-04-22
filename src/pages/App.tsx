
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import FAQ from "./pages/FAQ";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import CategoryPage from "./pages/CategoryPage";
import ViewAllProducts from "./pages/ViewAllProducts";

const queryClient = new QueryClient();

// Create a scroll to top component
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <WishlistProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<><ScrollToTop /><Index /></>} />
              <Route path="/login" element={<><ScrollToTop /><Login /></>} />
              <Route path="/signup" element={<><ScrollToTop /><SignUp /></>} />
              <Route path="/forgot-password" element={<><ScrollToTop /><ForgotPassword /></>} />
              <Route path="/account" element={<><ScrollToTop /><Account /></>} />
              <Route path="/contact" element={<><ScrollToTop /><Contact /></>} />
              <Route path="/about" element={<><ScrollToTop /><About /></>} />
              <Route path="/products/:id" element={<><ScrollToTop /><ProductDetails /></>} />
              <Route path="/wishlist" element={<><ScrollToTop /><Wishlist /></>} />
              <Route path="/cart" element={<><ScrollToTop /><Cart /></>} />
              <Route path="/checkout" element={<><ScrollToTop /><Checkout /></>} />
              <Route path="/payment" element={<><ScrollToTop /><Payment /></>} />
              <Route path="/order-confirmation" element={<><ScrollToTop /><OrderConfirmation /></>} />
              <Route path="/privacy-policy" element={<><ScrollToTop /><PrivacyPolicy /></>} />
              <Route path="/terms" element={<><ScrollToTop /><TermsOfUse /></>} />
              <Route path="/faq" element={<><ScrollToTop /><FAQ /></>} />
              <Route path="/category/:categoryName" element={<><ScrollToTop /><CategoryPage /></>} />
              <Route path="/:type" element={<><ScrollToTop /><ViewAllProducts /></>} />
              <Route path="*" element={<><ScrollToTop /><NotFound /></>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WishlistProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
