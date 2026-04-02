import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { user, loading, handleLogin } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin(username, password);

    console.log("User logged in");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-[#121212] border border-gray-800 rounded-lg px-8 py-10 flex flex-col items-center shadow-md">
          {/* Logo */}
          <h1 className="text-3xl font-semibold text-white mb-6 tracking-wide">
            Instagram
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
            <input
              type="text"
              onInput={(e) => setUsername(e.target.value)}
              placeholder="Phone number, username, or email"
              className="bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="password"
              placeholder="Password"
              onInput={(e) => setPassword(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md font-semibold mt-2 hover:bg-blue-600 transition"
            >
              Log in
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5 w-full">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-xs text-gray-400 font-semibold">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Facebook login */}
          <button className="text-blue-400 font-semibold text-sm hover:text-blue-500">
            Log in with Facebook
          </button>

          {/* Forgot */}
          <p className="text-xs text-gray-400 mt-4 cursor-pointer hover:underline">
            Forgot password?
          </p>
        </div>

        {/* Sign up */}
        <div className="bg-[#121212] border border-gray-800 rounded-lg mt-4 py-4 text-center">
          <p className="text-sm text-gray-300">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 font-semibold cursor-pointer"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
