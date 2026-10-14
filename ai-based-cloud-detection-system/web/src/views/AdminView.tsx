import { useState } from 'react';
import { Users, Database, Settings, Activity, Server, LogOut, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function AdminView() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Active Nodes', value: '142', icon: Server, color: 'text-blue-400' },
    { label: 'Total Inferences', value: '1.2M', icon: Activity, color: 'text-green-400' },
    { label: 'Registered Users', value: '89', icon: Users, color: 'text-purple-400' },
    { label: 'Storage Used', value: '4.2 TB', icon: Database, color: 'text-orange-400' },
  ];

  return (
    <div className="min-h-screen animated-gradient-bg text-white font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass-panel border-b md:border-b-0 md:border-r border-t-0 border-l-0 border-white/10 flex flex-col">
        <div className="p-6 flex items-center space-x-3">
          <div className="bg-red-500/20 p-2 rounded-xl border border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <Settings className="w-6 h-6 text-red-500" />
          </div>
          <span className="text-xl font-bold tracking-tight">Admin<span className="text-red-500">Panel</span></span>
        </div>

        <nav className="flex-none md:flex-1 px-4 pb-6 md:py-6 space-y-2 flex flex-col md:flex-col overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Activity className="w-5 h-5 shrink-0" /> <span className="whitespace-nowrap">System Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Users className="w-5 h-5 shrink-0" /> <span className="whitespace-nowrap">User Management</span>
          </button>
          <button 
            onClick={() => setActiveTab('nodes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'nodes' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Server className="w-5 h-5 shrink-0" /> <span className="whitespace-nowrap">Edge Nodes</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2 md:mt-auto hidden md:block">
          <Link to="/app" className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
            <ArrowLeft className="w-5 h-5" /> Back to App
          </Link>
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">System Overview</h1>
            <p className="text-sm md:text-base text-gray-400">Manage your CloudAI infrastructure and users.</p>
          </div>
          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full border border-green-500/30 text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
              All Systems Operational
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <stat.icon className="w-16 h-16" />
              </div>
              <div className="relative z-10 flex flex-col">
                <div className={`p-2 bg-black/30 rounded-lg w-fit mb-4 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Table */}
        <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-xl font-semibold">Recent API Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-gray-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Timestamp</th>
                  <th className="px-6 py-4 font-medium">User</th>
                  <th className="px-6 py-4 font-medium">Endpoint</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-gray-400">2026-04-29 14:32:{10 + i}</td>
                    <td className="px-6 py-4">operator_0{i + 1}@cloudai.com</td>
                    <td className="px-6 py-4 font-mono text-xs text-blue-400">/api/v1/inference/detect</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-xs border border-green-500/20">
                        200 OK
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
