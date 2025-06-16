import { db } from '@/lib/db';
import { savings } from './schema';
import { and, desc, eq } from 'drizzle-orm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export type SavingsGoal = typeof savings.$inferSelect;
export type NewSavingsGoal = typeof savings.$inferInsert;

export async function getSavingsGoals() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    return await db
      .select()
      .from(savings)
      .where(eq(savings.userId, session.user.id))
      .orderBy(desc(savings.createdAt));
  } catch (error) {
    console.error('Error fetching savings goals:', error);
    throw error;
  }
}

export async function createSavingsGoal(data: NewSavingsGoal) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    return await db.insert(savings).values({
      ...data,
      userId: session.user.id,
    });
  } catch (error) {
    console.error('Error creating savings goal:', error);
    throw error;
  }
}

export async function updateSavingsGoal(id: number, data: Partial<NewSavingsGoal>) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    return await db
      .update(savings)
      .set(data)
      .where(
        and(
          eq(savings.id, id),
          eq(savings.userId, session.user.id)
        )
      );
  } catch (error) {
    console.error('Error updating savings goal:', error);
    throw error;
  }
}

export async function deleteSavingsGoal(id: number) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    return await db
      .delete(savings)
      .where(
        and(
          eq(savings.id, id),
          eq(savings.userId, session.user.id)
        )
      );
  } catch (error) {
    console.error('Error deleting savings goal:', error);
    throw error;
  }
}

export async function updateSavingsProgress(id: number, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      throw new Error('Unauthorized');
    }

    const goal = await db
      .select()
      .from(savings)
      .where(
        and(
          eq(savings.id, id),
          eq(savings.userId, session.user.id)
        )
      )
      .then(rows => rows[0]);

    if (!goal) {
      throw new Error('Savings goal not found');
    }

    const newAmount = goal.currentAmount + amount;
    const completed = newAmount >= goal.targetAmount;

    return await db
      .update(savings)
      .set({
        currentAmount: newAmount,
        completed,
      })
      .where(eq(savings.id, id));
  } catch (error) {
    console.error('Error updating savings progress:', error);
    throw error;
  }
} 