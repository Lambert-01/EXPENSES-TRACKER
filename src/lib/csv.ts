import { Transaction } from '@/server/transactions';

export function exportToCSV(transactions: Transaction[]) {
  const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
  const rows = transactions.map(t => [
    new Date(t.date).toLocaleDateString(),
    t.type,
    t.categoryId || 'Uncategorized',
    t.description,
    (t.amount / 100).toFixed(2) // Assuming amount is stored in cents
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `transactions-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 