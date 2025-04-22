
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "How can I track my order?",
      answer: "You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account and viewing the order details."
    },
    {
      question: "How do I return an item?",
      answer: "To return an item, please go to your account, view the order, and click on 'Return Item'. Follow the instructions to print a return label and arrange for pickup or drop-off."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping typically takes 3-7 business days, depending on your location. Express shipping options are available at checkout for faster delivery."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping to most countries. Shipping costs and times vary depending on the destination."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept credit/debit cards (Visa, Mastercard, American Express), PayPal, and various local payment methods depending on your region."
    },
    {
      question: "Can I change or cancel my order?",
      answer: "You can change or cancel your order within 1 hour of placing it. After that, please contact our customer support team for assistance."
    },
    {
      question: "Do you offer a loyalty program?",
      answer: "Yes, we offer a loyalty program where you earn points with each purchase. These points can be redeemed for discounts on future purchases."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can contact our customer support team through the Contact page on our website, by emailing support@exclusive.com, or by calling +88015-88888-9999."
    }
  ];
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-10">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-medium text-left">{faq.question}</h3>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
              
              {openIndex === index && (
                <div className="p-4 bg-white">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6">Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <a 
            href="/contact" 
            className="inline-block bg-[#e74c3c] text-white px-6 py-3 rounded-md hover:bg-[#c0392b] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
