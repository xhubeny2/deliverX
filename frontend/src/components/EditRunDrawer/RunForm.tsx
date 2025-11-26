'use client';

import { useState, useTransition } from 'react';
import { IconSparkles, IconCalendar, IconMapPinX } from '@tabler/icons-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Driver, Delivery } from '@/prisma/generated/client';

import { Button } from '@/components/ui/button';
import { SheetFooter } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RunFormSchema, RunFormValues } from '@/lib/validations/run-schema';
import { DriverSelector } from '@/components/EditRunDrawer/DriverSelector';
import { generateOptimizedRun } from '@/lib/actions/generate-run';

type Step = 'config' | 'generating' | 'review';

interface GenerateRidesSheetProps {
  drivers: Driver[];
  deliveries: Delivery[];
  onClose: () => void;
  isLoading: boolean;
  unassignedDeliveriesCount: number;
  selectedDriverId?: string;
}

export default function RunForm({
  drivers,
  deliveries,
  isLoading,
  unassignedDeliveriesCount,
  onClose,
  selectedDriverId,
}: GenerateRidesSheetProps) {
  const [step, setStep] = useState<Step>('config');
  const [isPending, startTransition] = useTransition();

  const form = useForm<RunFormValues>({
    resolver: zodResolver(RunFormSchema),
    defaultValues: {
      driverId: selectedDriverId || '',
    },
  });

  const selectedDriver = form.watch('driverId');

  function onSubmit(data: RunFormValues) {
    startTransition(async () => {
      const deliveriesToAI = deliveries.map((delivery) => ({
        id: delivery.id,
        address: delivery.address,
        deliveryDate: delivery.deliveryDate,
      }));
      generateOptimizedRun(data.driverId, deliveriesToAI)
        .then(() => {
          toast.success('Ride generated successfully!');
          onClose();
        })
        .catch(() => {
          toast.error('Failed to generate ride. Please try again.');
          setStep('config');
        });
    });
  }

  return (
    <div className="flex flex-col h-full">
      {/* generating animation */}
      {isPending ? (
        <div className="flex flex-col items-center justify-center h-full space-y-6 animate-in fade-in zoom-in-95">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 animate-pulse rounded-full" />
            <div className="relative bg-yellow-50 p-6 rounded-full border-2 border-yellow-100">
              <IconSparkles className="size-12 text-yellow-500 animate-pulse" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold">AI is analyzing traffic patterns...</h3>
            <p className="text-muted-foreground text-sm">
              Assigning {unassignedDeliveriesCount} packages to optimal route.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-4 overflow-y-auto flex-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {!isLoading && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 border rounded-md bg-yellow-50 border-yellow-500">
                    <IconMapPinX className="size-5 text-yellow-500" />
                    <span className="font-medium">
                      {unassignedDeliveriesCount} unassigned deliveries
                    </span>
                  </div>
                </div>
              )}
              <div className="flex-1 py-6 overflow-hidden flex flex-col">
                {/* Drivers and date Section */}
                {step === 'config' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 flex-1 flex flex-col">
                    <div className="space-y-3">
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        1. Plan for Date
                      </h3>
                      <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/20">
                        <IconCalendar className="size-5 text-muted-foreground" />
                        <span className="font-medium">{format(new Date(), 'PPP')} (Today)</span>
                      </div>
                    </div>

                    <div className="space-y-3 flex-1 flex flex-col min-h-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                          2. Select Driver
                        </h3>
                        {!isLoading && <Badge variant="outline">{drivers.length} available</Badge>}
                      </div>

                      {/* SHADCN FORM FIELD FOR DRIVER SELECTOR */}
                      <FormField
                        control={form.control}
                        name="driverId"
                        render={({ field }) => (
                          <FormItem className="flex-1 flex flex-col min-h-0">
                            <FormControl>
                              <DriverSelector
                                drivers={drivers}
                                isLoading={isLoading}
                                value={field.value}
                                onValueChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>

              <SheetFooter className="mt-auto pt-4 border-t">
                {!isPending && (
                  <Button
                    type="submit"
                    className="w-full bg-yellow-400 text-black hover:bg-yellow-500 shadow-sm"
                    size="lg"
                    disabled={isLoading || !selectedDriver}
                  >
                    <IconSparkles className="mr-2 size-5" />
                    {isLoading ? 'Loading Data...' : 'Generate Ride'}
                  </Button>
                )}

                <div className="flex gap-3 w-full">
                  <Button variant="outline" size="lg" className="flex-1" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </SheetFooter>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
