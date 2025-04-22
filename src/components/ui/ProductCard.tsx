import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    discountPercentage?: number;
    rating?: number;
    category?: string;
    description?: string;
  };
  showAddToCart?: boolean;
}

const ProductCard = ({ product, showAddToCart=true }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const discountedPrice = product.discountPercentage
    ? (
        product.price -
        (product.price * product.discountPercentage) / 100
      ).toFixed(2)
    : null;

  return (
    <div
      className="relative group border rounded-md overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Tag */}
      {product.discountPercentage && product.discountPercentage > 0 && (
        <div className="absolute top-2 left-2 bg-[#e74c3c] text-white text-xs px-2 py-1 rounded-md z-10">
          -{Math.round(product.discountPercentage)}%
        </div>
      )}

      {/* Product Image */}
      <Link
        to={`/products/${product.id}`}
        className="block relative h-48 overflow-hidden"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Action buttons visible on hover */}
        <div
          className={`absolute right-2 top-2 flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleToggleWishlist}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
            aria-label="Add to wishlist"
          >
            <Heart
              className={`w-4 h-4 ${
                isInWishlist(product.id) ? "fill-[#e74c3c] text-[#e74c3c]" : ""
              }`}
            />
          </button>
          <Link
            to={`/products/${product.id}`}
            className="p-2 bg-white rounded-full shadow hover:bg-gray-100 flex items-center justify-center"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-medium text-sm mb-1 line-clamp-1">
            {product.title}
          </h3>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-[#e74c3c] font-semibold">
              ${discountedPrice || product.price}
            </span>
            {discountedPrice && (
              <span className="text-gray-400 text-sm line-through">
                ${product.price}
              </span>
            )}
          </div>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.round(product.rating ?? 0)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-gray-500 text-xs ml-1">
              ({product.rating})
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        {showAddToCart && (
          <div
            className={`transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white text-sm py-2 rounded-md mt-2 flex items-center justify-center gap-2 hover:bg-[#e74c3c] transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Add To Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
