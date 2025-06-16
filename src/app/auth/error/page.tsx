'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Authentication Error
        </h2>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  {error === 'OAuthSignin' && 'Error starting the sign in process'}
                  {error === 'OAuthCallback' && 'Error completing the sign in process'}
                  {error === 'OAuthCreateAccount' && 'Error creating your account'}
                  {error === 'EmailCreateAccount' && 'Error creating your account'}
                  {error === 'Callback' && 'Error during the callback process'}
                  {error === 'EmailSignin' && 'Error sending the sign in email'}
                  {!error && 'An unexpected error occurred'}
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>Please try again. If the problem persists, contact support.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Link
              href="/login"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 