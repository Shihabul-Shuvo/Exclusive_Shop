import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/ui/HeroSlider";
import FeaturedBanner from "../components/FeaturedBanner";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProducts } from "../hooks/useProducts";
import CategoryGrid from "../components/CategoryGrid";
import ProductsCarousel from "../components/ProductsCarousel";
import Services from "../components/Services";
import CategoryMenu from "../components/CategoryMenu";
import { useIsMobile } from "../hooks/use-mobile";

const Index = () => {
  const { data: productsData, isLoading, error } = useProducts();
  console.log("Products Data:", productsData?.products);
  const { data: discountedData } = useProducts({
    sortBy: "discountPercentage",
    order: "desc",
    limit: 10,
  });

  const { data: topRatedData } = useProducts({
    sortBy: "rating",
    order: "desc",
    limit: 10,
  });

  const [flashSaleEndDate] = useState(() => {
    // Set the flash sale to end exactly 3 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);
    return endDate;
  });

  useEffect(() => {
    if (error) {
      console.error("Error fetching products:", error);
    }
  }, [error]);
  console.log("Discounted Data:", discountedData?.products);
  const flashSaleProducts = discountedData?.products || [];
  console.log("Flash Sale Products:", flashSaleProducts);

  const topRatedProducts = topRatedData?.products || [];
  const newArrivalProducts = productsData?.products?.slice(0, 10) || [];
    const isMobile = useIsMobile();

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Mobile Categories Button - Rendered outside the grid */}
                {/* Mobile Menu */}
                {isMobile && (
                    <div className="mb-4">
                        <CategoryMenu />
                    </div>
                )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {/* Desktop Sidebar */}
                    {!isMobile && (
              <div className="border-r border-gray-500 pr-4">
                <CategoryMenu />
              </div>
                    )}

          {/* Hero Slider */}
          <div className="md:col-span-3">
            <HeroSlider />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e74c3c] mx-auto mb-4"></div>
            <p className="text-2xl">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Flash Sales */}
            <ProductsCarousel
              title="Flash Sales"
              subtitle="Today's"
              products={flashSaleProducts}
              viewAllLink="/flash-sales"
              showTimer={true}
              flashSaleEndDate={flashSaleEndDate}
            />

            {/* Categories Grid */}
            <CategoryGrid />

            {/* Top Rated Products */}
            <ProductsCarousel
              title="Top Rated Products"
              subtitle="This Month"
              products={topRatedProducts}
              viewAllLink="/top-rated"
            />

            <FeaturedBanner />

            <FeaturedProducts />

            <ProductsCarousel
              title="Explore Our Products"
              subtitle="Our Products"
              products={newArrivalProducts}
              viewAllLink="/products"
            />

            <Services />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
