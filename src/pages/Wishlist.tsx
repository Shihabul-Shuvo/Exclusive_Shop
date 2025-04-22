
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Trash2, Eye, ShoppingCart } from "lucide-react";
import { useWishlist } from "../contexts/WishlistContext";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ui/ProductCard";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { data: recommendedProducts } = useProducts({ limit: 4 });

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach(item => {
      addToCart(item);
    });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Wishlist ({wishlist.length})</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Add items that you like to your wishlist. Review them anytime and easily move them to the cart.</p>
            <Link 
              to="/" 
              className="bg-[#e74c3c] text-white px-8 py-3 rounded-md hover:bg-[#c0392b] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-end mb-6">
              <button 
                onClick={handleMoveAllToCart}
                className="bg-white text-[#e74c3c] border border-[#e74c3c] px-6 py-2 rounded-md hover:bg-[#e74c3c] hover:text-white transition-colors"
              >
                Move All To Bag
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {wishlist.map((item) => (
                <div key={item.id} className="border rounded-md overflow-hidden group relative">
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4 text-[#e74c3c]" />
                    </button>
                    <Link
                      to={`/products/${item.id}`}
                      className="p-2 bg-white rounded-full shadow hover:bg-gray-100 flex items-center justify-center"
                      aria-label="View product"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>

                  <Link to={`/products/${item.id}`} className="block p-4">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-contain mb-4" />
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <p className="text-[#e74c3c] font-semibold">${item.price}</p>
                  </Link>

                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="w-full bg-black text-white text-center py-3 flex items-center justify-center gap-2 hover:bg-[#e74c3c] transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add To Cart
                  </button>
                </div>
              ))}
            </div>

            {/* Recommended products section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Just For You</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {recommendedProducts?.products?.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="text-center mt-6">
                <Link 
                  to="/" 
                  className="border border-[#e74c3c] text-[#e74c3c] px-8 py-3 rounded-md inline-block hover:bg-[#e74c3c] hover:text-white transition-colors"
                >
                  See All
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
