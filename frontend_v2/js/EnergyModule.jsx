const { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } = window.Recharts;

function EnergyModule({ sensorData }) {
  const energyNodes = Object.values(sensorData).filter(n => n.topic === 'energy');
  const totalPower = Math.round(energyNodes.reduce((a, b) => a + (b.consumption_kw || 0), 0) / 1000 * 150);

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
