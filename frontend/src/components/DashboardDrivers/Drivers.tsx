import React from 'react';
import DriverCard, { DriverCardProps } from '@/components/DashboardDrivers/DriverCard';

// Mock data - replace with real data fetching logic
const data: DriverCardProps[] = [
  {
    name: 'Pepa Novák',
    status: 'onRoute',
    progress: 65,
    currentStop: 'Ulice Hlavní 12, Praha',
    packagesLeft: 12,
    avatar: 'PN',
  },
  {
    name: 'Karel Vomáčka',
    status: 'delayed',
    progress: 30,
    currentStop: 'Dlouhá 55, Brno (Kolona)',
    packagesLeft: 24,
    avatar: 'KV',
  },
  {
    name: 'Jana Rychlá',
    status: 'finished',
    progress: 100,
    currentStop: 'Depo (Návrat)',
    packagesLeft: 0,
    avatar: 'JR',
  },
];

export default function Drivers() {
  // fetch data here

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Fleet Status (Live)</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((d, i) => (
          <DriverCard key={i} {...d} />
        ))}
      </div>
    </div>
  );
}
