'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface MonthlyData {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

interface MonthlyTrendsChartProps {
  data: MonthlyData[];
}

export function MonthlyTrendsChart({ data }: MonthlyTrendsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip 
          formatter={(value) => [`$${value}`, '']}
          labelStyle={{ color: 'black' }}
        />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#4ade80" name="Income" />
        <Line type="monotone" dataKey="expense" stroke="#f43f5e" name="Expenses" />
        <Line type="monotone" dataKey="savings" stroke="#3b82f6" name="Net Savings" />
      </LineChart>
    </ResponsiveContainer>
  );
} 