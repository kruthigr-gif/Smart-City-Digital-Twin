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
          <div className={`text-4xl font-light ${avgAqi > 100 ? 'text-red-400' : 'text-purple-400'}`}>{avgAqi}</div>
          <div className="text-xs text-slate-500 mt-2">Forecast: → {avgAqi + 15} in 1 hr</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <div className="text-sm text-slate-400 mb-2">PM2.5</div>
          <div className="text-4xl font-light text-slate-300">{avgPm25}</div>
          <div className="text-xs text-slate-500 mt-2">µg/m³</div>
        </div>
        <div className="glass-panel p-6 text-center">
          <div className="text-sm text-slate-400 mb-2">CO2 Levels</div>
          <div className="text-4xl font-light text-slate-300">{avgCo2}</div>
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
