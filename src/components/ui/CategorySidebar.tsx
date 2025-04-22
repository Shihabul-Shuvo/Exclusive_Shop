// components/ui/CategorySidebar.tsx
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useProductCategories } from "../../hooks/useProducts";

interface CategorySidebarProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

const formatCategoryName = (name: string | undefined): string => {
  if (!name || typeof name !== "string") return "";
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const CategorySidebar = ({ mobile = false, onItemClick }: CategorySidebarProps) => {
  const { data: categories, isLoading } = useProductCategories();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const specialCategories = {
    womens: [
      "womens-dresses",
      "womens-shoes",
      "womens-watches",
      "womens-bags",
      "womens-jewellery",
    ],
    mens: ["mens-shirts", "mens-shoes", "mens-watches"],
  };

  const getNestedCategories = (mainCategory: string) => {
    if (!categories) return [];
    return categories.filter((cat) =>
      specialCategories[mainCategory as keyof typeof specialCategories]?.includes(cat)
    );
  };

  if (isLoading) {
    return <div className="p-4">Loading categories...</div>;
  }

  return (
    <div className={`${mobile ? 'w-full' : 'rounded-md overflow-hidden h-[500px] w-full relative'}`}>
      <ul className={`${mobile ? '' : 'overflow-y-auto h-full'}`}>
        {/* Women's Fashion */}
        <li
          className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50"
          onClick={() => toggleCategory("womens")}
        >
          <span>Woman's Fashion</span>
          <ChevronRight
            className={`w-4 h-4 transition-transform ${
              expandedCategory === "womens" ? "rotate-90" : ""
            }`}
          />
        </li>

        {expandedCategory === "womens" &&
          getNestedCategories("womens")?.map((cat) => (
            <li key={cat} className="pl-8 py-2 hover:bg-gray-50">
              <Link 
                to={`/category/${cat}`} 
                className="block"
                onClick={() => mobile && onItemClick?.()}
              >
                {formatCategoryName(cat)}
              </Link>
            </li>
          ))}

        {/* Men's Fashion */}
        <li
          className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50"
          onClick={() => toggleCategory("mens")}
        >
          <span>Men's Fashion</span>
          <ChevronRight
            className={`w-4 h-4 transition-transform ${
              expandedCategory === "mens" ? "rotate-90" : ""
            }`}
          />
        </li>

        {expandedCategory === "mens" &&
          getNestedCategories("mens")?.map((cat) => (
            <li key={cat} className="pl-8 py-2 hover:bg-gray-50">
              <Link 
                to={`/category/${cat}`} 
                className="block"
                onClick={() => mobile && onItemClick?.()}
              >
                {formatCategoryName(cat)}
              </Link>
            </li>
          ))}

        {/* Other Categories */}
        {categories
          ?.filter(
            (cat) =>
              !specialCategories.womens.includes(cat) &&
              !specialCategories.mens.includes(cat)
          )
          ?.map((cat) => (
            <li key={cat} className="p-4 hover:bg-gray-50">
              <Link 
                to={`/category/${cat}`} 
                className="block"
                onClick={() => mobile && onItemClick?.()}
              >
                {formatCategoryName(cat)}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;