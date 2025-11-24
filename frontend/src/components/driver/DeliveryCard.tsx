'use client';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IconCheck, IconMap2, IconPhone, IconX } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Delivery } from '@/../generated/prisma/client';

interface DeliveryCardProps {
  index: number;
  delivery: Delivery;
  onStatusChange: (deliveryId: string, status: 'DELIVERED' | 'FAILED') => void;
}

export default function DeliveryCard({ index, delivery, onStatusChange }: DeliveryCardProps) {
  const isNext = index === 0 && delivery.status === 'IN_TRANSIT';
  const isDone = delivery.status === 'DELIVERED';
  const isFailed = delivery.status === 'FAILED';

  return (
    <Card
      key={delivery.id}
      className={`
                overflow-hidden transition-all
                ${isNext ? 'border-2 border-sky-600 shadow-lg scale-[1.01]' : ''}
                ${isDone ? 'opacity-60 bg-slate-50' : ''}
              `}
    >
      {isNext && (
        <div className="bg-sky-600 text-white text-xs font-bold px-3 py-1 text-center">
          NEXT STOP
        </div>
      )}

      <CardHeader className="pb-2 pt-4">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              {delivery.orderNumber}
            </Badge>
            <h3 className="font-bold text-lg">{delivery.recipientName}</h3>
          </div>

          {isDone && <Badge className="bg-green-600 text-lime-100">Delivered</Badge>}
          {isFailed && <Badge variant="destructive">Failed</Badge>}
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="flex items-start gap-2 text-slate-600 mb-4">
          <IconMap2 className="size-5 shrink-0 mt-0.5" />
          <p className="text-base font-medium leading-tight">{delivery.address}</p>
        </div>

        {/* Action Buttons (Only for Pending) */}
        {!isDone && !isFailed && (
          <div className="grid grid-cols-2 gap-3 mb-2">
            <Button
              variant="outline"
              className="w-full h-12 text-base"
              // Link to Google Maps Navigation
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(delivery.address)}`,
                  '_blank',
                )
              }
            >
              <IconMap2 className="mr-2" />
              Navigate
            </Button>
            <Button variant="outline" className="w-full h-12 text-base">
              <IconPhone className="mr-2" />
              Call
            </Button>
          </div>
        )}
      </CardContent>

      {!isDone && !isFailed && (
        <CardFooter className="bg-neutral-50 p-3 flex gap-2">
          <Button
            className="flex-1 bg-green-500 hover:bg-green-700 h-12 text-lg font-bold text-lime-50"
            onClick={() => onStatusChange(delivery.id, 'DELIVERED')}
          >
            <IconCheck className="mr-2" /> Deliver
          </Button>

          <Button
            variant="destructive"
            className="w-12 h-12 p-0"
            onClick={() => onStatusChange(delivery.id, 'FAILED')}
          >
            <IconX />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
