'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleIcon, Loader2, Home } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get('redirect');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <CircleIcon className="h-12 w-12 text-orange-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {mode === 'signin' ? 'Sign in to your account' : 'Create your account'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" action={formAction}>
          <input type="hidden" name="redirect" value={redirect || ''} />
          <input type="hidden" name="inviteId" value={inviteId || ''} />

          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                defaultValue={state.email}
                required
                maxLength={50}
                className="rounded-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm w-full"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                defaultValue={state.password}
                required
                minLength={8}
                maxLength={100}
                className="rounded-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm w-full"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {state?.error && <div className="text-red-500 text-sm">{state.error}</div>}

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center items-center py-2 px-4 rounded-full text-white font-semibold bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg transform transition-all hover:scale-105"
              disabled={pending}
            >
              {pending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : mode === 'signin' ? 'Sign in' : 'Sign up'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center space-y-3">
          <div className="text-sm text-gray-500">
            {mode === 'signin' ? 'New to our platform?' : 'Already have an account?'}
          </div>

          <Link
            href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${redirect ? `?redirect=${redirect}` : ''}`}
            className="inline-block w-full py-2 px-4 rounded-full border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-sm transition"
          >
            {mode === 'signin' ? 'Create an account' : 'Sign in to existing account'}
          </Link>

          <Button
            onClick={() => router.push('/')}
            className="mt-4 w-full flex justify-center items-center py-2 px-4 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md transition"
          >
            <Home className="mr-2 h-4 w-4" />
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
