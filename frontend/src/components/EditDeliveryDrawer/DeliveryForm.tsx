'use client';

import React, { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { IconCalendar, IconLoader } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer';
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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import { createDelivery, updateDelivery } from '@/lib/actions';
import { DeliveryFormSchema, DeliveryFormValues } from '@/lib/validations';
import { Delivery } from '@/../generated/prisma/client';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface DeliveryFormProps {
  initialData?: Delivery;
  onClose: () => void;
}

export function DeliveryForm({ initialData, onClose }: DeliveryFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<DeliveryFormValues>({
    resolver: zodResolver(DeliveryFormSchema),
    defaultValues: {
      recipientName: initialData?.recipientName || '',
      address: initialData?.address || '',
      orderNumber: initialData?.orderNumber || '',
      status: initialData?.status || 'PENDING',
      deliveryDate: initialData?.deliveryDate || undefined,
    },
  });

  // re-set new data
  useEffect(() => {
    if (initialData) {
      form.reset({
        recipientName: initialData.recipientName,
        address: initialData.address,
        status: initialData.status,
        orderNumber: initialData.orderNumber,
        deliveryDate: initialData.deliveryDate || undefined,
      });
    }
  }, [initialData, form]);

  function onSubmit(data: DeliveryFormValues) {
    startTransition(async () => {
      const result = await (initialData
        ? updateDelivery(initialData.id, data)
        : createDelivery(data));

      if (result.success) {
        toast.success('Delivery successfully saved');
        form.reset();
        onClose();
      } else {
        toast.error(`Something went wrong - ${result.message}`);
      }
    });
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col gap-4 p-4 overflow-y-auto flex-1">
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

            {/* Delivery date */}
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Delivery Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal', // w-full or w-[240px]
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP') // Format: "Nov 23, 2025"
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </PopoverContent>
                  </Popover>
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
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="IN_TRANSIT">In transit</SelectItem>
                      <SelectItem value="DELIVERED">Delivered</SelectItem>
                      <SelectItem value="FAILED">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DrawerFooter className="mt-8 px-0">
              <Button type="submit" disabled={isPending}>
                {isPending && <IconLoader className="mr-2 size-4 animate-spin" />}
                {isPending ? 'Saving...' : `${initialData ? 'Update' : 'Create'} Delivery`}
              </Button>

              <DrawerClose asChild>
                <Button variant="outline" type="button" onClick={onClose}>
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </Form>

        {/* History Section */}
        {initialData && (
          <div className="mt-4 border-t pt-4">
            <h3 className="text-sm font-medium mb-2">History</h3>
            <div className="text-sm text-muted-foreground space-y-2">
              <div className="flex justify-between">
                <span>Created</span>
                <span>{`${new Date(initialData.createdAt).toLocaleTimeString()} ${new Date(
                  initialData.createdAt,
                ).toLocaleDateString()}`}</span>
              </div>
              {initialData.updatedAt && (
                <div className="flex justify-between">
                  <span>Updated</span>
                  <span>{`${new Date(initialData.updatedAt).toLocaleTimeString()} ${new Date(
                    initialData.updatedAt,
                  ).toLocaleDateString()}`}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
