import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardPage from '@/components/dashboard/DashboardPage';
import "@/styles/dashboard.css";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="dashboard-wrapper">
      <DashboardPage />
    </div>
  );
} 