import { Metadata } from 'next';
import { IconTruckDelivery } from '@tabler/icons-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LoginForm from '@/components/login/LoginForm';

export const metadata: Metadata = {
  title: 'Login - DeliverX',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm border-0 shadow-xl sm:border sm:shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary">
              <IconTruckDelivery className="size-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Enter your email to sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
