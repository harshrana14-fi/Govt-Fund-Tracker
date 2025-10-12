import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, FileText, Shield, CheckCircle, ChevronRight, Building, AlertTriangle, Database } from 'lucide-react';

const EnhancedFeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Shield,
      title: "Government-Grade Security",
      description: "Enterprise-level security protocols ensure all government data remains protected and confidential.",
      features: ["256-bit Encryption", "Multi-Factor Authentication", "Audit Trails"],
      gradient: "from-slate-600 via-slate-700 to-slate-800",
      mockBg: "from-slate-50 to-gray-50",
      badge: "SECURE"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics Dashboard",
      description: "Comprehensive data visualization with real-time insights into government spending patterns.",
      features: ["Real-time Monitoring", "Predictive Analytics", "Custom Reports"],
      gradient: "from-blue-600 via-blue-700 to-blue-800",
      mockBg: "from-blue-50 to-indigo-50",
      badge: "ANALYTICS"
    },
    {
      icon: FileText,
      title: "Official Documentation",
      description: "Generate official RTI applications and complaint letters with government-approved templates.",
      features: ["RTI Applications", "CPGRAMS Complaints", "Legal Compliance"],
      gradient: "from-emerald-600 via-emerald-700 to-emerald-800",
      mockBg: "from-emerald-50 to-green-50",
      badge: "OFFICIAL"
    },
    {
      icon: AlertTriangle,
      title: "Anomaly Detection System",
      description: "AI-powered detection system identifies irregularities and potential fraud in government spending.",
      features: ["Machine Learning", "Pattern Recognition", "Automated Alerts"],
      gradient: "from-amber-600 via-orange-600 to-red-600",
      mockBg: "from-amber-50 to-orange-50",
      badge: "DETECTION"
    },
    {
      icon: Building,
      title: "Multi-Department Access",
      description: "Secure access for government officials, citizens, and journalists with role-based permissions.",
      features: ["Role Management", "Secure Access", "Audit Logs"],
      gradient: "from-indigo-600 via-purple-600 to-indigo-700",
      mockBg: "from-indigo-50 to-purple-50",
      badge: "ACCESS"
    },
    {
      icon: Database,
      title: "Centralized Data Hub",
      description: "Comprehensive database of government projects with real-time updates and transparency metrics.",
      features: ["Real-time Updates", "Data Integrity", "Public Access"],
      gradient: "from-teal-600 via-cyan-600 to-teal-700",
      mockBg: "from-teal-50 to-cyan-50",
      badge: "DATA"
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [features.length]);


  const currentFeature = features[activeFeature];

  return (
    <motion.section 
      id="features"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden"
    >
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[size:20px_20px] opacity-30"></div>
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-100 to-slate-200 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-800 text-white text-sm font-semibold rounded-lg shadow-lg border border-slate-600">
              <Shield className="w-4 h-4 inline mr-2" />
              Government-Grade Platform
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Enterprise
            <motion.span 
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 6, repeat: Infinity }}
              className="bg-gradient-to-r from-blue-700 via-slate-700 to-emerald-700 bg-clip-text text-transparent bg-[length:200%_auto]"
            >
              {" "}Transparency Solutions
            </motion.span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            Comprehensive government spending analysis platform with advanced security, real-time monitoring, and official documentation tools
          </motion.p>
        </motion.div>

        {/* Main Phone Display with Feature Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Professional Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end order-2 lg:order-1"
          >
            <div className="relative">
              {/* Professional Phone Frame */}
              <motion.div 
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative w-80 h-[650px] bg-gradient-to-b from-slate-800 via-slate-900 to-black rounded-[3.5rem] p-4 shadow-2xl border border-slate-700"
              >
                {/* Professional Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-gradient-to-b from-slate-800 to-slate-900 rounded-b-3xl z-10 border-b border-slate-700"></div>
                
                {/* Side Buttons */}
                <div className="absolute right-0 top-32 w-1 h-16 bg-gradient-to-b from-slate-600 to-slate-700 rounded-l border-l border-slate-500"></div>
                <div className="absolute right-0 top-52 w-1 h-12 bg-gradient-to-b from-slate-600 to-slate-700 rounded-l border-l border-slate-500"></div>
                <div className="absolute left-0 top-40 w-1 h-8 bg-gradient-to-b from-slate-600 to-slate-700 rounded-r border-r border-slate-500"></div>
                
                {/* Professional Screen */}
                <div className="w-full h-full bg-gradient-to-b from-slate-50 to-white rounded-[3rem] overflow-hidden relative border border-slate-200">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className={`w-full h-full bg-gradient-to-br ${currentFeature.mockBg} p-6 flex flex-col relative`}
                    >
                      {/* Professional Status Bar */}
                      <div className="flex justify-between items-center mb-6 text-xs text-slate-700 font-semibold">
                        <span className="font-mono">14:32</span>
                        <div className="flex gap-1 items-center">
                          <div className="flex gap-1">
                            <div className="w-1 h-3 bg-slate-400 rounded-sm"></div>
                            <div className="w-1 h-4 bg-slate-500 rounded-sm"></div>
                            <div className="w-1 h-5 bg-slate-600 rounded-sm"></div>
                            <div className="w-1 h-6 bg-slate-700 rounded-sm"></div>
                          </div>
                          <div className="w-5 h-3 border border-slate-400 rounded-sm relative ml-2">
                            <div className="absolute inset-0.5 bg-slate-500 rounded-sm"></div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 -right-0.5 w-0.5 h-1.5 bg-slate-600 rounded-r-sm"></div>
                          </div>
                        </div>
                      </div>

                      {/* Professional Feature Content */}
                      <div className="flex-1 flex flex-col">
                        {/* Official Badge */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1, type: "spring" }}
                          className="inline-flex items-center px-3 py-1 bg-slate-100 border border-slate-300 rounded-full mb-4 w-fit"
                        >
                          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                            {currentFeature.badge}
                          </span>
                        </motion.div>

                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring" }}
                          className={`w-16 h-16 bg-gradient-to-br ${currentFeature.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg border border-slate-200`}
                        >
                          <currentFeature.icon className="w-8 h-8 text-white" />
                        </motion.div>

                        <motion.h3
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-2xl font-bold text-slate-900 mb-3 leading-tight"
                        >
                          {currentFeature.title}
                        </motion.h3>

                        <motion.p
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-sm text-slate-600 mb-6 leading-relaxed"
                        >
                          {currentFeature.description}
                        </motion.p>

                        {/* Professional Feature List */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="space-y-3"
                        >
                          {currentFeature.features.map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.6 + idx * 0.1, type: "spring" }}
                              className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-slate-200 hover:shadow-md transition-all"
                            >
                              <div className={`w-8 h-8 bg-gradient-to-br ${currentFeature.gradient} rounded-lg flex items-center justify-center flex-shrink-0 mr-3`}>
                                <CheckCircle className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-sm font-semibold text-slate-800">{item}</span>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>

                      {/* Professional Navigation Dots */}
                      <div className="flex justify-center gap-2 mt-6">
                        {features.map((_, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => setActiveFeature(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              idx === activeFeature ? 'w-6 bg-slate-700' : 'w-1.5 bg-slate-300'
                            }`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          />
                        ))}
                      </div>

                      {/* Shine Effect */}
                      <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                        style={{ transform: "skewX(-20deg)" }}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Phone Buttons */}
                <div className="absolute right-0 top-32 w-1 h-16 bg-gray-800 rounded-l"></div>
                <div className="absolute right-0 top-52 w-1 h-12 bg-gray-800 rounded-l"></div>
                <div className="absolute left-0 top-40 w-1 h-8 bg-gray-800 rounded-r"></div>
              </motion.div>

              {/* Professional Floating Elements */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className={`absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br ${currentFeature.gradient} rounded-2xl flex items-center justify-center shadow-xl border border-slate-300`}
              >
                <span className="text-white font-bold text-lg">#{activeFeature + 1}</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl flex items-center justify-center shadow-xl border border-slate-300"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>

              {/* Professional Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentFeature.gradient} opacity-10 blur-3xl -z-10 rounded-full`}></div>
            </div>
          </motion.div>

          {/* Professional Feature Selection Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 order-1 lg:order-2"
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-8">
              Explore <span className="bg-gradient-to-r from-slate-700 to-blue-700 bg-clip-text text-transparent">Enterprise Features</span>
            </h3>
            
            {features.map((feature, idx) => (
              <motion.button
                key={idx}
                onClick={() => setActiveFeature(idx)}
                whileHover={{ scale: 1.02, x: 8 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  activeFeature === idx
                    ? `bg-gradient-to-r ${feature.gradient} text-white shadow-xl border border-slate-300`
                    : 'bg-white text-slate-700 hover:shadow-lg border border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    activeFeature === idx ? 'bg-white bg-opacity-20' : `bg-gradient-to-br ${feature.gradient}`
                  }`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-base mb-1">{feature.title}</h4>
                    <p className={`text-sm ${activeFeature === idx ? 'text-white text-opacity-90' : 'text-slate-500'}`}>
                      {feature.features.join(' • ')}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${activeFeature === idx ? 'rotate-90 text-white' : 'text-slate-400'}`} />
                </div>
              </motion.button>
            ))}

          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default EnhancedFeaturesSection;