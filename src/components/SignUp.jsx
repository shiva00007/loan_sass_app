import { FaMailBulk, FaPhone, FaUser, FaLock } from "react-icons/fa";
import FormInput from "./FormInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  // State to manage form data with initial values
  const [form, setForm] = useState({
    username: "",
    email: "",
    phNumber: "",
    password: "",
  });

  // State to manage error messages
  const [error, setError] = useState("");

  // navigate after successful signup
  const navigate = useNavigate();

  // To handle input changes and update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  //  To handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Reset error state

    // Destructure a value
    const { username, email, phNumber, password } = form;

    // Check if all fields are filled
    if (!username || !email || !phNumber || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    // Fetch API call to submit form data to the backend
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email,
          phoneNumber: phNumber,
          password,
        }),
      });

      const data = await response.json(); // Parse the response data

      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error(data.message || "Signup failed. Please try again.");
      }

      // Navigate to the login page after successful signup
      navigate("/login");
    } catch (error) {
      // Set the error message if signup fails
      setError(error.message || "Error signing up. Please try again.");
      // console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-discount-gradient p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl text-center sm:text-3xl font-bold text-gradient mb-6">
          Sign Up
        </h1>
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          {/* Username Input Field */}
          <FormInput
            id="username"
            name="username"
            type="text"
            label="Username"
            placeholder="Enter your Name"
            icon={<FaUser className="text-gray-500" />}
            value={form.username}
            onChange={handleChange}
            required
            autoComplete="name"
          />
          {/* Email Input Field */}
          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your Email"
            icon={<FaMailBulk className="text-gray-500" />}
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          {/* Phone Number Input Field */}
          <FormInput
            id="phNumber"
            name="phNumber"
            type="tel"
            label="Mobile Number"
            placeholder="Enter your phone number"
            icon={<FaPhone className="text-gray-500" />}
            value={form.phNumber}
            onChange={handleChange}
            required
            autoComplete="tel"
          />
          {/* Password Input Field */}
          <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your Password"
            icon={<FaLock className="text-gray-500" />}
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          {/* Error message display */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-gradient text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Sign Up
          </button>

          {/* Link to login page */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-white">
            <span className="flex justify-center items-center text-white text-xl">
              Already have an account?
            </span>
            <Link
              to="/login"
              className="text-center text-white hover:text-teal-500 text-xl"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
