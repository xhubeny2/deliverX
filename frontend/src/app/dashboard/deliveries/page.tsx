import React, { Suspense } from 'react';
// import { api } from '@/lib/api';
import { DeliveriesTableWrapper } from '@/components/DeliveriesTable/DeliveriesTableWrapper';
import EditDeliveryDrawer from '@/components/EditDeliveryDrawer/EditDeliveryDrawer';
import { DashboardHeader } from '@/components/DashboardHeader/DashboardHeader';

export default async function DeliveriesPage() {
  return (
    <div className="flex-1 space-y-8 pt-2">
      <DashboardHeader heading="Deliveries" text="Management and tracking of all parcels" />
      {/*TODO: udelat skeleton*/}
      <Suspense fallback={<div>Loading...</div>}>
        <DeliveriesTableWrapper />
      </Suspense>

      <Suspense fallback={null}>
        <EditDeliveryDrawer />
      </Suspense>
    </div>
  );
}
