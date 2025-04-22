
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
        <h1 className="text-9xl font-bold text-[#e74c3c] mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-600 mb-8 text-center max-w-lg px-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/"
          className="bg-[#e74c3c] text-white px-8 py-3 rounded-md hover:bg-[#c0392b] transition-colors"
        >
          Back to home page
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
