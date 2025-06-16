import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createTransaction, deleteTransaction, updateTransaction } from '@/server/transactions';
import { z } from 'zod';

const transactionSchema = z.object({
  amount: z.number().positive(),
  description: z.string().min(1),
  type: z.enum(['INCOME', 'EXPENSE']),
  categoryId: z.number().optional(),
  date: z.string().transform(str => new Date(str)),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const json = await request.json();
    const validatedData = transactionSchema.parse(json);

    const result = await createTransaction({
      ...validatedData,
      userId: session.user.id,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating transaction:', error);
    return new NextResponse(
      error instanceof z.ZodError
        ? 'Invalid transaction data'
        : 'Failed to create transaction',
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const json = await request.json();
    const { id, ...data } = json;
    const validatedData = transactionSchema.partial().parse(data);

    const result = await updateTransaction(id, {
      ...validatedData,
      userId: session.user.id,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating transaction:', error);
    return new NextResponse(
      error instanceof z.ZodError
        ? 'Invalid transaction data'
        : 'Failed to update transaction',
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new NextResponse('Transaction ID is required', { status: 400 });
    }

    await deleteTransaction(Number(id));
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return new NextResponse('Failed to delete transaction', { status: 400 });
  }
} 