import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

const sliderItems: SliderItem[] = [
  {
    id: 1,
    image: "/lovable-uploads/de2f98fe-dd02-4e0b-88c3-5f0347ebbe06.png",
    title: "iPhone 14 Series",
    subtitle: "Up to 10% off Voucher",
    buttonText: "Shop Now",
    buttonLink: "/products/category/smartphones",
  },
  {
    id: 2,
    title: "Latest Fashion",
    subtitle: "Up to 30% off on all fashion items",
    image:
      "https://cdn.dummyjson.com/products/images/womens-dresses/Midi%20Dress/thumbnail.png",
    buttonText: "Shop Collection",
    buttonLink: "/products/category/womens-dresses",
  },
  {
    id: 3,
    title: "Electronics Sale",
    subtitle: "Latest gadgets at amazing prices",
    image:
      "https://cdn.dummyjson.com/products/images/laptops/MacBook%20Pro/thumbnail.png",
    buttonText: "Shop Now",
    buttonLink: "/products/category/laptops",
  },
  {
    id: 4,
    title: "Home Decor",
    subtitle: "Transform your living space",
    image:
      "https://cdn.dummyjson.com/products/images/home-decoration/3D%20Embellishment%20Art%20Lamp/thumbnail.png",
    buttonText: "Explore",
    buttonLink: "/products/category/home-decoration",
  },
  {
    id: 5,
    title: "Beauty Products",
    subtitle: "Self care is essential",
    image:
      "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
    buttonText: "View All",
    buttonLink: "/products/category/beauty",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === sliderItems.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderItems.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden bg-black h-[500px]">
      <div
        className="flex transition-transform duration-500 h-full"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${sliderItems.length * 100}%`,
        }}
      >
        {sliderItems.map((item) => (
          <div key={item.id} className="relative min-w-full h-full">
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-1/2 flex flex-col justify-center p-10 md:p-20">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {item.title}
                </h2>
                <p className="text-xl md:text-3xl text-white mb-8">
                  {item.subtitle}
                </p>
                <Link
                  to={item.buttonLink}
                  className="inline-block bg-transparent border border-white text-white px-6 py-3 rounded w-max"
                >
                  {item.buttonText} →
                </Link>
              </div>
              <div className="md:w-1/2 flex items-center justify-center p-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-[400px] max-w-full object-contain"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 p-2 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 p-2 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {sliderItems.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? "bg-[#e74c3c]" : "bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
