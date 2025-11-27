import React, { Suspense } from 'react';
import { Cards, CardsSkeleton } from '@/components/dashboard/Cards';
import { GenerateButton, GenerateButtonSkeleton } from '@/components/dashboard/GenerateButton';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DriversSkeleton, Drivers } from '@/components/dashboard/DashboardDrivers';
import { EditRunDrawer } from '@/components/dashboard/EditRunDrawer';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 pt-2">
      <DashboardHeader
        heading="Dashboard"
        text={`Today’s Operations Overview - ${new Date().toLocaleDateString()}`}
      >
        <Suspense fallback={<GenerateButtonSkeleton />}>
          <GenerateButton />
        </Suspense>
      </DashboardHeader>

      {/* Overview (KPI) */}
      <Suspense fallback={<CardsSkeleton />}>
        <Cards />
      </Suspense>

      {/* Live fleet status */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Fleet Status (Live)</h3>
      </div>
      <Suspense fallback={<DriversSkeleton />}>
        <Drivers />
      </Suspense>

      <Suspense fallback={null}>
        <EditRunDrawer />
      </Suspense>
    </div>
  );
}
