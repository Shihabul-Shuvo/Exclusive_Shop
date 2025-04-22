
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-medium mb-6">Reset Password</h1>
          <p className="text-gray-600 mb-8">Enter your email to reset your password</p>
          
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-md px-4 py-2"
            />
            <input
              type="text"
              placeholder="Verification Code"
              className="w-full border rounded-md px-4 py-2"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-md px-4 py-2"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border rounded-md px-4 py-2"
            />
            
            <button 
              type="submit"
              className="w-full bg-brand-primary text-white rounded-md py-3 font-medium"
            >
              Reset Password
            </button>
          </form>
          
          <p className="text-center mt-6">
            Remember your password?{" "}
            <Link to="/login" className="text-brand-primary">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
