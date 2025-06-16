import { db } from '@/lib/db';
import { transactions } from '@/server/schema';
import { eq, sql } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { MonthlyTrendsChart } from './MonthlyTrendsChart';

async function getMonthlyTrends() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const result = await db
    .select({
      month: sql<string>`to_char(date, 'Mon')`,
      income: sql<number>`sum(case when type = 'INCOME' then amount else 0 end)`,
      expense: sql<number>`sum(case when type = 'EXPENSE' then amount else 0 end)`,
      savings: sql<number>`sum(case when type = 'INCOME' then amount else -amount end)`,
    })
    .from(transactions)
    .where(eq(transactions.userId, session.user.id))
    .groupBy(sql`to_char(date, 'Mon')`)
    .orderBy(sql`min(date)`);

  return result;
}

export async function MonthlyTrends() {
  const data = await getMonthlyTrends();

  return <MonthlyTrendsChart data={data} />;
} 