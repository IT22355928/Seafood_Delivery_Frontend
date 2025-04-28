import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // In a real app, you would send this data to your backend
    console.log("Sign up data:", formData);
    
    // Simulate successful signup
    setSuccess(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div 
      className="min-h-screen flex justify-center items-center p-4"
      style={{ 
        backgroundImage: "url('https://thumbs.dreamstime.com/b/whole-lobster-various-seafood-items-like-crabs-mussels-shrimp-fish-displayed-wooden-table-covered-crushed-ice-354619664.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div 
        className="rounded-lg border-2 shadow-sm w-full max-w-md bg-white bg-opacity-90"
      >
        <div className="flex flex-col space-y-1.5 p-6 pb-4">
          <h3 className="font-semibold tracking-tight text-2xl text-center">Create Account</h3>
          <p className="text-sm text-center">Join us to get started</p>
        </div>
        <div className="flex items-center p-6 pt-0 text-sm">
          <form onSubmit={handleSubmit} className="w-full">
            {error && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
                Account created successfully! Redirecting to login...
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1" htmlFor="username">
                Username
              </label>
              <input
                className="px-2 py-1.5 font-normal w-full bg-[#F1F5F9] outline-0 rounded-md"
                id="username"
                name="username"
                type="text"
                onChange={handleChange}
                value={formData.username}
                required
                style={{ border: "1px solid black" }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="px-2 py-1.5 font-normal w-full bg-[#F1F5F9] outline-0 rounded-md"
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                required
                style={{ border: "1px solid black" }}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="px-2 py-1.5 w-full bg-[#F1F5F9] outline-0 rounded-md"
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
                required
                style={{ border: "1px solid black" }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="px-2 py-1.5 w-full bg-[#F1F5F9] outline-0 rounded-md"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                value={formData.confirmPassword}
                required
                style={{ border: "1px solid black" }}
              />
            </div>

            <button 
              type="submit"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-black/90 h-10 px-4 py-2 w-full"
            >
              Sign Up
            </button>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <button 
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;