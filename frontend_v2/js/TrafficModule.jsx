const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } = window.Recharts;

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
