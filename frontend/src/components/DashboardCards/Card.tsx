import React from 'react';
import { CardContent, CardHeader, CardTitle, Card as CardUI } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface CardProps {
  title: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
  description?: string;
  icon: React.ElementType;
  type?: 'warning' | 'success' | 'default';
}

export default function Card({
  title,
  value,
  subValue,
  description,
  icon: Icon,
  type = 'default',
}: CardProps) {
  const isWarning = type === 'warning';
  const isSuccess = type === 'success';
  const isDefault = type === 'default';

  return (
    <CardUI
      className={cn(
        'justify-between',
        isWarning && 'border-orange-200 bg-orange-50/50',
        isSuccess && 'border-green-200 bg-green-50/50',
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle
          className={cn(
            'text-sm font-medium',
            isWarning && 'text-orange-700',
            isSuccess && 'text-green-900',
          )}
        >
          {title}
        </CardTitle>
        <Icon
          className={cn(
            '!size-6 h-4 w-4 text-muted-foreground',
            isWarning && 'text-orange-700',
            isSuccess && 'text-green-900',
          )}
        />
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'text-2xl font-bold',
            isWarning && 'text-orange-700',
            isSuccess && 'text-green-900',
          )}
        >
          {value}
          <span className="text-muted-foreground text-sm font-normal">{subValue}</span>
        </div>
        <p
          className={cn(
            'text-xs',
            isWarning && 'text-orange-600/80',
            isSuccess && 'text-green-800/80',
            isDefault && 'text-muted-foreground',
          )}
        >
          {description}
        </p>
      </CardContent>
    </CardUI>
  );
}
