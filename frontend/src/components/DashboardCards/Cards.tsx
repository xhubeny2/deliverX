import React from 'react';
import Card from '@/components/DashboardCards/Card';
import {
  IconPackage,
  IconMapPinX,
  IconSteeringWheel,
  IconTruckDelivery,
} from '@tabler/icons-react';

// Sample data for the cards
const cardData = [
  {
    title: 'To deliver today',
    icon: IconPackage,
    value: '124',
    description: 'parcels in total',
  },
  {
    title: 'Unassigned',
    icon: IconMapPinX,
    value: '32',
    description: 'Waiting for scheduling',
    warning: true,
  },
  {
    title: 'Active drivers',
    icon: IconSteeringWheel,
    value: '4',
    subValue: ' / 6',
    description: '2 drivers are off',
  },
  {
    title: 'Success rate',
    icon: IconTruckDelivery,
    value: '98%',
    description: '+2% compared to yesterday',
  },
];

export default function DashboardCards() {
  // fetch data here

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
}
