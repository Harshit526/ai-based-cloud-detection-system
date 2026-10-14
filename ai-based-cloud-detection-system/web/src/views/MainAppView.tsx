import { useState } from 'react';
import { Cloud, MapPin, Activity, Camera, Box, LogOut } from 'lucide-react';
import { AnalysisView } from './AnalysisView';
import { DashboardView } from './DashboardView';
import { RealtimeView } from './RealtimeView';
import { Link, useNavigate } from 'react-router-dom';

export function MainAppView() {
  const [activeTab, setActiveTab] = useState<'analysis' | 'dashboard' | 'realtime'>('analysis');
  const [locationText, setLocationText] = useState('Geolocation');
  const navigate = useNavigate();

  const handleGeolocation = () => {
    if (locationText !== 'Geolocation') return; // already fetched or fetching
    setLocationText('Locating...');
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationText(`${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}`);
        },
        () => {
          setLocationText('Location Denied');
        }
      );
    } else {
      setLocationText('Not Supported');
    }
  };

  return (
    <div className="animated-gradient-bg text-white font-sans min-h-screen flex flex-col">
      {/* Dynamic Glass Navbar */}
      <nav className="glass-panel sticky top-0 z-50 flex items-center justify-between px-8 py-4 border-b border-t-0 border-x-0 rounded-none shadow-none bg-black/40 backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <Link to="/" className="bg-primary/20 p-2 rounded-xl border border-primary/50 shadow-[0_0_15px_rgba(99,102,241,0.5)] cursor-pointer hover:bg-primary/30 transition-colors">
            <Cloud className="w-6 h-6 text-primary" />
          </Link>
          <span className="text-xl font-bold tracking-tight">CloudAI<span className="text-primary">.</span></span>
        </div>
        <div className="flex items-center space-x-2 bg-black/50 p-1 rounded-full border border-white/10 hidden md:flex">
          <button 
            onClick={() => setActiveTab('analysis')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'analysis' ? 'bg-white/10 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Box className="w-4 h-4"/> Intelligence UI
          </button>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-white/10 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Activity className="w-4 h-4"/> Executive Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('realtime')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'realtime' ? 'bg-white/10 text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <Camera className="w-4 h-4"/> Edge Lens
          </button>
        </div>
        <div className="flex items-center space-x-6 text-sm font-medium text-gray-400">
          <button 
            onClick={handleGeolocation}
            className="hover:text-white cursor-pointer transition-colors hidden lg:flex items-center gap-1"
          >
            <MapPin className="w-4 h-4"/> {locationText}
          </button>
          <button 
            onClick={() => navigate('/')}
            className="hover:text-red-400 text-gray-400 transition-colors flex items-center gap-1"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5"/>
          </button>
        </div>
      </nav>

      {/* Mobile nav pills */}
      <div className="md:hidden flex p-4 overflow-x-auto hide-scrollbar space-x-2">
        <button 
          onClick={() => setActiveTab('analysis')}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${activeTab === 'analysis' ? 'bg-white/20 text-white shadow-md' : 'bg-black/30 text-gray-400'}`}
        >
          Intelligence UI
        </button>
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-white/20 text-white shadow-md' : 'bg-black/30 text-gray-400'}`}
        >
          Executive Dashboard
        </button>
        <button 
          onClick={() => setActiveTab('realtime')}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${activeTab === 'realtime' ? 'bg-white/20 text-white shadow-md' : 'bg-black/30 text-gray-400'}`}
        >
          Edge Lens
        </button>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        {activeTab === 'analysis' && <AnalysisView />}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'realtime' && <RealtimeView />}
      </main>
    </div>
  );
}
