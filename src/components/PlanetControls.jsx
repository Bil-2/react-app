import React from 'react';

const PlanetControls = ({ speeds, updateSpeed }) => {
  return (
    <div style={{ padding: '10px', background: '#111', color: '#fff', overflowX: 'auto' }}>
      <h3 style={{ marginBottom: '10px' }}>Planet Speed Controls</h3>
      {Object.entries(speeds).map(([planet, speed]) => (
        <div key={planet} style={{ marginBottom: '10px' }}>
          <label>
            <strong>{planet}</strong>: {speed.toFixed(2)}
            <input
              type="range"
              min="0.1"
              max="5"
              step="0.1"
              value={speed}
              onChange={(e) => updateSpeed(planet, e.target.value)}
              style={{ width: '200px', marginLeft: '10px' }}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default PlanetControls;