
import { Link } from "react-router-dom";

const featuredProducts = [
  {
    id: 1,
    title: "PlayStation 5",
    description: "Brand new Sony version of the PS5 coming out on sale.",
    image: "https://cdn.dummyjson.com/products/images/furniture/Sony%20PlayStation%205/thumbnail.png",
    link: "/products/category/furniture",
    size: "large", // large, medium, or small
  },
  {
    id: 2,
    title: "Women's Collections",
    description: "Featured women collections that give you another view.",
    image: "https://cdn.dummyjson.com/products/images/womens-dresses/Midi%20Dress/thumbnail.png",
    link: "/products/category/womens-dresses",
    size: "medium",
  },
  {
    id: 3,
    title: "Speakers",
    description: "Amazon wireless speakers.",
    image: "https://cdn.dummyjson.com/products/images/sports-accessories/Soundbox%20Mini%20Speaker/thumbnail.png",
    link: "/products/category/sports-accessories",
    size: "small",
  },
  {
    id: 4,
    title: "Perfume",
    description: "GUCCI INTENSE OUD EDP.",
    image: "https://cdn.dummyjson.com/products/images/fragrances/Purge%20Of%20Emotions%20Eau%20De%20Parfum/thumbnail.png",
    link: "/products/category/fragrances",
    size: "small",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-start flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-6 bg-[#e74c3c]"></div>
            <span className="text-[#e74c3c] font-medium">Featured</span>
          </div>
          <h2 className="text-2xl font-bold">New Arrival</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 md:row-span-2 bg-black text-white rounded-lg overflow-hidden">
          <div className="h-full flex flex-col justify-end p-6 relative">
            <img 
              src={featuredProducts[0].image} 
              alt={featuredProducts[0].title}
              className="absolute top-0 left-0 w-full h-full object-contain p-4"
            />
            <div className="relative">
              <h3 className="text-xl font-bold mb-2">{featuredProducts[0].title}</h3>
              <p className="text-sm mb-4">{featuredProducts[0].description}</p>
              <Link to={featuredProducts[0].link} className="inline-block text-white border-b border-white hover:text-gray-300">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-black text-white rounded-lg overflow-hidden">
          <div className="h-full flex flex-col justify-end p-6 relative">
            <img 
              src={featuredProducts[1].image} 
              alt={featuredProducts[1].title}
              className="absolute top-0 right-0 h-full object-contain p-4"
            />
            <div className="relative max-w-[50%]">
              <h3 className="text-xl font-bold mb-2">{featuredProducts[1].title}</h3>
              <p className="text-sm mb-4">{featuredProducts[1].description}</p>
              <Link to={featuredProducts[1].link} className="inline-block text-white border-b border-white hover:text-gray-300">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
        
        {featuredProducts.slice(2).map((product, index) => (
          <div key={product.id} className="bg-black text-white rounded-lg overflow-hidden">
            <div className="h-48 flex flex-col justify-end p-6 relative">
              <img 
                src={product.image} 
                alt={product.title}
                className="absolute top-0 right-0 h-full object-contain p-4"
              />
              <div className="relative max-w-[60%]">
                <h3 className="text-lg font-bold mb-1">{product.title}</h3>
                <p className="text-xs mb-2">{product.description}</p>
                <Link to={product.link} className="inline-block text-sm text-white border-b border-white hover:text-gray-300">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
