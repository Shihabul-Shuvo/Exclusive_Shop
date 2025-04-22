import { useState, useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import CategorySidebar from "./ui/CategorySidebar";
import { useIsMobile } from "../hooks/use-mobile";

const CategoryMenu = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        sidebarOpen &&
        sidebarRef.current && 
        !sidebarRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

   

    document.addEventListener("mousedown", handleOutsideClick);
    
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          ref={buttonRef}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg mb-4"
          aria-label="Toggle categories"
        >
          <Menu className="w-5 h-5" />
          <span>Categories</span>
        </button>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Categories</h2>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="text-gray-600 text-xl"
              aria-label="Close menu"
            >
              &times;
            </button>
          </div>
          <div className="h-[calc(100%-57px)] overflow-y-auto">
            <CategorySidebar mobile onItemClick={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && <CategorySidebar />}
    </>
  );
};

export default CategoryMenu;