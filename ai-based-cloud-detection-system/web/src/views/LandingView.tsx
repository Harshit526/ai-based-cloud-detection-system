import { ArrowRight, Cloud, Shield, Zap, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LandingView() {
  return (
    <div className="min-h-screen animated-gradient-bg flex flex-col font-sans text-white">
      {/* Navbar */}
      <nav className="glass-panel sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-t-0 border-x-0 rounded-none bg-black/40 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <div className="bg-primary/20 p-2 rounded-xl border border-primary/50 shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Cloud className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight">CloudAI<span className="text-primary">.</span></span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#technology" className="hover:text-white transition-colors">Technology</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Sign In</Link>
          <Link to="/signup" className="px-5 py-2 bg-primary hover:bg-indigo-600 text-white rounded-full text-sm font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-xs font-medium text-gray-300">v2.0 Model Now Live</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-5xl">
          Next-Generation <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Atmospheric Intelligence</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Deploy cutting-edge computer vision models to detect, track, and analyze cloud formations in real-time. Enterprise-grade weather forecasting powered by AI.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link to="/signup" className="px-8 py-3.5 bg-primary hover:bg-indigo-600 text-white rounded-full text-base font-semibold transition-all shadow-[0_0_20px_rgba(99,102,241,0.5)] flex items-center gap-2">
            Start Processing <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/app" className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full text-base font-semibold transition-all flex items-center gap-2">
            View Live Demo
          </Link>
        </div>

        {/* Floating Feature Cards */}
        {/* Floating Feature Cards */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-6xl w-full px-4 pt-16">
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-start text-left transform hover:-translate-y-1 transition-all duration-300">
            <div className="bg-blue-500/20 p-3 rounded-xl mb-4 border border-blue-500/30 text-blue-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Inference</h3>
            <p className="text-sm text-gray-400">Sub-millisecond processing pipeline for live video feeds and satellite imagery.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-start text-left transform hover:-translate-y-1 transition-all duration-300">
            <div className="bg-purple-500/20 p-3 rounded-xl mb-4 border border-purple-500/30 text-purple-400">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Global Coverage</h3>
            <p className="text-sm text-gray-400">Integrate seamlessly with distributed edge nodes and global meteorological networks.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-start text-left transform hover:-translate-y-1 transition-all duration-300">
            <div className="bg-green-500/20 p-3 rounded-xl mb-4 border border-green-500/30 text-green-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Enterprise Security</h3>
            <p className="text-sm text-gray-400">End-to-end encryption for all sensory telemetry and intelligence models.</p>
          </div>
        </div>

        {/* Technology Section */}
        <div id="technology" className="mt-32 max-w-6xl w-full px-4 pt-16 text-left">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Supported Architectures</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our platform supports multiple deep learning architectures out of the box, allowing you to choose the perfect trade-off between speed and accuracy for your specific use case.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['YOLOv8 Edge', 'Xception Model', 'ResNet50', 'VGG19'].map((tech, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors">
                <h4 className="text-lg font-semibold text-white mb-2">{tech}</h4>
                <p className="text-xs text-gray-400">Hardware accelerated neural network optimized for spatial analysis.</p>
              </div>
            ))}
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="mt-32 max-w-4xl w-full px-4 pt-16 mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">About CloudAI</h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-8">
            CloudAI was built to bridge the gap between complex meteorological data and actionable intelligence. By leveraging state-of-the-art computer vision models, we empower organizations to detect cloud formations, predict weather patterns, and monitor environmental changes with unprecedented accuracy and speed.
          </p>
          <div className="glass-panel p-8 rounded-2xl border border-primary/20 bg-primary/5">
            <h3 className="text-2xl font-bold mb-2 text-white">Ready to deploy?</h3>
            <p className="text-gray-400 mb-6">Join hundreds of researchers and meteorologists using CloudAI.</p>
            <Link to="/signup" className="inline-flex px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-full text-base font-bold transition-all shadow-lg">
              Create Free Account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
