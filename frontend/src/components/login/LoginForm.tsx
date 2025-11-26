'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/login';
import { useSearchParams } from 'next/navigation';
import { IconAlertCircleFilled } from '@tabler/icons-react';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="name@example.com"
          required
          // Default value for demo purposes
          defaultValue="dispecer@deliverx.com"
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
        </div>
        <Input id="password" type="password" name="password" required defaultValue="123456" />
      </div>
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <Button type="submit" className="w-full mt-2" aria-disabled={isPending}>
        Sign in
      </Button>
      {errorMessage && (
        <>
          <IconAlertCircleFilled className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{errorMessage}</p>
        </>
      )}
    </form>
  );
}
