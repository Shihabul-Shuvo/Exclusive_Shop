import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile";
import ProductCard from "./ui/ProductCard";
import FlashSalesTimer from "./FlashSalesTimer";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  discountPercentage?: number;
  rating?: number;
  category?: string;
}

interface ProductsCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllLink?: string;
  showTimer?: boolean;
  flashSaleEndDate?: Date;
}

const ProductsCarousel = ({
  title,
  subtitle,
  products,
  viewAllLink,
  showTimer = false,
  flashSaleEndDate,
}: ProductsCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Adjust items per page based on screen size
  useEffect(() => {
    if (isMobile) {
      setItemsPerPage(1);
    } else {
      setItemsPerPage(5);
    }
  }, [isMobile]);

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          {subtitle && (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-6 bg-[#e74c3c]"></div>
              <span className="text-[#e74c3c] font-medium">{subtitle}</span>
            </div>
          )}
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            {showTimer && flashSaleEndDate && (
              <span className="ml-10">
                <FlashSalesTimer endDate={flashSaleEndDate} />
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-2 border rounded-full ${
              currentIndex === 0
                ? "text-gray-300 border-gray-300"
                : "text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex + itemsPerPage >= products.length}
            className={`p-2 border rounded-full ${
              currentIndex + itemsPerPage >= products.length
                ? "text-gray-300 border-gray-300"
                : "text-black border-gray-300 hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="min-w-[100%] sm:min-w-[50%] md:min-w-[33.333%] lg:min-w-[20%] px-2"
              style={{ width: `${100 / itemsPerPage}%` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {viewAllLink && (
        <div className="mt-6 text-center">
          <Link
            to={viewAllLink}
            className="inline-block py-3 px-8 bg-[#e74c3c] text-white rounded-md hover:bg-[#c0392b] transition-colors"
            state={{ products }} // Pass products as state to the destination page
          >
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductsCarousel;
