import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, "Phone number is not valid")
    .required("Phone number is required"),
  message: yup.string().required("Message is required")
});

type FormData = yup.InferType<typeof schema>;

const Contact = () => {
  const [statusMessage, setStatusMessage] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FormData) => {
    console.log("Submitted Data:", data);
    setStatusMessage("Your message has been sent! We'll get back to you soon.");
    reset();
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-2 text-gray-500 mb-8">
          <a href="/" className="hover:text-[#e74c3c]">Home</a>
          <span>/</span>
          <span className="text-black">Contact</span>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Contact Info */}
          <div className="md:w-1/3">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Phone className="text-[#e74c3c] w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg">Call To Us</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">We are available 24/7, 7 days a week.</p>
              <p className="text-sm text-gray-600">Phone: +8801611112222</p>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Mail className="text-[#e74c3c] w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg">Write To Us</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Fill out our form and we will contact you within 24 hours.</p>
              <p className="text-sm text-gray-600">Emails: customer@exclusive.com</p>
              <p className="text-sm text-gray-600">Emails: support@exclusive.com</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <MapPin className="text-[#e74c3c] w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg">Visit Us</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Come say hello at our office headquarters.</p>
              <p className="text-sm text-gray-600">100 Main Street, City Center</p>
              <p className="text-sm text-gray-600">New York, NY 10001</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-2/3">
            <div className="bg-gray-50 p-8 rounded-lg">
              {statusMessage && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md text-sm">
                  {statusMessage}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      {...register("name")}
                      placeholder="Your Name *"
                      className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-[#e74c3c]"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="Your Email *"
                      className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-[#e74c3c]"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      {...register("phone")}
                      placeholder="Your Phone *"
                      className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-[#e74c3c]"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <textarea
                    {...register("message")}
                    placeholder="Your Message"
                    rows={6}
                    className="border rounded-md px-4 py-2 w-full focus:outline-none focus:border-[#e74c3c]"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#e74c3c] text-white px-8 py-3 rounded-md hover:bg-[#c0392b] transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.03612512146!2d-74.30932960709094!3d40.697539963305694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2suk!4v1713980966619!5m2!1sen!2suk"
                width="100%"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
