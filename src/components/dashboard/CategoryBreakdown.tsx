'use client';

import { CategoryBreakdownChart } from './CategoryBreakdownChart';

interface CategoryBreakdownProps {
  data: {
    category: string;
    total: number;
  }[];
}

export function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  return <CategoryBreakdownChart data={data} />;
} 