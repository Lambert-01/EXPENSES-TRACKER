import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import DashboardPage from '@/components/dashboard/DashboardPage';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }

  return <DashboardPage />;
} 