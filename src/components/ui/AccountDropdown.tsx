import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const AccountDropdown = ({ handleLogout }: { handleLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <User className="w-6 h-6 hover:text-[#e74c3c] hover:text-[#e74c3c] transition-colors cursor-pointer" />
        <span></span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Manage My Account
            </Link>
            <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              My Orders
            </Link>
            <Link to="/cancellations" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              My Cancellations
            </Link>
            <Link to="/reviews" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              My Reviews
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
