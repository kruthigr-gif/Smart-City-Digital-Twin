import { Activity, Car, AlertTriangle, Cloud } from 'lucide-react'

export default function Dashboard({ sensorData, predictions }) {
  const nodes = Object.values(sensorData)
  
  if (nodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <Activity className="animate-pulse mb-4" size={32} />
        <p>Waiting for sensor streams...</p>
      </div>
    )
  }

  // Calculate some aggregates
  const trafficNodes = nodes.filter(n => n.topic === 'traffic')
  const envNodes = nodes.filter(n => n.topic === 'environment')
  
  const avgAqi = envNodes.length > 0 
    ? Math.round(envNodes.reduce((acc, curr) => acc + curr.aqi, 0) / envNodes.length)
    : 0

  return (
    <div className="space-y-6">
      {/* High Level Alerts */}
      {avgAqi > 100 && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={18} />
          <div>
            <h4 className="text-red-400 font-semibold text-sm">Poor Air Quality Alert</h4>
            <p className="text-xs text-gray-400 mt-1">Average AQI is {avgAqi}. Consider issuing health advisories.</p>
          </div>
        </div>
      )}

      {/* Traffic Section */}
      <section>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Car size={16} /> Traffic Prediction
        </h3>
        <div className="space-y-3">
          {trafficNodes.map(node => {
             const pred = predictions[node.node_id]
             const congestion = pred?.value || 0
             return (
               <div key={node.node_id} className="bg-dark-800 p-3 rounded-lg border border-dark-700/50">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-sm font-medium">Sector {node.node_id}</span>
                   <span className={`text-xs px-2 py-0.5 rounded-full ${congestion > 70 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                     {congestion > 70 ? 'Heavy' : 'Clear'}
                   </span>
                 </div>
                 <div className="w-full bg-dark-900 rounded-full h-1.5 mt-2">
                   <div 
                     className={`h-1.5 rounded-full transition-all duration-500 ${congestion > 70 ? 'bg-red-500' : congestion > 30 ? 'bg-yellow-500' : 'bg-green-500'}`}
                     style={{ width: `${congestion}%` }}
                   ></div>
                 </div>
               </div>
             )
          })}
        </div>
      </section>

      {/* Environment Section */}
      <section>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Cloud size={16} /> Environment
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {envNodes.slice(0,4).map(node => (
            <div key={node.node_id} className="bg-dark-800 p-3 rounded-lg border border-dark-700/50 flex flex-col justify-between">
               <span className="text-xs text-gray-400">Node {node.node_id}</span>
               <div className="mt-2 text-xl font-light text-accent-purple">
                 {node.aqi} <span className="text-xs text-gray-500">AQI</span>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
