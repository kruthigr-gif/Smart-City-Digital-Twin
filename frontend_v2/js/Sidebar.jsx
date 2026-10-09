function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', label: 'Home Dashboard', icon: <IconHome /> },
    { id: 'map', label: 'City GIS Map', icon: <IconMap /> },
    { id: 'traffic', label: 'Traffic AI', icon: <IconCar /> },
    { id: 'pollution', label: 'Pollution', icon: <IconCloud /> },
    { id: 'energy', label: 'Energy Grid', icon: <IconZap /> },
    { id: 'emergency', label: 'Emergency', icon: <IconAlert /> },
    { id: 'admin', label: 'Admin Panel', icon: <IconSettings /> },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-[1000] shadow-2xl relative">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Smart City OS
        </h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest font-semibold">Control Center</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span className="font-medium text-sm">{tab.label}</span>
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        v2.0 S-Tier
      </div>
    </div>
  );
}
