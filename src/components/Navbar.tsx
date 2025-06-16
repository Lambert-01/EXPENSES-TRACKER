'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Receipt, 
  LogOut,
  CreditCard
} from 'lucide-react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <CreditCard className="h-6 w-6" />
              <span className="text-xl font-bold">Expense Tracker</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {session?.user ? (
              <>
                <Button variant="ghost" asChild className="flex items-center space-x-2">
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Link>
                </Button>
                
                <Button variant="ghost" asChild className="flex items-center space-x-2">
                  <Link href="/transactions">
                    <Receipt className="h-4 w-4 mr-2" />
                  Transactions
                </Link>
                </Button>

                <Button 
                  variant="ghost" 
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                </Button>
              </>
            ) : (
              <Button asChild>
                <Link href="/login">
                Sign In
              </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 