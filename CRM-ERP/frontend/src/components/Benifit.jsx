import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Target, Shield, Zap, Users, BarChart3 } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: 'Save 40+ Hours Weekly',
    description: 'Automate repetitive tasks and streamline workflows to focus on growing your business.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Target,
    title: 'Increase Revenue by 30%',
    description: 'Better client tracking and project management leads to more successful deliveries.',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    icon: Shield,
    title: '100% Compliance Ready',
    description: 'Built-in GST, TDS, and tax calculations ensure you stay compliant effortlessly.',
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Zap,
    title: 'Real-time Insights',
    description: 'Get instant visibility into your business performance with comprehensive dashboards.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Users,
    title: 'Better Client Relations',
    description: 'Centralized communication logs and automated reminders improve client satisfaction.',
    color: 'from-pink-500 to-pink-600'
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Decisions',
    description: 'Make informed business decisions with detailed analytics and reporting.',
    color: 'from-indigo-500 to-indigo-600'
  }
];

const Benefits= () => {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Transform Your DMS Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of digital marketing agencies that have revolutionized 
            their operations with our integrated CRM & ERP solution.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-blue-100 mb-6">
              Start your free 14-day trial today and experience the difference our platform can make.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Get Started Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;