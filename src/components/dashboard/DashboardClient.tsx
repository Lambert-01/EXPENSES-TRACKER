'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wallet, ArrowRight } from 'lucide-react';
import "@/styles/dashboard.css";

export function DashboardActions() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Button className="primary-button" asChild>
        <Link href="/transactions/new" className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Transaction
        </Link>
      </Button>
      <Button variant="outline" className="outline-button" asChild>
        <Link href="/budgets" className="flex items-center">
          <Wallet className="mr-2 h-4 w-4" />
          Manage Budgets
        </Link>
      </Button>
    </div>
  );
}

export function ViewAllTransactionsButton() {
  return (
    <Button variant="ghost" className="ghost-button" asChild size="sm">
      <Link href="/transactions" className="flex items-center">
        View All
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
} 