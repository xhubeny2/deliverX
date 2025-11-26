import React from 'react';
import { CardProps, Card } from '.';
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
    title: 'To deliver',
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
    title: 'Delivered',
    icon: IconTruckDelivery,
    description: 'finished deliveries',
  },
];

export async function Cards() {
  const {
    todaysDeliveries,
    unassignedDeliveries,
    activeDrivers,
    totalDrivers,
    finishedDeliveries,
  } = await getCardsData();

  const liveCardData: CardProps[] = [
    { ...cardData[0], value: todaysDeliveries },
    {
      ...cardData[3],
      value: finishedDeliveries,
      type: finishedDeliveries > 0 ? 'success' : 'default',
    },
    {
      ...cardData[1],
      value: unassignedDeliveries,
      type: unassignedDeliveries > 0 ? 'warning' : 'default',
    },
    {
      ...cardData[2],
      value: activeDrivers,
      subValue: ` / ${totalDrivers}`,
      description: `${totalDrivers - activeDrivers} drivers are off`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {liveCardData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}
