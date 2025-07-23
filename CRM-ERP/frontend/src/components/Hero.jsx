import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, BarChart3, FileText } from 'lucide-react';

const Hero= () => {
  return (
    <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Integrated{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CRM & ERP
              </span>{' '}
              for DMS Companies
            </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              Streamline your digital marketing services business with our comprehensive 
              platform that combines client management, project tracking, financial operations, 
              and compliance reporting in one powerful solution.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-shadow flex items-center justify-center group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                Watch Demo
              </motion.button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-gray-600 text-sm">Active Clients</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-emerald-600">98%</div>
                <div className="text-gray-600 text-sm">Customer Satisfaction</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-purple-600">24/7</div>
                <div className="text-gray-600 text-sm">Support Available</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-red-500 rounded-full"></div>
              <div className="absolute -top-4 -left-4 ml-10 w-8 h-8 bg-yellow-500 rounded-full"></div>
              <div className="absolute -top-4 -left-4 ml-20 w-8 h-8 bg-green-500 rounded-full"></div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Client Management</div>
                    <div className="text-sm text-gray-600">Track leads, projects & communications</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-emerald-50 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Financial Analytics</div>
                    <div className="text-sm text-gray-600">Real-time P&L reports & insights</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg">
                  <FileText className="w-8 h-8 text-purple-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Compliance Ready</div>
                    <div className="text-sm text-gray-600">GST, TDS & tax calculations</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;