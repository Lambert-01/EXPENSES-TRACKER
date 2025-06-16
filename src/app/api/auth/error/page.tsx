'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
        <p className="text-gray-600 mb-6">
          {error === 'AccessDenied' && 'You do not have permission to sign in.'}
          {error === 'Configuration' && 'There is a problem with the server configuration.'}
          {!error && 'An unknown error occurred during authentication.'}
        </p>
        <Link 
          href="/login"
          className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
} 