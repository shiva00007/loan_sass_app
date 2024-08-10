import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMailBulk, FaLock } from "react-icons/fa";
import FormInput from "./FormInput";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = form;
    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    //login api call
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      // Store JWT token in local storage
      localStorage.setItem("jwtToken", data.jwtToken);

      // Navigate to home page
      navigate("/");
    } catch (error) {
      setError(error.message || "Error logging in. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-discount-gradient p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-gradient mb-6 text-center">
          Login
        </h1>
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
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
            autoComplete="current-password"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-gradient text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          >
            Login
          </button>
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-white mt-4">
            <span className="mb-2 sm:mb-0">Don't Have an Account?</span>
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-700 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
