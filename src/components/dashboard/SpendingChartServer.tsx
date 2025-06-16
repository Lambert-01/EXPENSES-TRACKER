import { transactions } from '@/server/schema';
import { db } from '@/lib/db';
import { eq, sql } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { SpendingChart } from './SpendingChart';

async function getMonthlySpending() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const result = await db
    .select({
      month: sql<string>`to_char(${transactions.date}, 'Month')`,
      total: sql<number>`sum(${transactions.amount})`,
    })
    .from(transactions)
    .where(eq(transactions.userId, session.user.id))
    .groupBy(sql`to_char(${transactions.date}, 'Month')`);

  return result;
}

export async function SpendingChartServer() {
  const data = await getMonthlySpending();
  return <SpendingChart data={data} />;
} 