import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SpendingChartServer } from "./SpendingChartServer";
import { MonthlyTrends } from "./MonthlyTrends";
import { RecentTransactions } from "./RecentTransactions";
import { CategoryBreakdownServer } from "./CategoryBreakdownServer";
import { BudgetProgress } from "./BudgetProgress";
import { DashboardActions, ViewAllTransactionsButton } from "./DashboardClient";
import { 
  BarChart3, 
  PieChart,
  Clock,
  Wallet,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import "@/styles/dashboard.css";

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-inner">
        {/* Header Section */}
        <div className="dashboard-header">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-2">
              <h1 className="dashboard-title">Financial Overview</h1>
              <p className="dashboard-subtitle">
                Track your expenses and manage your budget effectively
              </p>
            </div>
            <DashboardActions />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="stat-card">
            <div className="flex items-center gap-4">
              <div className="stat-icon-container stat-blue">
                <DollarSign className="stat-icon stat-icon-blue" />
              </div>
              <div>
                <p className="stat-label">Total Balance</p>
                <h3 className="stat-value">$24,500</h3>
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="flex items-center gap-4">
              <div className="stat-icon-container stat-green">
                <TrendingUp className="stat-icon stat-icon-green" />
              </div>
              <div>
                <p className="stat-label">Monthly Income</p>
                <h3 className="stat-value">$8,200</h3>
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="flex items-center gap-4">
              <div className="stat-icon-container stat-red">
                <BarChart3 className="stat-icon stat-icon-red" />
              </div>
              <div>
                <p className="stat-label">Monthly Expenses</p>
                <h3 className="stat-value">$5,400</h3>
              </div>
            </div>
          </Card>

          <Card className="stat-card">
            <div className="flex items-center gap-4">
              <div className="stat-icon-container stat-purple">
                <Wallet className="stat-icon stat-icon-purple" />
              </div>
              <div>
                <p className="stat-label">Savings</p>
                <h3 className="stat-value">$3,100</h3>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Overview */}
          <Card className="chart-card">
            <div className="chart-header">
              <div className="chart-title-container">
                <div className="chart-icon-container bg-blue-100 dark:bg-blue-900">
                  <BarChart3 className="chart-icon text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="chart-title">Monthly Overview</h2>
              </div>
            </div>
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <SpendingChartServer />
            </Suspense>
          </Card>

          {/* Category Breakdown */}
          <Card className="chart-card">
            <div className="chart-header">
              <div className="chart-title-container">
                <div className="chart-icon-container bg-purple-100 dark:bg-purple-900">
                  <PieChart className="chart-icon text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="chart-title">Spending by Category</h2>
              </div>
            </div>
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <CategoryBreakdownServer />
            </Suspense>
          </Card>

          {/* Budget Progress */}
          <Card className="chart-card">
            <div className="chart-header">
              <div className="chart-title-container">
                <div className="chart-icon-container bg-green-100 dark:bg-green-900">
                  <Wallet className="chart-icon text-green-600 dark:text-green-400" />
                </div>
                <h2 className="chart-title">Budget Progress</h2>
              </div>
            </div>
            <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
              <BudgetProgress />
            </Suspense>
          </Card>

          {/* Recent Transactions */}
          <Card className="chart-card">
            <div className="chart-header">
              <div className="chart-title-container">
                <div className="chart-icon-container bg-orange-100 dark:bg-orange-900">
                  <Clock className="chart-icon text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="chart-title">Recent Transactions</h2>
              </div>
              <ViewAllTransactionsButton />
            </div>
            <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
              <RecentTransactions />
            </Suspense>
          </Card>

          {/* Monthly Trends */}
          <Card className="chart-card col-span-1 lg:col-span-2">
            <div className="chart-header">
              <div className="chart-title-container">
                <div className="chart-icon-container bg-indigo-100 dark:bg-indigo-900">
                  <BarChart3 className="chart-icon text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="chart-title">Monthly Trends</h2>
              </div>
            </div>
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <MonthlyTrends />
            </Suspense>
          </Card>
        </div>
      </div>
    </div>
  );
} 