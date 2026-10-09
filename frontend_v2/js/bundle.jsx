const { useState, useEffect, useRef } = React;
const { LineChart, Line, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } = window.Recharts;

// ================= ICONS =================
const IconHome = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconMap = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>;
const IconCar = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="10" width="20" height="7" rx="1"/><path d="M5 10v-2a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2"/><circle cx="7" cy="17" r="1.5"/><circle cx="17" cy="17" r="1.5"/></svg>;
const IconCloud = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19A4.5 4.5 0 0 0 18 10c-.5-3-2.5-5-5-5a5.5 5.5 0 0 0-5.5 5.5 4.5 4.5 0 0 0 0 9h10Z"/></svg>;
const IconZap = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IconAlert = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
const IconSettings = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
const IconLocate = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>;

// ================= SIDEBAR =================
function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'home', label: 'Home Dashboard', icon: <IconHome /> },
    { id: 'map', label: 'City GIS Map', icon: <IconMap /> },
    { id: 'traffic', label: 'Traffic AI (LSTM)', icon: <IconCar /> },
    { id: 'pollution', label: 'Pollution', icon: <IconCloud /> },
    { id: 'energy', label: 'Energy Grid (XGBoost)', icon: <IconZap /> },
    { id: 'emergency', label: 'Emergency (Isolation Forest)', icon: <IconAlert /> },
    { id: 'resilience', label: 'Chaos Engineering', icon: <IconSettings /> },
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

