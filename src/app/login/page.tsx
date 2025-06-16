import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { LoginButtons } from '@/components/LoginButtons';
import './login.css';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo and Title */}
        <div className="login-header">
          <h1 className="login-title">Expense Tracker</h1>
          <p className="login-subtitle">
            Take control of your finances
          </p>
        </div>

        {/* Sign In Options */}
        <LoginButtons />

        {/* Features Section */}
        <div className="features">
          <h2 className="features-title">Why Choose Us?</h2>
          <div className="space-y-3">
            <div className="feature-item">
              <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Track expenses and income easily</span>
            </div>
            <div className="feature-item">
              <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Visualize spending patterns</span>
            </div>
            <div className="feature-item">
              <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
              <span>Set and manage budgets</span>
            </div>
          </div>
        </div>

        {/* Terms and Privacy */}
        <p className="terms">
          By signing in, you agree to our{' '}
          <a href="/terms">Terms of Service</a>
          {' '}and{' '}
          <a href="/privacy">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
} 