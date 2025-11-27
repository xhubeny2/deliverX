import Link from 'next/link';
import { IconTruckDelivery, IconArrowRight, IconSparkles } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 border border-slate-100 shadow-sm">
        <IconTruckDelivery className="h-12 w-12 text-slate-900" />
      </div>

      <Badge
        variant="outline"
        className="mb-6 py-1 px-3 text-sm border-orange-200 text-orange-700 bg-orange-50"
      >
        <IconSparkles className="mr-1 size-3 fill-orange-500 text-orange-500" />
        AI-Powered Logistics
      </Badge>

      <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-3">
        DeliverX
      </h1>

      <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 mb-6 pb-1">
        Plan routes fast. Deliver faster!
      </h2>

      <p className="mb-10 max-w-lg text-lg text-slate-600 leading-relaxed">
        The smart logistics platform for modern delivery fleets. <br className="hidden sm:block" />
        Optimize your daily runs, track drivers in real-time, and scale your operations with AI
        assistance.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/dashboard">
          <Button
            size="lg"
            className="gap-2 h-12 px-8 text-base bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all hover:scale-105"
          >
            Go to Dashboard <IconArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="/login">
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 text-base border-slate-200 hover:bg-slate-50 transition-all hover:scale-105"
          >
            Sign In
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-8 text-sm text-slate-400">
        &copy; 2025 DeliverX Inc. Demo Project.
      </div>
    </div>
  );
}
