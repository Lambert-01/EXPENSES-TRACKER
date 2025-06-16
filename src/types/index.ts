export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'income' | 'expense';
  description: string;
  category: string;
  date: Date;
  createdAt: Date;
}

export interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface Session {
  user?: User;
  expires: Date;
}

export type TransactionCategory =
  | 'food'
  | 'transport'
  | 'utilities'
  | 'entertainment'
  | 'shopping'
  | 'health'
  | 'salary'
  | 'other'; 