'use client';

import React from 'react';
import { format } from 'date-fns';
import { Transaction } from '@/lib/db';

interface TransactionListProps {
  transactions: Transaction[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium">{transaction.description}</p>
            <p className="text-sm text-gray-500">{transaction.category}</p>
          </div>
          <p className={`font-semibold ${transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'}`}>
            {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount.toString()}
          </p>
        </div>
      ))}
    </div>
  );
} 