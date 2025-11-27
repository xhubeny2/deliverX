import React from 'react';
import DeliveriesTable from '@/components/deliveries/DeliveriesTable/DeliveriesTable';
import { getAllDeliveries } from '@/lib/data';

export async function DeliveriesTableWrapper() {
  const data = await getAllDeliveries();

  return <DeliveriesTable data={data || []} />;
}
