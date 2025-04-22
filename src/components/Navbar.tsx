/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile";
import MobileMenu from "./ui/MobileMenu";
import AccountDropdown from "./ui/AccountDropdown";
import { useCart } from "../contexts/CartContext";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { useWishlist } from "../contexts/WishlistContext";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    if (loggedInStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  const navigateToDiscountedProducts = () => {
    navigate('/flash-sales');
  };
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  return (
    <>
      <div className="bg-black text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <div>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! <span className="underline ml-1 cursor-pointer" onClick={navigateToDiscountedProducts}>ShopNow</span></div>
        </div>
      </div>
      <nav className="border-b py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          
          {isMobile && <MobileMenu isLoggedIn={isLoggedIn} />}

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">Exclusive</Link>

          {!isMobile && (
            <div className="hidden md:flex gap-8">
              <Link to="/" className={`hover:text-[#e74c3c] ${isActive("/") ? "border-b-2 border-[#e74c3c]" : ""}`}>Home</Link>
              <Link to="/contact" className={`hover:text-[#e74c3c] ${isActive("/contact") ? "border-b-2 border-[#e74c3c]" : ""}`}>Contact</Link>
              <Link to="/about" className={`hover:text-[#e74c3c] ${isActive("/about") ? "border-b-2 border-[#e74c3c]" : ""}`}>About</Link>
              {!isLoggedIn && <Link to="/signup" className={`hover:text-[#e74c3c] ${isActive("/signup") ? "border-b-2 border-[#e74c3c]" : ""}`}>Sign Up</Link>}
            </div>
          )}

          {/* Right-side icons and actions */}
          <div className="flex items-center gap-4">
            {/* Search bar */}
            <form
              onSubmit={handleSearch}
              
              className={`relative ${isMobile ? "block" : "hidden md:block"}`}
            >
              {isMobile ? (
                <>
                  {!showMobileSearch ? (
                    <button
                      type="button"
                      onClick={() => setShowMobileSearch(true)}
                      className="text-gray-400 hover:text-[#e74c3c]"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="border rounded-md pl-4 pr-10 py-2 w-40 text-sm"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#e74c3c]"
                      >
                        <Search className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What are you looking for?"
                    className="border rounded-md pl-4 pr-10 py-2 w-64 text-sm"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#e74c3c]"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              )}
            </form>


            {/* Wishlist */}
            <Link to="/wishlist" className="relative group">
              <Heart className="w-6 h-6 group-hover:text-[#e74c3c] transition-colors" />
              {useWishlist().getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e74c3c] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  {useWishlist().getWishlistCount()}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <ShoppingCart className="w-6 h-6 group-hover:text-[#e74c3c] transition-colors" />
              {useCart().getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e74c3c] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {useCart().getCartItemCount()}
                </span>
              )}
            </Link>

            {/* Account Dropdown */}
            {isLoggedIn && <AccountDropdown handleLogout={handleLogout} />}
          </div>
        </div>
      </nav>
    </>

  );
};

export default Navbar;
