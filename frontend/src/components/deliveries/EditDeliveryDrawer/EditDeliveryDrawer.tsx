'use client';

import React from 'react';
import useSWR from 'swr';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { DeliveryForm } from './DeliveryForm';
import { useIsMobile } from '@/hooks/use-mobile';
import { fetcher } from '@/lib/utils';
import { Delivery } from '@/prisma/generated/client';
import { Spinner } from '@/components/ui/spinner';
import { useQueryState } from 'nuqs';

export default function EditDeliveryDrawer() {
  const isMobile = useIsMobile();

  const [editId, setEditId] = useQueryState('editId');
  const [isCreate, setIsCreate] = useQueryState('create');

  const isOpen = !!editId || isCreate === 'new';

  const { data: delivery, isLoading } = useSWR<Delivery>(
    editId ? `/api/deliveries/${editId}` : null,
    fetcher,
  );

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsCreate(null);
      setEditId(null);
    }
  };

  const handleClose = () => handleOpenChange(false);

  const getTitle = () => {
    if (isCreate) return 'Create new delivery';
    if (isLoading) return 'Loading delivery...';
    return `Delivery detail ${delivery?.orderNumber || ''}`;
  };

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'} open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerContent className="h-[85vh] sm:h-full sm:w-[400px] ml-auto">
        <DrawerHeader>
          <DrawerTitle>{getTitle()}</DrawerTitle>
          <DrawerDescription>
            {editId ? `ID: ${editId}` : 'Add details for the new delivery below'}
          </DrawerDescription>
        </DrawerHeader>

        {isOpen && editId && isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Spinner />
              <p>Loading delivery data...</p>
            </div>
          </div>
        ) : (
          <DeliveryForm initialData={delivery} onClose={handleClose} />
        )}
      </DrawerContent>
    </Drawer>
  );
}
