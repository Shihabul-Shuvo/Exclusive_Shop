import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';  // For the 3-dot icon

const ThreedotMenu = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="md:hidden">
            {/* Three-Dot Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                <MoreHorizontal className="w-6 h-6" />
            </button>

            {/* Dropdown Menu for mobile */}
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

export default ThreedotMenu;
