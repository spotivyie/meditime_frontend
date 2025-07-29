import React from 'react';

const CustomTooltip = ({ payload }) => {
  if (!payload || payload.length === 0) return null;

  const { count, name, date } = payload[0].payload;

  return (
    <div className="bg-gray-900 p-2 rounded text-white">
      {name && <p><strong>Médico:</strong> {name}</p>}
      {date && <p><strong>Dia:</strong> {date}</p>}
      <p><strong>Consultas:</strong> {count}</p>
    </div>
  );
};

export default CustomTooltip;
