import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface BaseLineChartProps {
    data: any[];
    xAxisKey: string;
    lineKey: string;
    lineColor?: string;
    yAxisTickFormatter?: (value: any) => string;
}

export const BaseLineChart: React.FC<BaseLineChartProps> = ({ 
    data, 
    xAxisKey, 
    lineKey, 
    lineColor = '#3b82f6',
    yAxisTickFormatter 
}) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                    dataKey={xAxisKey} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748b', fontSize: 12 }} 
                    tickFormatter={yAxisTickFormatter}
                />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#1e293b', fontWeight: 500 }}
                    labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                />
                <Line 
                    type="monotone" 
                    dataKey={lineKey} 
                    stroke={lineColor} 
                    strokeWidth={3} 
                    dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} 
                    activeDot={{ r: 6, strokeWidth: 0 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
