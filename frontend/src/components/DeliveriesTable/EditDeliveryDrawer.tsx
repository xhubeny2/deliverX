'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { IconLoader } from '@tabler/icons-react';

// Shadcn imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// Server Action import
import { createDelivery } from '@/lib/actions';
// Zod
import { DeliveryFormSchema, DeliveryFormValues } from '@/lib/validations';
import { Delivery } from '../../../generated/prisma/client';
import { useIsMobile } from '@/hooks/use-mobile';

type DeliverySheetProps = {
  children: React.ReactNode;
  item?: Delivery;
};

function EditDeliveryDrawer({ children, item }: DeliverySheetProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // React Hook Form
  const form = useForm<DeliveryFormValues>({
    resolver: zodResolver(DeliveryFormSchema),
    defaultValues: {
      recipientName: item?.recipientName || '',
      address: item?.address || '',
      orderNumber: item?.orderNumber || '',
      status: item?.status || 'PENDING',
    },
  });

  // Form submit
  function onSubmit(data: DeliveryFormValues) {
    startTransition(async () => {
      const result = await createDelivery(data);

      if (result.success) {
        toast.success('Delivery successfully saved');
        setOpen(false);
        form.reset();
      } else {
        toast.error(`Something went wrong - ${result.message}`);
      }
    });
  }

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-[85vh] sm:h-full sm:w-[400px] ml-auto">
        <DrawerHeader>
          <DrawerTitle>
            {item ? `Delivery detail ${item!.orderNumber}` : `Create new delivery`}
          </DrawerTitle>
          <DrawerDescription>
            {item ? `ID: ${item!.id}` : `Add details for the new delivery below`}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 p-4 overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              {/* Delivery number */}
              <FormField
                control={form.control}
                name="orderNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery number</FormLabel>
                    <FormControl>
                      <Input placeholder="ORD-2025" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Recipient */}
              <FormField
                control={form.control}
                name="recipientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery address</FormLabel>
                    <FormControl>
                      <Input placeholder="Street 123, City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stav</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Vyberte stav" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_TRANSIT">In transit</SelectItem>
                        <SelectItem value="DELIVERED">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DrawerFooter className="mt-8">
                {/* Save button */}
                <Button type="submit" disabled={isPending}>
                  {isPending && <IconLoader className="mr-2 size-4 animate-spin" />}
                  {isPending ? 'Saving...' : 'Create Delivery'}
                </Button>

                {/* Close button */}
                <DrawerClose asChild>
                  <Button variant="outline" type="button">
                    Close
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
          {item ? (
            <div className="mt-4 border-t pt-4">
              <h3 className="text-sm font-medium mb-2">History</h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex justify-between">
                  <span>Created</span>
                  <span>{`${new Date(item.createdAt).toLocaleTimeString()} ${new Date(item.createdAt).toLocaleDateString()}`}</span>
                </div>
                {item.updatedAt && (
                  <div className="flex justify-between">
                    <span>Updated</span>
                    <span>{`${new Date(item.updatedAt).toLocaleTimeString()} ${new Date(item.updatedAt).toLocaleDateString()}`}</span>
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default EditDeliveryDrawer;
