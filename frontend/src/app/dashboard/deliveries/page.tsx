import React, { Suspense } from 'react';
// import { api } from '@/lib/api';
import { DeliveriesTableWrapper } from '@/components/DeliveriesTable/DeliveriesTableWrapper';

export default function DeliveriesPage() {
  // const deliveries = await api.get('/deliveries');

  return (
    <div>
      {/*TODO: udelat skeleton*/}
      <Suspense fallback={<div>Loading...</div>}>
        <DeliveriesTableWrapper />
      </Suspense>
    </div>
  );
}