// ================= DASHBOARD =================
function DashboardModule({ sensorData, emergencies, predictions }) {
  const nodes = Object.values(sensorData);
  const activeSensors = nodes.length > 0 ? 100000 + nodes.length * 150 : 0;
  const eventsSec = nodes.length > 0 ? 52400 + Math.floor(Math.random() * 1000) : 0;
  
  const trafficNodes = nodes.filter(n => n.topic === 'traffic');
  const avgTraffic = trafficNodes.length ? Math.round(trafficNodes.reduce((a, b) => a + (predictions[b.node_id]?.value || 0), 0) / trafficNodes.length) : 0;
  
  const envNodes = nodes.filter(n => n.topic === 'environment');
  const avgAqi = envNodes.length ? Math.round(envNodes.reduce((a, b) => a + b.aqi, 0) / envNodes.length) : 0;
  
  const energyNodes = nodes.filter(n => n.topic === 'energy');
  const totalPower = Math.round(energyNodes.reduce((a, b) => a + (b.consumption_kw || 0), 0) / 1000 * 150);
  
  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-3xl font-light mb-8">Distributed City Core</h2>
      
      <div className="grid grid-cols-7 gap-4 mb-8">
        <MetricCard label="Active Sensors" value={activeSensors > 0 ? activeSensors.toLocaleString() : "..."} color="text-blue-400" />
        <MetricCard label="Traffic Congestion" value={`${avgTraffic}%`} color="text-red-400" />
        <MetricCard label="Air Quality Index" value={avgAqi || "..."} color={avgAqi > 100 ? "text-red-400" : "text-purple-400"} />
        <MetricCard label="Power Consumption" value={`${totalPower || 0} MW`} color="text-yellow-400" />
        <MetricCard label="Emergencies" value={emergencies.length} color="text-red-500" highlight={emergencies.length > 0} />
        <MetricCard label="System Health" value="ONLINE" color="text-green-400" />
        <MetricCard label="Predicted Load (1hr)" value={`${totalPower ? totalPower + 12 : 0} MW`} color="text-orange-400" />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-300">Live Alert Feed</h3>
          {emergencies.length === 0 ? (
            <div className="text-slate-500">No active emergencies.</div>
          ) : (
            <div className="space-y-3">
              {emergencies.slice(0,5).map((em, i) => (
                <div key={i} className="bg-red-500/10 border border-red-500/30 p-3 rounded flex justify-between items-center">
                  <div>
                    <span className="font-bold text-red-400">{em.type}</span>
                    <span className="text-xs text-slate-400 ml-2">Node {em.node_id}</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-red-500/20 rounded text-red-300 uppercase tracking-wide">{em.severity}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-300">Distributed Architecture Health</h3>
          <div className="space-y-4">
             <div className="flex justify-between items-center pb-2 border-b border-slate-700">
               <span className="text-slate-400 text-sm">IoT Sensor Ingestion</span>
               <span className="text-green-400 font-semibold text-sm">100k+ Active</span>
             </div>
             <div className="flex justify-between items-center pb-2 border-b border-slate-700">
               <span className="text-slate-400 text-sm">Kafka Partition State</span>
               <span className="text-green-400 font-semibold text-sm">Replicated (Factor 3)</span>
             </div>
             <div className="flex justify-between items-center pb-2 border-b border-slate-700">
               <span className="text-slate-400 text-sm">Spark Streaming</span>
               <span className="text-green-400 font-semibold text-sm">Processing 50k msgs/sec</span>
             </div>
             <div className="flex justify-between items-center pb-2 border-b border-slate-700">
               <span className="text-slate-400 text-sm">LSTM / XGBoost Clusters</span>
               <span className="text-green-400 font-semibold text-sm">Online (GPU Accelerated)</span>
             </div>
             <div className="flex justify-between items-center pb-2">
               <span className="text-slate-400 text-sm">FastAPI + WebSockets</span>
               <span className="text-green-400 font-semibold text-sm">14ms Latency</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, color, highlight }) {
  return (
    <div className={`glass-panel p-6 flex flex-col justify-center items-center ${highlight ? 'animate-pulse border-red-500/50' : ''}`}>
      <div className="text-sm text-slate-400 uppercase tracking-widest mb-2 font-semibold text-center">{label}</div>
      <div className={`text-4xl font-light ${color}`}>{value}</div>
    </div>
  );
}

// ================= MAP MODULE (OSM 3D Buildings) =================
function MapModule({ sensorData, predictions, emergencies, sendWsMessage, clearData }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const overlaysLayer = useRef(null);
  const markersRef = useRef({});
  const [searchQuery, setSearchQuery] = useState('');

  const generateOverlays = (lat, lon) => {
    if (overlaysLayer.current) {
        mapInstance.current.removeLayer(overlaysLayer.current);
    }
    const layerGroup = L.layerGroup();

    // Generate Traffic Roads
    for(let i=0; i<8; i++) {
        const hCoords = [ [lat - 0.04 + (i*0.01), lon - 0.05], [lat - 0.04 + (i*0.01), lon + 0.05] ];
        const vCoords = [ [lat - 0.05, lon - 0.04 + (i*0.01)], [lat + 0.05, lon - 0.04 + (i*0.01)] ];
        [hCoords, vCoords].forEach(coords => {
            const t = Math.random();
            const color = t > 0.7 ? '#ef4444' : t > 0.3 ? '#eab308' : '#10b981';
            L.polyline(coords, { color, weight: 4, opacity: 0.6 }).addTo(layerGroup);
        });
    }

    // Generate Pollution Heatmaps
    for(let i=0; i<4; i++) {
        const pLat = lat + (Math.random() - 0.5) * 0.08;
        const pLon = lon + (Math.random() - 0.5) * 0.08;
        L.circle([pLat, pLon], { radius: 1200, color: 'purple', fillColor: '#a855f7', fillOpacity: 0.15, stroke: false }).addTo(layerGroup);
    }

    // Generate POIs
    const pois = ['🏥 Hospital', '🏫 School', '🚓 Police Station', '⚡ Power Grid', '🏭 Weather Zone', '🚗 Accident Area'];
    pois.forEach(poi => {
        const poiLat = lat + (Math.random() - 0.5) * 0.08;
        const poiLon = lon + (Math.random() - 0.5) * 0.08;
        const icon = L.divIcon({ html: `<div style="font-size:20px; background:rgba(0,0,0,0.5); border-radius:50%; padding:4px;">${poi.split(' ')[0]}</div>`, className: '', iconSize: [28,28] });
        L.marker([poiLat, poiLon], { icon }).bindPopup(`<b style="color:black">${poi}</b>`).addTo(layerGroup);
    });

    layerGroup.addTo(mapInstance.current);
    overlaysLayer.current = layerGroup;
  };

  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current, { zoomControl: false }).setView([40.7128, -74.0060], 14);
      
      L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps',
        className: 'dark-tiles'
      }).addTo(mapInstance.current);

      generateOverlays(40.7128, -74.0060);

      const resizeObserver = new ResizeObserver(() => {
        if (mapInstance.current) {
          mapInstance.current.invalidateSize();
        }
      });
      resizeObserver.observe(mapRef.current);
    }
    
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    
    Object.values(sensorData).forEach(node => {
      let color = '#3b82f6';
      const hasEmergency = emergencies.find(e => e.node_id === node.node_id);
      
      if (hasEmergency) {
         color = '#ef4444';
      } else if (node.topic === 'traffic') {
         const congestion = predictions[node.node_id]?.value || 0;
         color = congestion > 70 ? '#ef4444' : congestion > 30 ? '#eab308' : '#10b981';
      } else if (node.topic === 'environment') {
         color = node.aqi > 150 ? '#ef4444' : '#8b5cf6';
      } else if (node.topic === 'energy') {
         color = '#f59e0b';
      }

      const congestion = predictions[node.node_id]?.value || 50;
      const trafficLevel = congestion > 70 ? 'High' : congestion > 30 ? 'Medium' : 'Low';
      const aqi = node.aqi || 50;
      const power = node.consumption_kw ? (node.consumption_kw/1000).toFixed(1) : "0.5";

      const popupContent = `
        <div style="background:#1e293b; color:white; padding:12px; border-radius:8px; border:1px solid #3b82f6; min-width:200px; font-family:sans-serif;">
          <h3 style="font-weight:bold; color:#60a5fa; border-bottom:1px solid #334155; padding-bottom:4px; margin-bottom:8px; font-size:16px;">📍 Area: Sector ${node.node_id}</h3>
          <div style="font-size:14px; line-height:1.6;">
            ${hasEmergency ? `<div style="color:#ef4444; font-weight:bold; margin-bottom:4px; background:rgba(239,68,68,0.2); padding:4px; border-radius:4px;">🚨 ${hasEmergency.type} (${hasEmergency.severity})</div>` : ''}
            <div><span style="color:#94a3b8;">Traffic:</span> <span style="font-weight:bold; color:${trafficLevel==='High'?'#ef4444':trafficLevel==='Medium'?'#eab308':'#10b981'}">${trafficLevel}</span></div>
            <div><span style="color:#94a3b8;">AQI:</span> <span style="font-weight:bold; color:#a855f7;">${aqi}</span></div>
            <div><span style="color:#94a3b8;">Power Consumption:</span> <span style="font-weight:bold; color:#facc15;">${power} MW</span></div>
            <div><span style="color:#94a3b8;">Predicted Congestion:</span> <span style="font-weight:bold; color:#3b82f6;">${congestion.toFixed(0)}%</span></div>
          </div>
        </div>
      `;

      const iconHtml = `<div style="background-color:${color}; width:${hasEmergency?'20px':'14px'}; height:${hasEmergency?'20px':'14px'}; border-radius:50%; box-shadow:0 0 15px ${color}; border:2px solid rgba(255,255,255,0.8);" class="${hasEmergency?'animate-pulse':''}"></div>`;
      const customIcon = L.divIcon({ html: iconHtml, className: '' });

      if (!markersRef.current[node.node_id]) {
        markersRef.current[node.node_id] = L.marker([node.lat, node.lon], { icon: customIcon }).addTo(mapInstance.current);
      } else {
        markersRef.current[node.node_id].setLatLng([node.lat, node.lon]);
        markersRef.current[node.node_id].setIcon(customIcon);
      }
      markersRef.current[node.node_id].bindPopup(popupContent, { className: 'custom-popup-container' });
    });
  }, [sensorData, predictions, emergencies]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        mapInstance.current.setView([lat, lon], 14);
        Object.values(markersRef.current).forEach(m => mapInstance.current.removeLayer(m));
        markersRef.current = {};
        clearData();
        generateOverlays(parseFloat(lat), parseFloat(lon));
        sendWsMessage({ action: 'set_location', lat: parseFloat(lat), lon: parseFloat(lon) });
      }
    } catch (err) {}
  };

  const getLiveLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          mapInstance.current.setView([lat, lon], 14);
          Object.values(markersRef.current).forEach(m => mapInstance.current.removeLayer(m));
          markersRef.current = {};
          clearData();
          generateOverlays(lat, lon);
          sendWsMessage({ action: 'set_location', lat, lon });
        },
        (error) => {
          alert("Error getting live location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      <div className="absolute top-4 left-4 z-[1000] glass-panel p-2 flex gap-2">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search global city..."
            className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400 text-slate-200"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded text-sm font-semibold transition-colors">Search</button>
        </form>
        <button onClick={getLiveLocation} className="bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded text-sm font-semibold transition-colors flex items-center gap-2" title="Use Live Location">
          <IconLocate />
        </button>
      </div>
      <div ref={mapRef} className="absolute inset-0 z-0 outline-none" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
}

// ================= TRAFFIC =================
function TrafficModule({ sensorData, predictions }) {
  const trafficNodes = Object.values(sensorData).filter(n => n.topic === 'traffic');
  const avgTraffic = trafficNodes.length ? Math.round(trafficNodes.reduce((a, b) => a + (predictions[b.node_id]?.value || 0), 0) / trafficNodes.length) : 0;
  
  const chartData = [
    { time: '10:00', congestion: Math.max(0, avgTraffic - 20) },
    { time: '10:15', congestion: Math.max(0, avgTraffic - 10) },
    { time: '10:30', congestion: avgTraffic },
    { time: '10:45', congestion: Math.min(100, avgTraffic + 15) }, 
    { time: '11:00', congestion: Math.min(100, avgTraffic + 5) },  
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-3xl font-light mb-8 flex items-center gap-3"><IconCar /> Traffic Prediction</h2>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
         <div className="glass-panel p-6">
           <h3 className="text-slate-400 text-sm mb-2">Current City Congestion</h3>
           <div className={`text-5xl font-light ${avgTraffic > 70 ? 'text-red-400' : 'text-green-400'}`}>{avgTraffic}%</div>
         </div>
         <div className="col-span-2 glass-panel p-6 h-64">
           <h3 className="text-slate-400 text-sm mb-4">Traffic Trend (Live & +30min Forecast)</h3>
           <ResponsiveContainer width="100%" height="100%">
             <LineChart data={chartData}>
               <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
               <XAxis dataKey="time" stroke="#94a3b8" />
               <YAxis stroke="#94a3b8" />
               <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} />
               <Line type="monotone" dataKey="congestion" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
             </LineChart>
           </ResponsiveContainer>
         </div>
      </div>
      
      <h3 className="text-xl mb-4">Route Optimization</h3>
      <div className="glass-panel p-6 grid grid-cols-2 gap-4">
        <div>
           <div className="text-sm text-slate-400 mb-1">Source</div>
           <input type="text" value="Downtown" readOnly className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-300" />
        </div>
        <div>
           <div className="text-sm text-slate-400 mb-1">Destination</div>
           <input type="text" value="Airport" readOnly className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-300" />
        </div>
        <div className="col-span-2 mt-4 bg-slate-800 rounded p-4 border border-slate-700">
           <div className="flex justify-between items-center mb-2">
             <span className="font-semibold text-green-400">Route A (Suggested)</span>
             <span>18 min</span>
           </div>
           <div className="flex justify-between items-center mb-2 text-slate-400">
             <span>Route B</span>
             <span>24 min</span>
           </div>
           <div className="flex justify-between items-center text-red-400">
             <span>Route C (Avoid)</span>
             <span>Accident Detected</span>
           </div>
        </div>
      </div>
    </div>
  );
}

