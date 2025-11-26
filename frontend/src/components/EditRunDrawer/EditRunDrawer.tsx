'use client';

import React from 'react';
import useSWR from 'swr';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import RunForm from './RunForm';
import { useIsMobile } from '@/hooks/use-mobile';
import { fetcher } from '@/lib/utils';
import { Spinner } from '@/components/ui/spinner';
import { SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { IconSparkles } from '@tabler/icons-react';
import { RunEditData } from '@/lib/types';
import { useQueryState } from 'nuqs';

export default function EditRunDrawer() {
  const isMobile = useIsMobile();
  const [action, setAction] = useQueryState('action');
  const [driverId, setDriverId] = useQueryState('driverId');

  const isOpen = action === 'generate';

  const { data, isLoading } = useSWR<RunEditData>(
    isOpen ? '/api/dashboard/new-ride' : null,
    fetcher,
  );

  const handleOpenChange = (open: boolean) => {
    setAction(open ? 'generate' : null);
    setDriverId(open ? null : null);
  };

  const handleClose = () => handleOpenChange(false);

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'} open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerContent className="h-[85vh] sm:h-full sm:w-[400px] ml-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl">
            <IconSparkles className="size-6 text-yellow-500 fill-yellow-500" />
            AI Route Planner
          </SheetTitle>
          <SheetDescription>Optimize routes for today's deliveries</SheetDescription>
        </SheetHeader>

        {isLoading || !data ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Spinner />
              <p>Loading delivery data...</p>
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
