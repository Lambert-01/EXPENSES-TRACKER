import { Transaction } from '@/server/transactions';
import { toast } from '@/components/ui/use-toast';

export function checkBudgetLimits(transactions: Transaction[], budgets: any) {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  // Group transactions by category for current month
  const spendingByCategory = transactions
    .filter(t => {
      const txDate = new Date(t.date);
      return txDate.getMonth() + 1 === currentMonth && 
             txDate.getFullYear() === currentYear &&
             t.type === 'EXPENSE';
    })
    .reduce((acc, t) => {
      const categoryId = t.categoryId || 'uncategorized';
      acc[categoryId] = (acc[categoryId] || 0) + t.amount;
      return acc;
    }, {} as Record<string | number, number>);

  // Check each budget
  budgets.forEach((budget: any) => {
    const spent = spendingByCategory[budget.categoryId] || 0;
    const remaining = budget.amount - spent;
    const percentUsed = (spent / budget.amount) * 100;

    if (percentUsed >= 90) {
      toast({
        title: "Budget Alert",
        description: `You've used ${percentUsed.toFixed(0)}% of your ${budget.category} budget!`,
        variant: "destructive",
      });
    } else if (percentUsed >= 75) {
      toast({
        title: "Budget Warning",
        description: `You've used ${percentUsed.toFixed(0)}% of your ${budget.category} budget.`,
        variant: "warning",
      });
    }
  });
} 