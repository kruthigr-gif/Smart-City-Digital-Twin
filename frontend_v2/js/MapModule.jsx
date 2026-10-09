const { useEffect, useRef, useState } = React;

function MapModule({ sensorData, predictions, emergencies, sendWsMessage }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, { zoomControl: false }).setView([40.7128, -74.0060], 12);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; CartoDB'
      }).addTo(mapInstance.current);
    }
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

      if (!markersRef.current[node.node_id]) {
        markersRef.current[node.node_id] = L.circleMarker([node.lat, node.lon], {
          radius: hasEmergency ? 12 : 8, 
          color, fillColor: color, fillOpacity: 0.6, weight: 2
        }).addTo(mapInstance.current);
      } else {
        markersRef.current[node.node_id].setStyle({ color, fillColor: color, radius: hasEmergency ? 12 : 8 });
      }

      const popupContent = `
        <div class="p-1">
          <h3 style="font-weight:bold; border-bottom:1px solid #334155; padding-bottom:4px; margin-bottom:8px;">Node ${node.node_id}</h3>
          <div style="font-size:14px;">
            ${hasEmergency ? `<div style="color:#ef4444; font-weight:bold; margin-bottom:4px;">🚨 ${hasEmergency.type} (${hasEmergency.severity})</div>` : ''}
            ${node.topic === 'traffic' ? `
              <div>Vehicles: <span style="color:#3b82f6; font-family:monospace;">${node.vehicle_count}</span></div>
              <div>Speed: <span style="font-family:monospace;">${node.avg_speed?.toFixed(1)} km/h</span></div>
            ` : ''}
          </div>
        </div>
      `;
      markersRef.current[node.node_id].bindPopup(popupContent, { className: 'custom-popup' });
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
        mapInstance.current.setView([lat, lon], 12);
        Object.values(markersRef.current).forEach(m => mapInstance.current.removeLayer(m));
        markersRef.current = {};
        sendWsMessage({ action: 'set_location', lat: parseFloat(lat), lon: parseFloat(lon) });
      }
    } catch (err) {}
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 left-4 z-[1000] glass-panel p-2">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search global city..."
            className="bg-slate-900 border border-slate-700 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded text-sm font-semibold transition-colors">Search</button>
        </form>
      </div>
      <div ref={mapRef} className="w-full h-full z-0"></div>
    </div>
  );
}
