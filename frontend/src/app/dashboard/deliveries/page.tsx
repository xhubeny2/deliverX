import React from 'react';
import { api } from '@/lib/api';

export default async function DeliveriesPage() {
  const deliveries = await api.get('/deliveries');

  return (
    <div>
      Deliveries Page
      <pre>{JSON.stringify(deliveries, null, 2)}</pre>
    </div>
  );
}
