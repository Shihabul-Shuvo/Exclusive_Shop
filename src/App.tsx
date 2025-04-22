import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import { CartProvider } from "./contexts/CartContext";
import Products from "./components/Product";
import ProductDetails from "./components/ProductDetail";
import Account from "./pages/Account";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import OrderConfirmation from "./pages/OrderConfirmation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import FAQ from "./pages/FAQ";

const queryClient = new QueryClient();

// Create a scroll to top component
const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
};

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ScrollToTop />
                    <Index />
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    <ScrollToTop />
                    <Login />
                  </>
                }
              />
              <Route
                path="/products/:id"
                element={
                  <>
                    <ScrollToTop />
                    <ProductDetails />
                  </>
                }
              />
              <Route
                path="/signup"
                element={
                  <>
                    <ScrollToTop />
                    <SignUp />
                  </>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <>
                    <ScrollToTop />
                    <ForgotPassword />
                  </>
                }
              />
              <Route path="/account" element={<><ScrollToTop /><Account /></>} />
              <Route
                path="/wishlist"
                element={
                  <>
                    <ScrollToTop />
                    <Wishlist />
                  </>
                }
              />
              <Route
                path="/cart"
                element={
                  <>
                    <ScrollToTop />
                    <Cart />
                  </>
                }
              />
              <Route path="/checkout" element={<><ScrollToTop /><Checkout /></>} />
              <Route path="/payment" element={<><ScrollToTop /><Payment /></>} />
              <Route path="/order-confirmation" element={<><ScrollToTop /><OrderConfirmation /></>} />
              <Route path="/privacy-policy" element={<><ScrollToTop /><PrivacyPolicy /></>} />
              <Route path="/terms" element={<><ScrollToTop /><TermsOfUse /></>} />
              <Route path="/faq" element={<><ScrollToTop /><FAQ /></>} />
              <Route
                path="/contact"
                element={
                  <>
                    <ScrollToTop />
                    <Contact />
                  </>
                }
              />
              <Route
                path="/products"
                element={
                  <>
                    <ScrollToTop />
                    <Products />
                  </>
                }
              />
              <Route
                path="/flash-sales"
                element={
                  <>
                    <ScrollToTop />
                    <Products />
                  </>
                }
              />
              <Route
                path="/top-rated"
                element={
                  <>
                    <ScrollToTop />
                    <Products />
                  </>
                }
              />
              <Route
                path="/about"
                element={
                  <>
                    <ScrollToTop />
                    <About />
                  </>
                }
              />

              <Route
                path="/"
                element={
                  <>
                    <ScrollToTop />
                    <Index />
                  </>
                }
              />
              <Route
                path="/category/:categoryName"
                element={
                  <>
                    <ScrollToTop />
                    <CategoryPage />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <ScrollToTop />
                    <NotFound />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
