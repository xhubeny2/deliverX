import React from 'react';
import { CardContent, CardHeader, CardTitle, Card as CardUI } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface CardProps {
  title: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
  description?: string;
  icon: React.ElementType;
  warning?: boolean;
}

export default function Card({
  title,
  value,
  subValue,
  description,
  icon: Icon,
  warning,
}: CardProps) {
  return (
    <CardUI className={cn('justify-between', warning && 'border-orange-200 bg-orange-50/50')}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn('text-sm font-medium', warning && 'text-orange-700')}>
          {title}
        </CardTitle>
        <Icon
          className={cn('!size-6 h-4 w-4 text-muted-foreground', warning && 'text-orange-700')}
        />
      </CardHeader>
      <CardContent>
        <div className={cn('text-2xl font-bold', warning && 'text-orange-700')}>
          {value}
          <span className="text-muted-foreground text-sm font-normal">{subValue}</span>
        </div>
        <p className={cn('text-xs', warning ? 'text-orange-600/80' : 'text-muted-foreground')}>
          {description}
        </p>
      </CardContent>
    </CardUI>
  );
}
