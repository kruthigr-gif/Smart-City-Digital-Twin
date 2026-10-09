function EmergencyModule({ emergencies }) {
  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-3xl font-light mb-8 flex items-center gap-3 text-red-400"><IconAlert /> Emergency Detection</h2>
      
      <div className="glass-panel p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-slate-300">Live Alert Feed</h3>
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
