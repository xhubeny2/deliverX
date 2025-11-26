'use client';

import { Driver } from '@/prisma/generated/client';
import { IconSteeringWheel } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface DriverCardProps {
  driver: Driver;
  isSelected: boolean;
  className?: string;
}

export default function DriverDetail({ driver, isSelected, className }: DriverCardProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all select-none w-full',
        isSelected
          ? 'border-yellow-500 bg-yellow-50/10 ring-1 ring-yellow-500'
          : 'hover:bg-muted/50 border-transparent bg-muted/20',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'size-10 rounded-full border flex items-center justify-center shadow-sm transition-colors',
            isSelected ? 'bg-yellow-100' : 'bg-background',
          )}
        >
          <IconSteeringWheel
            className={cn('size-5', isSelected ? 'text-yellow-700' : 'text-muted-foreground')}
          />
        </div>
        <div>
          <p
            className={cn(
              'font-semibold text-sm',
              isSelected ? 'text-yellow-900' : 'text-foreground',
            )}
          >
            {driver.name}
          </p>
          <p className="text-xs text-muted-foreground">{driver.car || 'No vehicle assigned'}</p>
        </div>
      </div>

      {/* Custom Visual Radio Indicator */}
      <div
        className={cn(
          'size-5 rounded-full border flex items-center justify-center transition-colors',
          isSelected
            ? 'border-yellow-500 bg-yellow-500'
            : 'border-muted-foreground/30 bg-transparent',
        )}
      >
        {isSelected && <div className="size-2 bg-white rounded-full" />}
      </div>
    </div>
  );
}
