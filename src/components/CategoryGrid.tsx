
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  FiSmartphone,
  FiMonitor,
  FiWatch,
  FiCamera,
  FiHeadphones,
  FiShoppingBag,
} from "react-icons/fi";

const categories = [
  {
    id: 1,
    name: "Phones",
    icon: <FiSmartphone />,
    slug: "smartphones",
  },
  {
    id: 2,
    name: "Computers",
    icon: <FiMonitor />,
    slug: "laptops",
  },
  {
    id: 3,
    name: "SmartWatch",
    icon: <FiWatch />,
    slug: "womens-watches",
  },
  {
    id: 4,
    name: "Camera",
    icon: <FiCamera />,
    slug: "beauty",
  },
  {
    id: 5,
    name: "Headphones",
    icon: <FiHeadphones />,
    slug: "mobile-accessories",
  },
  {
    id: 6,
    name: "Gaming",
    icon: <FiShoppingBag />,
    slug: "sports-accessories",
  },
];


const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug: string) => {
    navigate(`/category/${slug}`);
  };

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-start flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-6 bg-[#e74c3c]"></div>
            <span className="text-[#e74c3c] font-medium">Categories</span>
          </div>
          <h2 className="text-2xl font-bold">Browse By Category</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 border rounded-full">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 border rounded-full">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.slug)}
            className="border rounded-md p-4 flex flex-col items-center justify-center h-28 hover:border-[#e74c3c] transition-colors text-center"
          >
            <div className="text-3xl mb-2">{category.icon}</div>
            <span className="text-sm">{category.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
