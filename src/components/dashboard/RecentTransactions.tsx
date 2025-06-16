import { db } from '@/lib/db';
import { transactions, categories } from '@/server/schema';
import { eq, desc } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

async function getRecentTransactions() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const result = await db
    .select({
      id: transactions.id,
      userId: transactions.userId,
      amount: transactions.amount,
      description: transactions.description,
      category: categories.name,
      type: transactions.type,
      date: transactions.date,
    })
    .from(transactions)
    .innerJoin(categories, eq(transactions.categoryId, categories.id))
    .where(eq(transactions.userId, session.user.id))
    .orderBy(desc(transactions.date))
    .limit(5);

  return result;
}

export async function RecentTransactions() {
  const transactions = await getRecentTransactions();

  return (
    <div className="space-y-4">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {transactions.map((tx) => (
          <div key={tx.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-full ${
                  tx.type === 'INCOME' 
                    ? 'bg-green-100 dark:bg-green-900' 
                    : 'bg-red-100 dark:bg-red-900'
                }`}>
                  {tx.type === 'INCOME' ? (
                    <ArrowUpCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowDownCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {tx.description}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800">
                      {tx.category}
                    </span>
                    <span>•</span>
                    <span>{format(new Date(tx.date), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
              <div className={`text-right ${
                tx.type === 'INCOME' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                <div className="text-sm font-medium">
                  {tx.type === 'INCOME' ? '+' : '-'} {formatCurrency(tx.amount)}
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
} 