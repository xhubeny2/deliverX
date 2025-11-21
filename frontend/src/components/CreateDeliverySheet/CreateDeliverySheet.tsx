'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { IconPlus, IconLoader } from '@tabler/icons-react';

// Shadcn imports
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
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

function CreateDeliverySheet() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // React Hook Form
  const form = useForm<DeliveryFormValues>({
    resolver: zodResolver(DeliveryFormSchema),
    defaultValues: {
      recipientName: '',
      address: '',
      orderNumber: '',
      status: 'PENDING',
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <IconPlus className="mr-2 size-4" />
          New Delivery
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create new delivery</SheetTitle>
          <SheetDescription>
            Enter the details for the new delivery. Click save to add it to the system..
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Delivery number */}
              <FormField
                control={form.control}
                name="orderNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery number</FormLabel>
                    <FormControl>
                      <Input placeholder="DLVR-2025-001" {...field} />
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

              <SheetFooter className="mt-8">
                {/* Close button */}
                <SheetClose asChild>
                  <Button variant="outline" type="button">
                    Close
                  </Button>
                </SheetClose>

                {/* Save button */}
                <Button type="submit" disabled={isPending}>
                  {isPending && <IconLoader className="mr-2 size-4 animate-spin" />}
                  {isPending ? 'Saving...' : 'Create Delivery'}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CreateDeliverySheet;
