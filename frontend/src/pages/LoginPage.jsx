import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const validUsers = [
  { role: "project-manager", username: "pm", password: "123" },
  { role: "hr", username: "hr", password: "123" },
  { role: "admin", username: "admin", password: "123" },
  { role: "client", username: "client", password: "123" },
  { role: "sales", username: "sales", password: "123" },
  { role: "finance", username: "finance", password: "123" },
];

export default function LoginPage() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = validUsers.find(
      (u) => u.role === role && u.username === username && u.password === password
    );
    if (user) {
      navigate(`/${user.role}`);
    } else {
      setError("Invalid role, username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Select Role</label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">-- Select Role --</option>
              <option value="project-manager">Project Manager</option>
              <option value="hr">HR</option>
              <option value="admin">Admin</option>
              <option value="client">Client</option>
              <option value="sales">Sales</option>
              <option value="finance">Finance</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-gray-700 text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot password link */}
          <div className="text-right text-sm mb-4">
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => alert("Redirect to forgot password page")}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>

      {/* New user sign-up */}
<div className="mt-6 text-center text-sm">
  <span className="text-gray-600">New user?</span>{" "}
  <Link
    to="/signup"
    className="text-blue-500 hover:underline"
  >
    Sign up
  </Link>
</div>

      </div>
    </div>
  );
}
