import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import TransactionForm from '@/components/TransactionForm';

export default async function NewTransactionPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Add New Transaction</h1>
      
      <div className="bg-white rounded-lg shadow p-6">
        <TransactionForm />
      </div>
    </div>
  );
} 