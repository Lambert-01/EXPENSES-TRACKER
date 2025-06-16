import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getTransactions } from '@/server/transactions';
import TransactionList from '@/components/TransactionList';

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  const transactions = await getTransactions();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Link
          href="/transactions/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add Transaction
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All Transactions</h2>
            <div className="flex gap-2">
              {/* Add filter/sort options here if needed */}
            </div>
          </div>

          {transactions.length > 0 ? (
            <TransactionList transactions={transactions} />
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No transactions found.</p>
              <p className="mt-2">
                Start by adding your first transaction using the button above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 