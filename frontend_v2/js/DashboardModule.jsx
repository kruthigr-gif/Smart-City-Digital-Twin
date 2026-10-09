function DashboardModule({ sensorData, emergencies, predictions }) {
  const nodes = Object.values(sensorData);
  const activeSensors = nodes.length * 1234; // inflate for UI
  const trafficNodes = nodes.filter(n => n.topic === 'traffic');
  const avgTraffic = trafficNodes.length ? Math.round(trafficNodes.reduce((a, b) => a + (predictions[b.node_id]?.value || 0), 0) / trafficNodes.length) : 0;
  
  const envNodes = nodes.filter(n => n.topic === 'environment');
  const avgAqi = envNodes.length ? Math.round(envNodes.reduce((a, b) => a + b.aqi, 0) / envNodes.length) : 0;
  
  const energyNodes = nodes.filter(n => n.topic === 'energy');
  const totalPower = Math.round(energyNodes.reduce((a, b) => a + (b.consumption_kw || 0), 0) / 1000 * 150);
  
  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-3xl font-light mb-8">City Overview</h2>
      
      <div className="grid grid-cols-5 gap-6 mb-8">
        <MetricCard label="Active Sensors" value={activeSensors.toLocaleString()} color="text-blue-400" />
        <MetricCard label="Avg Traffic" value={`${avgTraffic}%`} color={avgTraffic > 70 ? "text-red-400" : "text-green-400"} />
        <MetricCard label="City AQI" value={avgAqi} color={avgAqi > 100 ? "text-red-400" : "text-purple-400"} />
        <MetricCard label="Power Usage" value={`${totalPower} MW`} color="text-yellow-400" />
        <MetricCard label="Emergencies" value={emergencies.length} color="text-red-500" highlight={emergencies.length > 0} />
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
      </div>
    </div>
  );
}

function MetricCard({ label, value, color, highlight }) {
  return (
    <div className={`glass-panel p-6 flex flex-col justify-center items-center ${highlight ? 'animate-pulse border-red-500/50' : ''}`}>
      <div className="text-sm text-slate-400 uppercase tracking-widest mb-2 font-semibold">{label}</div>
      <div className={`text-4xl font-light ${color}`}>{value}</div>
    </div>
  );
}
