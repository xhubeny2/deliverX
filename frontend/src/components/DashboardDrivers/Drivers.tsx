import React from 'react';
import DriverCard, { DriverStatus } from '@/components/DashboardDrivers/DriverCard';
import { getDriversData } from '@/lib/data';
import { getAvatar } from '@/utils/getAvatar';

const data: {
  status: DriverStatus;
  progress: number;
  currentStop: string;
  packagesLeft: number;
}[] = [
  {
    status: DriverStatus.ON_ROUTE,
    progress: 65,
    currentStop: 'Ulice Hlavní 12, Praha',
    packagesLeft: 12,
  },
  {
    status: DriverStatus.DELAYED,
    progress: 30,
    currentStop: 'Dlouhá 55, Brno (Kolona)',
    packagesLeft: 24,
  },
  {
    status: DriverStatus.FINISHED,
    progress: 100,
    currentStop: 'Depo (Návrat)',
    packagesLeft: 0,
  },
];

export default async function Drivers() {
  const { drivers } = await getDriversData();
  if (!drivers) {
    return <div>No drivers data available.</div>;
  }

  const driversComplete = drivers.map((driver, index) => ({
    ...data[index],
    avatar: getAvatar(driver.name),
    ...driver,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {driversComplete.map((d, i) => (
        <DriverCard key={d.id} {...d} />
      ))}
    </div>
  );
}
