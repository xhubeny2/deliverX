import React, { Suspense } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader/DashboardHeader';
import Cards from '@/components/DashboardCards/Cards';
import Drivers from '@/components/DashboardDrivers/Drivers';
import { CardsSkeleton } from '@/components/DashboardCards/CardsSkeleton';
import { DriversSkeleton } from '@/components/DashboardDrivers/DriversSkeleton';
// import EditRunDrawer from '@/components/EditRunDrawer/EditRunDrawer';
import { GenerateButton } from '@/components/GenerateButton';

export default async function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 pt-2">
      <DashboardHeader
        heading="Dashboard"
        text={`Today’s Operations Overview - ${new Date().toLocaleDateString()}`}
      >
        <GenerateButton />
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

      {/*<EditRunDrawer />*/}
    </div>
  );
}