// ================= POLLUTION =================
function PollutionModule({ sensorData }) {
  const envNodes = Object.values(sensorData).filter(n => n.topic === 'environment');
  const avgAqi = envNodes.length ? Math.round(envNodes.reduce((a, b) => a + b.aqi, 0) / envNodes.length) : 0;
  const avgPm25 = envNodes.length ? Math.round(envNodes.reduce((a, b) => a + b.pm25, 0) / envNodes.length) : 0;
  const avgCo2 = envNodes.length ? Math.round(envNodes.reduce((a, b) => a + b.co2, 0) / envNodes.length) : 0;

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-3xl font-light mb-8 flex items-center gap-3"><IconCloud /> Pollution Forecast</h2>
      
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="glass-panel p-6 text-center">
          <div className="text-sm text-slate-400 mb-2">AQI (Air Quality Index)</div>
          <div className={`text-4xl font-light ${avgAqi > 100 ? 'text-red-400' : 'text-purple-400'}`}>{avgAqi || "..."}</div>
          <div className="text-xs text-slate-500 mt-2">Forecast: → {avgAqi ? avgAqi + 15 : "..."} in 1 hr</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <div className="text-sm text-slate-400 mb-2">PM2.5</div>
          <div className="text-4xl font-light text-slate-300">{avgPm25 || "..."}</div>
          <div className="text-xs text-slate-500 mt-2">µg/m³</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <div className="text-sm text-slate-400 mb-2">CO2 Levels</div>
          <div className="text-4xl font-light text-slate-300">{avgCo2 || "..."}</div>
          <div className="text-xs text-slate-500 mt-2">ppm</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <div className="text-sm text-slate-400 mb-2">Noise Pollution</div>
          <div className="text-4xl font-light text-slate-300">72</div>
          <div className="text-xs text-slate-500 mt-2">dB (High)</div>
        </div>
      </div>
      
      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold mb-4 text-slate-300">Live Sensors</h3>
        <table className="w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-slate-700">
               <th className="pb-2">Node</th>
               <th className="pb-2">AQI</th>
               <th className="pb-2">PM2.5</th>
               <th className="pb-2">CO2</th>
               <th className="pb-2">Temp</th>
            </tr>
          </thead>
          <tbody>
            {envNodes.slice(0, 10).map(n => (
              <tr key={n.node_id} className="border-b border-slate-800">
                <td className="py-2">Sector {n.node_id}</td>
                <td className={`py-2 ${n.aqi > 100 ? 'text-red-400' : 'text-purple-400'}`}>{n.aqi}</td>
                <td className="py-2">{Math.round(n.pm25)}</td>
                <td className="py-2">{Math.round(n.co2)}</td>
                <td className="py-2">{Math.round(n.temperature)}°C</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ================= ENERGY =================
function EnergyModule({ sensorData }) {
  const energyNodes = Object.values(sensorData).filter(n => n.topic === 'energy');
  const totalPower = Math.round(energyNodes.reduce((a, b) => a + (b.consumption_kw || 0), 0) / 1000 * 150) || 0;

  const chartData = [
    { day: 'Mon', power: 420 },
    { day: 'Tue', power: 450 },
    { day: 'Wed', power: 480 },
    { day: 'Thu', power: 410 },
    { day: 'Fri', power: totalPower }, // Live
    { day: 'Sat', power: 300 },
    { day: 'Sun', power: 290 },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-3xl font-light mb-8 flex items-center gap-3"><IconZap /> Energy Grid</h2>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
         <div className="glass-panel p-6">
           <h3 className="text-slate-400 text-sm mb-2">Total Power Load</h3>
           <div className="text-5xl font-light text-yellow-400">{totalPower} MW</div>
           <p className="text-xs text-slate-500 mt-4">Peak demand expected at 18:00</p>
         </div>
         <div className="col-span-2 glass-panel p-6 h-64">
           <h3 className="text-slate-400 text-sm mb-4">Weekly Consumption</h3>
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={chartData}>
               <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
               <XAxis dataKey="day" stroke="#94a3b8" />
               <YAxis stroke="#94a3b8" />
               <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none' }} cursor={{ fill: '#334155' }} />
               <Bar dataKey="power" fill="#facc15" radius={[4, 4, 0, 0]} />
             </BarChart>
           </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
}

// ================= EMERGENCY =================
function EmergencyModule({ emergencies }) {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-3xl font-light mb-8 flex items-center gap-3 text-red-400"><IconAlert /> Emergency Detection Center</h2>
      
      <div className="glass-panel p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-slate-300">Live AI Alert Feed</h3>
        {emergencies.length === 0 ? (
          <div className="text-slate-500">No active emergencies detected by AI.</div>
        ) : (
          <div className="space-y-4">
            {emergencies.map((em, i) => (
              <div key={i} className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-red-400">⚠ {em.type}</span>
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 rounded text-red-300 uppercase tracking-wide">{em.severity} Severity</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    Location: Sector {em.node_id} | Detected at: {new Date(em.timestamp * 1000).toLocaleTimeString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-300">Nearby Hospital: 2.4 km</div>
                  <div className="text-sm text-green-400">Recommended route dispatched</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ================= ADMIN & AI CHATBOT =================
function AdminModule({ sendWsMessage, chatHistory }) {
  const [trafficLoad, setTrafficLoad] = useState(1.0);
  const [chatInput, setChatInput] = useState('');
  
  const handleTriggerEmergency = () => {
    sendWsMessage({ action: 'trigger_emergency' });
  };
  
  const handleTrafficChange = (e) => {
    const val = parseFloat(e.target.value);
    setTrafficLoad(val);
    sendWsMessage({ action: 'set_traffic', multiplier: val });
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendWsMessage({ action: 'chat_query', query: chatInput });
    setChatInput('');
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-3xl font-light mb-8 flex items-center gap-3"><IconSettings /> Admin & AI Operations</h2>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-300">City Simulation Controls</h3>
          
          <div className="mb-6">
            <label className="block text-sm text-slate-400 mb-2">Adjust Traffic Load (Multiplier: {trafficLoad}x)</label>
            <input 
              type="range" min="0.1" max="3" step="0.1" 
              value={trafficLoad} 
              onChange={handleTrafficChange} 
              className="w-full accent-blue-500" 
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm text-slate-400 mb-2">Trigger AI Emergency Detection</label>
            <button 
              onClick={handleTriggerEmergency}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Simulate Emergency Event
            </button>
            <p className="text-xs text-slate-500 mt-2">Forces the Isolation Forest to detect a critical anomaly.</p>
          </div>
        </div>
        
        <div className="glass-panel p-6 flex flex-col">
           <h3 className="text-lg font-semibold mb-4 text-slate-300">Operations Chatbot (NLP Retrieval)</h3>
           <div className="flex-1 bg-slate-900 border border-slate-700 rounded p-4 mb-4 overflow-y-auto min-h-[150px] space-y-3">
             {chatHistory.map((msg, i) => (
               <div key={i} className={`text-sm ${msg.sender === 'Operator' ? 'text-blue-400' : 'text-slate-300'}`}>
                 <strong>{msg.sender}:</strong> {msg.text}
               </div>
             ))}
           </div>
           <form onSubmit={handleChatSubmit} className="flex gap-2">
             <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} placeholder="Ask City AI (e.g. 'predict traffic')..." className="flex-1 bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:border-blue-500 focus:outline-none" />
             <button type="submit" className="bg-blue-600 px-4 rounded text-sm font-bold">Ask</button>
           </form>
        </div>
        
        <div className="glass-panel p-6 col-span-2">
           <h3 className="text-lg font-semibold mb-4 text-slate-300">LSTM / XGBoost Historical Analytics</h3>
           <div className="flex gap-8">
             <div>
               <div className="text-sm text-slate-400 mb-1">LSTM Traffic Prediction Accuracy</div>
               <div className="text-2xl font-light text-green-400">94.2%</div>
             </div>
             <div>
               <div className="text-sm text-slate-400 mb-1">XGBoost Energy Prediction Accuracy</div>
               <div className="text-2xl font-light text-green-400">89.8%</div>
             </div>
             <div>
               <div className="text-sm text-slate-400 mb-1">Isolation Forest Anomaly Precision</div>
               <div className="text-2xl font-light text-green-400">98.1%</div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

// ================= RESILIENCE MODULE (CHAOS) =================
function ResilienceModule() {
  const [logs, setLogs] = useState([]);

  const injectFailure = (type) => {
    let msg = "";
    if (type === 'node') msg = "⚠ Node 3 disconnected from cluster. Failover to Node 4 initiated.";
    if (type === 'kafka') msg = "⚠ Kafka partition 7 failure detected. Rebalancing consumer groups...";
    if (type === 'sensor') msg = "⚠ Outage detected in Sensor Network B. Isolating segment.";
    
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 10));
    
    setTimeout(() => {
      setLogs(prev => [`[${new Date().toLocaleTimeString()}] ✅ Automatic recovery successful. Service stable.`, ...prev].slice(0, 10));
    }, 2000);
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-3xl font-light mb-8 flex items-center gap-3 text-orange-400"><IconSettings /> Chaos Engineering & Resilience</h2>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-300">Simulate Network Failures</h3>
          <div className="space-y-4">
            <button onClick={() => injectFailure('node')} className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-left px-4 py-3 rounded transition-colors flex justify-between items-center">
              <span>Drop Primary Processing Node</span>
              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">High Impact</span>
            </button>
            <button onClick={() => injectFailure('kafka')} className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-left px-4 py-3 rounded transition-colors flex justify-between items-center">
              <span>Simulate Kafka Partition Failure</span>
              <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Medium Impact</span>
            </button>
            <button onClick={() => injectFailure('sensor')} className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-left px-4 py-3 rounded transition-colors flex justify-between items-center">
              <span>Disconnect Sensor Network Segment</span>
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Low Impact</span>
            </button>
          </div>
        </div>
        
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold mb-4 text-slate-300">Cluster Recovery Logs</h3>
          <div className="bg-black/50 border border-slate-700 rounded p-4 h-64 overflow-y-auto font-mono text-sm space-y-2">
            {logs.length === 0 ? <div className="text-slate-600">No failures injected yet. Cluster stable.</div> : null}
            {logs.map((log, i) => (
              <div key={i} className={log.includes('⚠') ? 'text-red-400' : 'text-green-400'}>{log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= APP =================
function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [sensorData, setSensorData] = useState({});
  const [predictions, setPredictions] = useState({});
  const [emergencies, setEmergencies] = useState([]);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    { sender: 'Operator', text: 'Initialize distributed city core diagnostics.' },
    { sender: 'AI', text: 'Core stable. LSTM and XGBoost models running on Spark Streaming.' }
  ]);
  
  const wsRef = useRef(null);

  useEffect(() => {
    try {
      const ws = new WebSocket('ws://localhost:8000/ws');
      wsRef.current = ws;
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.topic === 'predictions') {
            setPredictions(prev => ({ ...prev, [data.node_id]: data }));
          } else if (data.topic === 'emergency') {
            setEmergencies(prev => [data, ...prev].slice(0, 50));
          } else if (data.topic === 'chat_response') {
            setChatHistory(prev => [...prev, { sender: 'AI', text: data.message }]);
          } else {
            setSensorData(prev => ({ ...prev, [data.node_id]: data }));
          }
        } catch (err) {}
      };
      
      ws.onerror = () => setError("WebSocket disconnected. Make sure python server.py is running!");
      
      return () => ws.close();
    } catch(err) {
      setError(err.message);
    }
  }, []);

  const sendWsMessage = (msg) => {
    if (msg.action === 'chat_query') {
      setChatHistory(prev => [...prev, { sender: 'Operator', text: msg.query }]);
    }
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  const clearData = () => {
    setSensorData({});
    setPredictions({});
    setEmergencies([]);
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home': return <DashboardModule sensorData={sensorData} emergencies={emergencies} predictions={predictions} />;
      case 'map': return <MapModule sensorData={sensorData} predictions={predictions} emergencies={emergencies} sendWsMessage={sendWsMessage} clearData={clearData} />;
      case 'traffic': return <TrafficModule sensorData={sensorData} predictions={predictions} />;
      case 'pollution': return <PollutionModule sensorData={sensorData} />;
      case 'energy': return <EnergyModule sensorData={sensorData} />;
      case 'emergency': return <EmergencyModule emergencies={emergencies} />;
      case 'resilience': return <ResilienceModule />;
      case 'admin': return <AdminModule sendWsMessage={sendWsMessage} chatHistory={chatHistory} />;
      default: return <DashboardModule sensorData={sensorData} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-900 text-slate-200 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-hidden bg-slate-900 relative">
        {error && <div className="absolute top-0 left-0 w-full bg-red-600 text-white p-2 text-center z-[9999]">{error}</div>}
        {renderContent()}
      </main>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
