import { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const validation = yup.object().shape({
  email: yup
  .string()
  .required("Email is required")
  .email("Invalid email address"),
  username: yup
    .string()
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, 
             "Password must contain at least one letter and one number"),
  name: yup
    .string()
    .required("Name is required"),
  address: yup
    .string()
    .required("Address is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
});



type FormData = yup.InferType<typeof validation>

const SignUp = () => {
  const navigate = useNavigate()
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(validation)
  })

  const onSubmit = (data: FormData) => {
    // For now just log the data, simulate registration
    console.log("User registered:", data)

    setMessage({ text: "Account created successfully! Redirecting to login...", type: "success" })

    setTimeout(() => {
      navigate("/login")
    }, 2000)
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#ebf5f8] rounded-lg p-8 flex items-center">
          <img
            src="/lovable-uploads/25ae28e9-a6ba-4ddc-8459-cbeed96db6a8.png"
            alt="Shopping"
            className="w-full h-auto"
          />
        </div>
        <div>
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-medium mb-6">Create an account</h1>
            <p className="text-gray-600 mb-8">Enter your details below</p>

            {message && (
              <div
                className={`mb-4 p-3 rounded-md text-sm ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full border rounded-md px-4 py-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                  className="w-full border rounded-md px-4 py-2"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                )}
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className="w-full border rounded-md px-4 py-2"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                  className="w-full border rounded-md px-4 py-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address"
                  {...register("address")}
                  className="w-full border rounded-md px-4 py-2"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone"
                  {...register("phone")}
                  className="w-full border rounded-md px-4 py-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#e74c3c] text-white rounded-md py-3 font-medium"
              >
                Create Account
              </button>

              <button className="w-full border rounded-md py-3 flex items-center justify-center gap-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>
            </form>

            <p className="text-center mt-6">
              Already have account?{" "}
              <Link to="/login" className="text-[#e74c3c]">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SignUp
