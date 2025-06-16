'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';
import { Transaction } from '@/lib/db';

interface ChartProps {
  transactions: Transaction[];
}

export default function Chart({ transactions }: ChartProps) {
  const data = transactions.reduce((acc, transaction) => {
    const category = transaction.category;
    const amount = Number(transaction.amount);
    
    acc[category] = (acc[category] || 0) + (transaction.type === 'EXPENSE' ? amount : 0);
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(data).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#4F46E5" name="Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 