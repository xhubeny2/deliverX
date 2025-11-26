import React from 'react';
import DriverCard from '@/components/DashboardDrivers/DriverCard';
import { getDriversWithTodayRuns } from '@/lib/data';

export default async function Drivers() {
  const drivers = await getDriversWithTodayRuns();
  if (!drivers) {
    return <div>No drivers data available.</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {drivers.map((d, i) => (
        <DriverCard key={d.id} {...d} />
      ))}
    </div>
  );
}
