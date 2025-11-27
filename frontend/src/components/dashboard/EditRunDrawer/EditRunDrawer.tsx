'use client';

import React, { useEffect } from 'react';
import useSWR from 'swr';
import { useQueryState } from 'nuqs';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { Spinner } from '@/components/ui/spinner';
import { useIsMobile } from '@/hooks/use-mobile';
import { IconSparkles } from '@tabler/icons-react';
import { fetcher } from '@/lib/utils';
import { RunEditData } from '@/lib/types';
import { RunForm } from './index';
import { useRideGeneration } from '@/context/RunGenerationContext';

export function EditRunDrawer() {
  const isMobile = useIsMobile();
  const { lastUpdate } = useRideGeneration();
  const [action, setAction] = useQueryState('action');
  const [driverId, setDriverId] = useQueryState('driverId');

  const isOpen = action === 'generate';

  const { data, isLoading, mutate } = useSWR<RunEditData>(
    isOpen ? '/api/dashboard/new-ride' : null,
    fetcher,
  );

  // Refetch data when drawer is opened and ride generation is completed
  useEffect(() => {
    if (isOpen) {
      mutate();
    }
  }, [isOpen, mutate, lastUpdate]);

  const handleOpenChange = (open: boolean) => {
    setAction(open ? 'generate' : null);
    setDriverId(open ? null : null);
  };

  const handleClose = () => handleOpenChange(false);

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'} open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerContent className="h-[85vh] sm:h-full sm:w-[400px] ml-auto">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2 text-xl">
            <IconSparkles className="size-6 text-yellow-500 fill-yellow-500" />
            AI Route Planner
          </DrawerTitle>
          <DrawerDescription>Optimize routes for today's deliveries</DrawerDescription>
        </DrawerHeader>

        {isLoading || !data ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Spinner />
              <p>Loading data...</p>
            </div>
          </div>
        ) : (
          <RunForm
            drivers={data.drivers}
            deliveries={data.deliveries}
            onClose={handleClose}
            isLoading={isLoading}
            unassignedDeliveriesCount={data.unassignedDeliveriesCount}
            selectedDriverId={driverId || undefined}
          />
        )}
      </DrawerContent>
    </Drawer>
  );
}
