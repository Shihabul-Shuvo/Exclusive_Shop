import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link} from "react-router-dom";
import { useIsLoggedIn } from "../hooks/log-state";

const Reviews = () => {
  useIsLoggedIn();

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-6">Your Reviews</h1>
            <p className="text-xl text-gray-600 mb-8">Your have no reviews yet</p>
            <Link 
              to="/" 
              className="bg-[#e74c3c] text-white px-8 py-3 rounded-md hover:bg-[#c0392b] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

      <Footer />
    </div>
  );
};
export default Reviews;
