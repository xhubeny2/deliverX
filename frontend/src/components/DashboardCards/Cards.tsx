import React from 'react';
import Card from '@/components/DashboardCards/Card';
import {
  IconPackage,
  IconMapPinX,
  IconSteeringWheel,
  IconTruckDelivery,
} from '@tabler/icons-react';
import { getCardsData } from '@/lib/data';

// Sample data for the cards
const cardData = [
  {
    title: 'To deliver today',
    icon: IconPackage,
    description: 'parcels in total',
  },
  {
    title: 'Unassigned',
    icon: IconMapPinX,
    description: 'waiting for scheduling',
  },
  {
    title: 'Active drivers',
    icon: IconSteeringWheel,
  },
  {
    title: 'Success rate (TODO)',
    icon: IconTruckDelivery,
    description: '+2% compared to yesterday',
  },
];

export default async function DashboardCards() {
  const { todaysDeliveries, unassignedDeliveries, activeDrivers, totalDrivers } =
    await getCardsData();

  const liveCardData = [
    { ...cardData[0], value: todaysDeliveries },
    { ...cardData[1], value: unassignedDeliveries, warning: unassignedDeliveries > 0 },
    {
      ...cardData[2],
      value: activeDrivers,
      subValue: ` / ${totalDrivers}`,
      description: `${totalDrivers - activeDrivers} drivers are off`,
    },
    { ...cardData[3], value: '98%' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {liveCardData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}
