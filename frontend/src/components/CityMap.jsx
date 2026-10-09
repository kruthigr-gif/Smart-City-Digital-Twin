import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'

// Use a sleek dark map theme from CartoDB
const MAP_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

export default function CityMap({ sensorData, predictions }) {
  // Default center
  const center = [40.7128, -74.0060] // NYC
  
  return (
    <MapContainer 
      center={center} 
      zoom={12} 
      className="w-full h-full z-0"
      zoomControl={false}
    >
      <TileLayer
        url={MAP_URL}
        attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
      />
      
      {Object.values(sensorData).map((node) => {
        const pred = predictions[node.node_id]
        let color = '#3b82f6' // Default blue
        
        if (node.topic === 'traffic') {
           const congestion = pred?.value || 0
           color = congestion > 70 ? '#ef4444' : congestion > 30 ? '#eab308' : '#10b981'
        } else if (node.topic === 'environment') {
           color = node.aqi > 150 ? '#ef4444' : '#8b5cf6'
        } else if (node.topic === 'energy') {
           color = '#f59e0b'
        }

        return (
          <CircleMarker
            key={node.node_id}
            center={[node.lat, node.lon]}
            pathOptions={{ 
              color: color, 
              fillColor: color, 
              fillOpacity: 0.6,
              weight: 2
            }}
            radius={8}
          >
            <Popup className="custom-popup">
              <div className="p-1">
                <h3 className="font-bold border-b border-dark-700 pb-1 mb-2">Node {node.node_id}</h3>
                <div className="text-sm">
                  {node.topic === 'traffic' && (
                    <>
                      <div>Vehicles: <span className="font-mono text-accent-blue">{node.vehicle_count}</span></div>
                      <div>Speed: <span className="font-mono">{node.avg_speed?.toFixed(1)} km/h</span></div>
                      {pred && <div>Congestion: <span className="font-mono text-red-400">{pred.value.toFixed(1)}%</span></div>}
                    </>
                  )}
                  {node.topic === 'environment' && (
                    <>
                      <div>AQI: <span className="font-mono text-accent-purple">{node.aqi}</span></div>
                      <div>Temp: <span className="font-mono">{node.temperature?.toFixed(1)}°C</span></div>
                    </>
                  )}
                  {node.topic === 'energy' && (
                    <div>Usage: <span className="font-mono text-yellow-400">{node.consumption_kw?.toFixed(1)} kW</span></div>
                  )}
                  <div className="text-xs text-gray-500 mt-2">
                    Updated: {new Date(node.timestamp * 1000).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
