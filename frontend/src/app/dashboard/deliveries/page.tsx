import React, { Suspense } from 'react';
// import { api } from '@/lib/api';
import { DeliveriesTableWrapper } from '@/components/DeliveriesTable/DeliveriesTableWrapper';
import EditDeliveryDrawerWrapper from '@/components/DeliveryEditor/EditDeliveryDrawerWrapper';
import { DashboardHeader } from '@/components/DashboardHeader/DashboardHeader';

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DeliveriesPage({ searchParams }: PageProps) {
  // const deliveries = await api.get('/deliveries');
  const editDeliveryId = (await searchParams).editId as string;
  const newDelivery = (await searchParams).create as string;

  return (
    <div className="flex-1 space-y-8 pt-2">
      <DashboardHeader heading="Deliveries" text="Management and tracking of all parcels" />

      {/*TODO: udelat skeleton*/}
      <Suspense fallback={<div>Loading...</div>}>
        <DeliveriesTableWrapper />
      </Suspense>
      {(editDeliveryId || newDelivery === 'new') && (
        <EditDeliveryDrawerWrapper deliveryId={editDeliveryId} create={newDelivery === 'new'} />
      )}
    </div>
  );
}
