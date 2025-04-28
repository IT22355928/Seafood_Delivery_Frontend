import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } else if (username === "user" && password === "user123") {
      navigate("/homepage");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div 
      className="min-h-screen flex justify-center items-center p-4"  // Changed to justify-center
      style={{ 
        backgroundImage: "url('https://thumbs.dreamstime.com/b/fresh-lobster-resting-ice-assorted-shellfish-lemon-wedges-whole-cooked-presented-bed-surrounded-various-345348877.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div 
        className="rounded-lg border shadow-sm w-full max-w-md bg-white bg-opacity-90"  // Removed mr-8
        style={{ border: "1px solid black" }}
      >
        <div className="flex flex-col space-y-1.5 p-6 pb-4">
          <h3 className="font-semibold tracking-tight text-2xl text-center">Login</h3>
          <p className="text-sm text-center">This demo uses for authentication.</p>
        </div>
        <div className="flex items-center p-6 pt-0 text-sm">
          <form onSubmit={handleSubmit} className="w-full">
            {error && (
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                Invalid username or password!
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1" htmlFor="email">
                Username
              </label>
              <input
                className="px-2 py-1.5 font-normal w-full bg-[#F1F5F9] outline-0 border rounded-md"
                id="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                style={{ border: "1px solid black" }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-1" htmlFor="password">
                Password
              </label>
              <input
                className="px-2 py-1.5 w-full bg-[#F1F5F9] outline-0 border rounded-md"
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={{ border: "1px solid black" }}
              />
            </div>

            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-white hover:bg-black/90 h-10 px-4 py-2 w-full mb-4">
              Sign in
            </button>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <button 
                type="button"
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:underline focus:outline-none"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;