import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';

const MobileMenu = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="md:hidden relative" ref={menuRef}>
      {/* Three-Dot Menu Button */}
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
        <MoreHorizontal className="w-6 h-6" />
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute left-0 top-10 w-48 bg-white shadow-md rounded-md z-50">
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Home
          </Link>
          <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            Contact
          </Link>
          <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            About
          </Link>
          {!isLoggedIn && (
            <Link to="/signup" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Sign Up
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileMenu;

