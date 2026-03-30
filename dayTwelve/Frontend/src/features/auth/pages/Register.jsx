import axios from "axios";
import { useState } from "react";
import { Link } from "react-router";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, password);

    axios
      .post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
          password,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
      });
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
              name="username"
              onInput={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="email"
              name="email"
              onInput={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />

            <input
              type="password"
              name="password"
              onInput={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-[#1a1a1a] border border-gray-700 text-white placeholder-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md font-semibold mt-2 hover:bg-blue-600 transition"
            >
              Sign up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5 w-full">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="text-xs text-gray-400 font-semibold">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Login redirect */}
          <p className="text-sm text-gray-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 font-semibold hover:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
