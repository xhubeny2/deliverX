'use client';

import { useOptimistic, useTransition } from 'react';
import { Delivery, Run, Driver } from '@/prisma/generated/client';
import { IconPackage } from '@tabler/icons-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import { toggleDeliveryStatus } from '@/lib/actions';
import DeliveryCard from '@/components/driver/DeliveryCard';
import SuccessState from '@/components/driver/SuccessState';

type RunWithData = Run & {
  driver: Driver;
  deliveries: Delivery[];
};

type OptimisticAction = {
  deliveryId: string;
  status: 'DELIVERED' | 'FAILED';
};

export default function DriverRunView({ run }: { run: RunWithData }) {
  const [, startTransition] = useTransition();
  const [optimisticDeliveries, setOptimisticStatus] = useOptimistic(
    run.deliveries,
    (state, action: OptimisticAction) => {
      return state.map((d) => (d.id === action.deliveryId ? { ...d, status: action.status } : d));
    },
  );

  const sortedDeliveries = [...optimisticDeliveries].sort((a, b) => {
    const isAInTransit = a.status === 'IN_TRANSIT';
    const isBInTransit = b.status === 'IN_TRANSIT';

    // IN_TRANSIT status comes first
    if (isAInTransit && !isBInTransit) return -1;
    if (!isAInTransit && isBInTransit) return 1;

    const orderA = a.order ?? 0;
    const orderB = b.order ?? 0;

    return orderA - orderB;
  });

  const total = optimisticDeliveries.length;
  const finishedCount = optimisticDeliveries.filter((d) => d.status !== 'IN_TRANSIT').length;
  const deliveredCount = optimisticDeliveries.filter((d) => d.status === 'DELIVERED').length;
  const failedCount = optimisticDeliveries.filter((d) => d.status === 'FAILED').length;
  const progress = total === 0 ? 0 : Math.round((finishedCount / total) * 100);
  const isRunComplete = total > 0 && finishedCount === total;

  const handleStatusChange = (deliveryId: string, status: 'DELIVERED' | 'FAILED') => {
    startTransition(async () => {
      setOptimisticStatus({ deliveryId, status });

      const result = await toggleDeliveryStatus(deliveryId, run.id, status);

      if (result.success) {
        toast.success(status === 'DELIVERED' ? 'Package delivered!' : 'Delivery failed logged.');
      } else {
        toast.error('Error updating status');
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* --- SUCCESS STATE: ALL DONE --- */}
      {isRunComplete && <SuccessState deliveredCount={deliveredCount} failedCount={failedCount} />}

      {/* Progress Section */}
      {!isRunComplete && (
        <div className="bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground font-medium">Run Progress</span>
            <span className="font-bold">
              {finishedCount}/{total} Stops
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>
      )}

      {/* Deliveries List */}
      <div className="space-y-4 pb-20">
        {isRunComplete && (
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-8 mb-2">
            Delivery History
          </h3>
        )}
        {sortedDeliveries.map((delivery, index) => (
          <DeliveryCard
            delivery={delivery}
            onStatusChange={handleStatusChange}
            key={delivery.id}
            index={index}
          />
        ))}
      </div>

      {sortedDeliveries.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <IconPackage className="mx-auto size-12 mb-2 opacity-20" />
          <p>No deliveries assigned to this run.</p>
        </div>
      )}
    </div>
  );
}
