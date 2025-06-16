import { db } from '@/lib/db';
import { transactions, categories } from '@/server/schema';
import { eq, sql } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CategoryBreakdown } from './CategoryBreakdown';

async function getCategorySpending() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const result = await db
    .select({
      category: categories.name,
      total: sql<number>`sum(${transactions.amount})`,
    })
    .from(transactions)
    .innerJoin(categories, eq(transactions.categoryId, categories.id))
    .where(eq(transactions.userId, session.user.id))
    .groupBy(categories.name);

  return result;
}

export async function CategoryBreakdownServer() {
  const data = await getCategorySpending();
  return <CategoryBreakdown data={data} />;
} 