import { db } from '@/lib/db';
import { budgets, transactions, categories } from '@/server/schema';
import { eq, and, sql } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

async function getBudgetProgress() {
  const session = await getServerSession(authOptions);
  if (!session) return [];

  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const result = await db
    .select({
      category: categories.name,
      limit: budgets.amount,
      spent: sql<number>`COALESCE(SUM(${transactions.amount}), 0)`,
    })
    .from(budgets)
    .innerJoin(categories, eq(budgets.categoryId, categories.id))
    .leftJoin(
      transactions,
      and(
        eq(transactions.categoryId, categories.id),
        eq(transactions.userId, session.user.id),
        sql`${transactions.date} >= ${firstDayOfMonth}`,
        sql`${transactions.date} <= ${lastDayOfMonth}`
      )
    )
    .where(
      and(
        eq(budgets.userId, session.user.id),
        eq(budgets.month, currentDate.getMonth() + 1),
        eq(budgets.year, currentDate.getFullYear())
      )
    )
    .groupBy(categories.name, budgets.amount);

  return result;
}

export async function BudgetProgress() {
  const data = await getBudgetProgress();

  return (
    <div className="space-y-6">
      {data.map((item) => {
        const percentage = Math.min((item.spent / item.limit) * 100, 100);
        const isOverBudget = item.spent > item.limit;
        const isNearLimit = percentage >= 80 && !isOverBudget;

        return (
          <div key={item.category} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.category}
                  </span>
                  {(isOverBudget || isNearLimit) && (
                    <AlertCircle className={`h-4 w-4 ${
                      isOverBudget 
                        ? 'text-red-500 dark:text-red-400'
                        : 'text-yellow-500 dark:text-yellow-400'
                    }`} />
                  )}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {formatCurrency(item.spent)} of {formatCurrency(item.limit)}
                </div>
              </div>
              <span className={`text-sm font-medium ${
                isOverBudget
                  ? 'text-red-600 dark:text-red-400'
                  : isNearLimit
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : 'text-green-600 dark:text-green-400'
              }`}>
                {percentage.toFixed(0)}%
              </span>
            </div>
            <Progress
              value={percentage}
              className={`h-2 ${
                isOverBudget
                  ? 'bg-red-100 dark:bg-red-950'
                  : isNearLimit
                    ? 'bg-yellow-100 dark:bg-yellow-950'
                    : 'bg-green-100 dark:bg-green-950'
              }`}
              indicatorClassName={
                isOverBudget
                  ? 'bg-red-600 dark:bg-red-400'
                  : isNearLimit
                    ? 'bg-yellow-600 dark:bg-yellow-400'
                    : 'bg-green-600 dark:bg-green-400'
              }
            />
          </div>
        );
      })}
    </div>
  );
} 