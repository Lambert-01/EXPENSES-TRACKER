import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function calculatePercentage(value: number, total: number) {
  if (total === 0) return 0;
  return (value / total) * 100;
}

export function groupByCategory<T extends { categoryId: number | null }>(
  items: T[],
  categories: Record<number, string>
) {
  return items.reduce((acc, item) => {
    const categoryId = item.categoryId || 0;
    const categoryName = categories[categoryId] || 'Uncategorized';
    
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    
    acc[categoryName].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export function calculateMonthlyTotals(transactions: any[]) {
  return transactions.reduce(
    (acc, transaction) => {
      const amount = transaction.amount;
      if (transaction.type === 'INCOME') {
        acc.income += amount;
      } else {
        acc.expenses += amount;
      }
      acc.balance = acc.income - acc.expenses;
      return acc;
    },
    { income: 0, expenses: 0, balance: 0 }
  );
}

export function getCurrentMonthYear() {
  const now = new Date();
  return {
    month: now.getMonth() + 1, // JavaScript months are 0-based
    year: now.getFullYear(),
  };
} 