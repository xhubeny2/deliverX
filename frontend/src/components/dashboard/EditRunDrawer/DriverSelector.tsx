'use client';

import { Driver } from '@/prisma/generated/client';
import { IconAlertCircle } from '@tabler/icons-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { DriverDetail, DriverDetailSkeleton } from './index';

interface DriverSelectorProps {
  drivers: Driver[];
  isLoading: boolean;
  value?: string;
  onValueChange: (value: string) => void;
}

export function DriverSelector({ drivers, isLoading, value, onValueChange }: DriverSelectorProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <DriverDetailSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (drivers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-md text-muted-foreground">
        <IconAlertCircle className="size-8 mb-2 opacity-50" />
        <p>No drivers found in the database.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <RadioGroup value={value} onValueChange={onValueChange} className="grid gap-2">
        {drivers.map((driver) => (
          <FormItem key={driver.id} className="space-y-0">
            <FormControl>
              <RadioGroupItem value={driver.id} id={driver.id} className="sr-only" />
            </FormControl>

            <FormLabel htmlFor={driver.id} className="cursor-pointer font-normal">
              <DriverDetail driver={driver} isSelected={value === driver.id} />
            </FormLabel>
          </FormItem>
        ))}
      </RadioGroup>
    </ScrollArea>
  );
}
