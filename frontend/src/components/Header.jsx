import React, { useState } from 'react';
import { Menu, X, Zap, ChevronDown, Building2, Users, BarChart3, Phone, Mail, Settings, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    // In your actual implementation, use: navigate(path)
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Enhanced Logo Section */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:scale-102 transition-transform duration-200"
            onClick={() => handleNavigation('/')}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <Zap className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                DMS Pro
              </span>
              <span className="text-xs text-gray-500 font-medium tracking-wider">
                ERP • CRM • BUSINESS
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Solutions Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                <span className="font-medium">Solutions</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 space-y-3">
                    <a href="#erp" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">ERP System</div>
                        <div className="text-sm text-gray-500">Complete business management solution</div>
                      </div>
                    </a>
                    <a href="#crm" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                        <Users className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">CRM Platform</div>
                        <div className="text-sm text-gray-500">Customer relationship management</div>
                      </div>
                    </a>
                    <a href="#analytics" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Analytics Suite</div>
                        <div className="text-sm text-gray-500">Advanced business intelligence</div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="#features" className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium">
              Features
            </a>
            <a href="#modules" className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium">
              Modules
            </a>
            <a href="#pricing" className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium">
              Pricing
            </a>
            <a href="#support" className="px-4 py-2 text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 font-medium">
              Support
            </a>

            {/* Contact Info */}
            <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
                <Phone className="w-4 h-4" />
                <span className="font-medium">+1-800-DMS-PRO</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 ml-6">
              <button
                onClick={() => handleNavigation('/login')}
                className="text-blue-600 border border-blue-200 px-5 py-2.5 rounded-lg font-medium hover:bg-blue-50 hover:border-blue-300 hover:scale-105 transition-all duration-200"
              >
                Sign In
              </button>

              <button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200 relative overflow-hidden group">
                <span className="relative z-10">Free Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-4">
              {/* Mobile Solutions Section */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">
                  Solutions
                </div>
                <a href="#erp" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">ERP System</div>
                    <div className="text-xs text-gray-500">Complete business management</div>
                  </div>
                </a>
                <a href="#crm" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">CRM Platform</div>
                    <div className="text-xs text-gray-500">Customer relationship management</div>
                  </div>
                </a>
                <a href="#analytics" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Analytics Suite</div>
                    <div className="text-xs text-gray-500">Business intelligence</div>
                  </div>
                </a>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2">
                <a href="#features" className="block p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium">
                  Features
                </a>
                <a href="#modules" className="block p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium">
                  Modules
                </a>
                <a href="#pricing" className="block p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium">
                  Pricing
                </a>
                <a href="#support" className="block p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium">
                  Support
                </a>
              </div>

              {/* Mobile Contact */}
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">+1-800-DMS-PRO</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">info@dmspro.com</span>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <button
                  onClick={() => handleNavigation('/login')}
                  className="w-full text-blue-600 border border-blue-200 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Sign In
                </button>
                <button className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                  Get Free Demo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;