
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Twitter as TwitterIcon, Instagram as InstagramIcon, Linkedin as LinkedinIcon } from "lucide-react";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-4">About Our Company</h1>
          <p className="text-gray-600">
            Welcome to our online shopping destination. We're dedicated to providing you with the best shopping experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2015, our company began with a simple mission: to create an online shopping platform that brings quality products to customers around the world at affordable prices.
            </p>
            <p className="text-gray-600">
              What started as a small team working out of a garage has grown into a global e-commerce company with warehouses and offices across multiple countries. Throughout our growth, we've stayed true to our core values of customer satisfaction, product quality, and ethical business practices.
            </p>
          </div>
          <div className="order-first md:order-none">
            <img 
              src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" 
              alt="Our Team" 
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Customer First</h3>
              <p className="text-gray-600">
                We believe in putting our customers at the center of everything we do, ensuring their needs are met and their expectations are exceeded.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Quality Products</h3>
              <p className="text-gray-600">
                We meticulously select each product in our inventory, ensuring it meets our high standards of quality and value.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Ethical Practices</h3>
              <p className="text-gray-600">
                We are committed to ethical business practices, responsible sourcing, and reducing our environmental impact.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="text-center">
                <img 
                  src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 1}.jpg`} 
                  alt={`Team Member ${index + 1}`}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold">Team Member {index + 1}</h3>
                <p className="text-gray-600 text-sm">Position Title</p>
                <div className="flex justify-center mt-2 space-x-2">
                  <Link to="#" className="text-gray-500 hover:text-[#e74c3c]">
                    <TwitterIcon size={18} />
                  </Link>
                  <Link to="#" className="text-gray-500 hover:text-[#e74c3c]">
                    <InstagramIcon size={18} />
                  </Link>
                  <Link to="#" className="text-gray-500 hover:text-[#e74c3c]">
                    <LinkedinIcon size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <Link 
              to="/contact"
              className="bg-[#e74c3c] text-white px-6 py-3 rounded-md hover:bg-[#c0392b] transition-colors inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
