import React from 'react';
//recharts
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
//components
import CustomTooltip from '../ui/CustomTooltip';

const ConsultationsByMonthChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(136, 132, 216, 0.1)' }} />
        <Legend formatter={() => 'Consultas'} />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
);

export default ConsultationsByMonthChart;
