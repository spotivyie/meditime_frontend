import React from 'react';
//recharts
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//components
import CustomTooltip from '../ui/CustomTooltip';

const ConsultationsByDayChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" tickFormatter={(day) => new Date(day).getDate()} tick={{ fill: '#ccc' }} />
        <YAxis tickFormatter={(value) => Math.floor(value)} tick={{ fill: '#ccc' }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={() => 'Consultas'} />
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
);

export default ConsultationsByDayChart;
