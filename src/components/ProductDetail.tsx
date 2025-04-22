import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Heart,
  Minus,
  Plus,
  Truck,
  RotateCcw,
  Star,
  Eye,
  X,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishlistContext";
import ProductsCarousel from "../components/ProductsCarousel";
import { useProducts } from "../hooks/useProducts";

const fetchProduct = async (id: string) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    // Scroll to top when component mounts or id changes
    window.scrollTo(0, 0);
  }, [id]);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id || "1"),
  });

  const { data: relatedProductsData } = useProducts({
    limit: 10,
    category: product?.category,
  });

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    alert(`${product.title} has been added to your cart.`);
    }
  };

  const handleToggleWishlist = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn || isLoggedIn !== "true") {
    alert("Please login to add items to your wishlist.");
      navigate("/login");
      return;
    }

    if (!product) return;

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const relatedProducts =
    relatedProductsData?.products?.filter((p) => p.id !== Number(id)) || [];

  if (isLoading)
    return (
      <div>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e74c3c] mx-auto mb-4"></div>
            <p className="text-xl">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );

  if (!product)
    return (
      <div>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Product not found</h1>
            <button
              onClick={() => navigate("/")}
              className="bg-[#e74c3c] text-white px-6 py-2 rounded-md"
            >
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-8">
          <span
            className="hover:text-[#e74c3c] cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <span className="mx-2">/</span>
          <span
            className="hover:text-[#e74c3c] cursor-pointer"
            onClick={() => navigate(`/products/category/${product.category}`)}
          >
            {product.category}
          </span>
          <span className="mx-2">/</span>
          <span className="text-[#e74c3c]">{product.title}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-12 mb-16">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="mb-4 aspect-square overflow-hidden border rounded-lg relative">
              <img
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setShowImageModal(true)}
                className="absolute right-4 top-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                aria-label="View image"
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images?.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`border rounded-md overflow-hidden cursor-pointer ${
                    selectedImage === index
                      ? "border-[#e74c3c]"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-20 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.rating} Reviews)</span>
              {product.stock > 0 ? (
                <span className="text-green-600 ml-4">In Stock</span>
              ) : (
                <span className="text-red-600 ml-4">Out of Stock</span>
              )}
            </div>

            <div className="mb-6">
              <span className="text-2xl font-bold">${product.price}</span>
              {product.discountPercentage && (
                <span className="ml-3 text-gray-500 line-through">
                  $
                  {(
                    product.price /
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="border-t border-b py-6 mb-6">
              <div className="mb-6">
                <p className="font-semibold mb-2">Size:</p>
                <div className="flex gap-4">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-full border ${
                        selectedSize === size
                          ? "border-[#e74c3c] text-[#e74c3c]"
                          : "border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-4 py-2 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-4 py-2"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-[#e74c3c] text-white px-8 py-3 rounded-md hover:bg-[#c0392b] transition-colors"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className={`p-3 border rounded-full ${
                    isInWishlist(product.id)
                      ? "bg-[#e74c3c] border-[#e74c3c]"
                      : ""
                  }`}
                >
                  <Heart
                    className={`w-6 h-6 ${
                      isInWishlist(product.id) ? "text-white fill-white" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <Truck className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Free Delivery</p>
                  <p className="text-sm text-gray-600">
                    Enter your postal code for delivery availability
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <RotateCcw className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Return Delivery</p>
                  <p className="text-sm text-gray-600">
                    Free 30 days delivery returns. Details
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h3 className="font-bold mb-2">Product Details:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Brand: {product.brand}</li>
                <li>Category: {product.category}</li>
                <li>SKU: {product.sku || "N/A"}</li>
                {product.stock && <li>Available Stock: {product.stock}</li>}
                {product.warrantyInformation && (
                  <li>Warranty: {product.warrantyInformation}</li>
                )}
                {product.shippingInformation && (
                  <li>Shipping: {product.shippingInformation}</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <ProductsCarousel
              title="Related Products"
              products={relatedProducts}
            />
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
          <div className="relative w-full max-w-4xl p-4">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute right-4 top-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={product.images[selectedImage] || product.thumbnail}
              alt={product.title}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="flex justify-center mt-4 gap-2">
              {product.images?.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`border rounded-md overflow-hidden cursor-pointer w-16 ${
                    selectedImage === index ? "border-white" : "border-gray-600"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-12 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetails;
