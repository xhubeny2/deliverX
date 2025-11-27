import React, { Suspense } from 'react';
// import { api } from '@/lib/api';
import EditDeliveryDrawer from '@/components/deliveries/EditDeliveryDrawer/EditDeliveryDrawer';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import {
  DeliveriesTableSkeleton,
  DeliveriesTableWrapper,
} from '@/components/deliveries/DeliveriesTable';

export default async function DeliveriesPage() {
  return (
    <div className="flex-1 space-y-8 pt-2">
      <DashboardHeader heading="Deliveries" text="Management and tracking of all parcels" />
      <Suspense fallback={<DeliveriesTableSkeleton />}>
        <DeliveriesTableWrapper />
      </Suspense>

      <Suspense fallback={null}>
        <EditDeliveryDrawer />
      </Suspense>
    </div>
  );
}
