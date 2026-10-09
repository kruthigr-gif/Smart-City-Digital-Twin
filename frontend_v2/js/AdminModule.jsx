const { useState } = React;

function AdminModule({ sendWsMessage }) {
  const [trafficLoad, setTrafficLoad] = useState(1.0);
  
  const handleTriggerEmergency = () => {
    sendWsMessage({ action: 'trigger_emergency' });
  };
  
  const handleTrafficChange = (e) => {
    const val = parseFloat(e.target.value);
    setTrafficLoad(val);
    sendWsMessage({ action: 'set_traffic', multiplier: val });
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <h2 className="text-3xl font-light mb-8 flex items-center gap-3"><IconSettings /> Admin Panel</h2>
      
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
            <p className="text-xs text-slate-500 mt-2">Forces the simulator to generate a critical event.</p>
          </div>
        </div>
        
        <div className="glass-panel p-6">
           <h3 className="text-lg font-semibold mb-4 text-slate-300">AI Chatbot (Beta)</h3>
           <div className="h-48 bg-slate-900 border border-slate-700 rounded p-4 mb-4 overflow-y-auto">
             <div className="text-sm text-blue-400 mb-2"><strong>Operator:</strong> Why is Whitefield traffic high today?</div>
             <div className="text-sm text-slate-300 mb-4"><strong>AI:</strong> There is a severe traffic accident on Main Road restricting 2 lanes. I have dispatched alternate routes to connected vehicles.</div>
           </div>
           <input type="text" placeholder="Ask City AI..." className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm text-slate-300 focus:border-blue-500 focus:outline-none" />
        </div>
      </div>
    </div>
  );
}
