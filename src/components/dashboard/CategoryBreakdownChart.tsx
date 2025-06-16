'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

interface CategoryData {
  category: string;
  total: number;
}

interface CategoryBreakdownChartProps {
  data: CategoryData[];
}

export function CategoryBreakdownChart({ data }: CategoryBreakdownChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="total"
          nameKey="category"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value) => [`$${value}`, 'Spending']}
          labelStyle={{ color: 'black' }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
} 