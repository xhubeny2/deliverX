import { cn } from '@/lib/utils';
import React from 'react';

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

export function DashboardHeader({ heading, text, children, className }: DashboardHeaderProps) {
  return (
    <div
      className={cn(
        'flex-col md:flex-row gap-4 md:gap-0 flex items-center justify-between',
        className,
      )}
    >
      <div className="grid gap-1 w-full md:w-auto">
        <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">{children}</div>
    </div>
  );
}
