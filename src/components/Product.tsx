import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ui/ProductCard";
import { useProducts } from "../hooks/useProducts";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  discountPercentage?: number;
  rating?: number;
  category?: string;
}

const Products = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: fallbackData, isLoading: fallbackLoading } = useProducts();

  useEffect(() => {
    // Check if products were passed via state
    if (location.state && location.state.products) {
      setProducts(location.state.products);
      setIsLoading(false);
    } else {
      // If no products were passed, wait for fallback data
      if (!fallbackLoading && fallbackData) {
        setProducts(fallbackData.products || []);
        setIsLoading(false);
      }
    }
  }, [location.state, fallbackData, fallbackLoading]);

  // Handle page title based on URL
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/flash-sales") return "Flash Sales";
    if (path === "/top-rated") return "Top Rated Products";
    return "All Products";
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{getPageTitle()}</h1>
          <div className="h-1 w-20 bg-[#e74c3c]"></div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e74c3c] mx-auto mb-4"></div>
            <p className="text-2xl">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!isLoading && products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-2xl">No products found.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Products;
