import React, { useState } from "react";
import { Eye, EyeOff, User, Lock, UserCheck, AlertCircle } from "lucide-react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const validUsers = [
  { role: "project-manager", username: "pm", password: "123", displayName: "Project Manager" },
  { role: "hr", username: "hr", password: "123", displayName: "HR" },
  { role: "admin", username: "admin", password: "123", displayName: "Admin" },
  { role: "client", username: "client", password: "123", displayName: "Client" },
  { role: "sales", username: "sales", password: "123", displayName: "Sales" },
  { role: "finance", username: "finance", password: "123", displayName: "Finance" },
];

const roleOptions = [
  { value: "project-manager", label: "Project Manager", icon: "👔" },
  { value: "hr", label: "HR", icon: "👥" },
  { value: "admin", label: "Admin", icon: "⚙️" },
  { value: "client", label: "Client", icon: "🤝" },
  { value: "sales", label: "Sales", icon: "💼" },
  { value: "finance", label: "Finance", icon: "💰" },
];

export default function LoginPage() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  const handleInputChange = (field, value) => {
    if (field === 'role') setRole(value);
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);

    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleBlur = (field) => {
    setTouchedFields({ ...touchedFields, [field]: true });
  };

  const validateForm = () => {
    if (!username.trim()) return "Username is required";
    if (!password) return "Password is required";
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate API call delay
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = validUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        alert(`Welcome ${user.displayName}! Redirecting to /${user.role} dashboard...`);
        // In a real app: navigate(`/${user.role}`);

        // Reset form after successful login
        // setRole("");
        setUsername("");
        setPassword("");
        setTouchedFields({});
      } else {
        setError("Invalid role, username or password. Please check your credentials and try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert("Forgot password functionality would redirect to password reset page");
  };



  const getFieldError = (field) => {
    if (!touchedFields[field]) return null;

    switch (field) {
      case 'role':
        return !role ? "Please select a role" : null;
      case 'username':
        return !username.trim() ? "Username is required" : null;
      case 'password':
        return !password ? "Password is required" : null;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen mt-20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <UserCheck className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-gray-600">Sign in to your account</p>
            </div>

            <div className="space-y-6">
              {/* Role Selection */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Role
                </label>
                <div className="relative">
                  <UserCheck className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none bg-white ${getFieldError('role') ? 'border-red-500' : 'border-gray-300'
                      }`}
                    value={role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    onBlur={() => handleBlur('role')}
                  >
                    <option value="">-- Select Your Role --</option>
                    {roleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.icon} {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {getFieldError('role') && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {getFieldError('role')}
                  </p>
                )}
              </div> */}

              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${getFieldError('username') ? 'border-red-500' : 'border-gray-300'
                      }`}
                    value={username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    onBlur={() => handleBlur('username')}
                    placeholder="Enter your username"
                  />
                </div>
                {getFieldError('username') && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {getFieldError('username')}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${getFieldError('password') ? 'border-red-500' : 'border-gray-300'
                      }`}
                    value={password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onBlur={() => handleBlur('password')}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {getFieldError('password') && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {getFieldError('password')}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline transition"
                >
                  Forgot password?
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {error}
                  </p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02]'
                  }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            {/* Sign Up Link */}
            {/* <div className="mt-8 text-center">
              <p className="text-gray-600">
                New to our platform?{' '}
                <Link
                  to="/signup"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition"
                >
                  Sign up
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}