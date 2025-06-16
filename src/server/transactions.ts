import { db } from '@/lib/db';
import { transactions, transactionTypeEnum, categoryTypeEnum } from './schema';
import { and, desc, eq, gte, lte } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;

export async function getTransactions() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    return await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, session.user.id))
      .orderBy(desc(transactions.date));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

export async function getTransactionsByDateRange(startDate: Date, endDate: Date) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    return await db
      .select()
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, session.user.id),
          gte(transactions.date, startDate),
          lte(transactions.date, endDate)
        )
      )
      .orderBy(desc(transactions.date));
  } catch (error) {
    console.error('Error fetching transactions by date range:', error);
    throw error;
  }
}

export async function createTransaction(data: NewTransaction) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    return await db.insert(transactions).values({
      ...data,
      userId: session.user.id,
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
}

export async function updateTransaction(id: number, data: Partial<NewTransaction>) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    return await db
      .update(transactions)
      .set(data)
      .where(
        and(
          eq(transactions.id, id),
          eq(transactions.userId, session.user.id)
        )
      );
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
}

export async function deleteTransaction(id: number) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    return await db
      .delete(transactions)
      .where(
        and(
          eq(transactions.id, id),
          eq(transactions.userId, session.user.id)
        )
      );
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw error;
  }
} 