
import { Truck, Headphones, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: <Truck className="w-10 h-10" />,
    title: "FREE AND FAST DELIVERY",
    description: "Free delivery for all orders over $140"
  },
  {
    icon: <Headphones className="w-10 h-10" />,
    title: "24/7 CUSTOMER SERVICE",
    description: "Friendly 24/7 customer support"
  },
  {
    icon: <ShieldCheck className="w-10 h-10" />,
    title: "MONEY BACK GUARANTEE",
    description: "We return money within 30 days"
  }
];

const Services = () => {
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full border-2 border-black">
              {service.icon}
            </div>
            <h4 className="font-bold mb-2">{service.title}</h4>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
