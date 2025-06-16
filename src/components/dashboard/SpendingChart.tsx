'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface SpendingData {
  month: string;
  total: number;
}

interface SpendingChartProps {
  data: SpendingData[];
}

export function SpendingChart({ data }: SpendingChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="month" 
          stroke="#6b7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          stroke="#6b7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          formatter={(value: number) => [formatCurrency(value), 'Spending']}
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            padding: '0.5rem',
          }}
          labelStyle={{ color: '#374151', fontWeight: 500 }}
        />
        <Bar 
          dataKey="total" 
          fill="url(#gradient)"
          radius={[4, 4, 0, 0]}
        />
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
} 