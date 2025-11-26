import { IconSparkles } from '@tabler/icons-react';

export function AILoading({ unassignedDeliveriesCount }: { unassignedDeliveriesCount: number }) {
  return (
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
        <p className="text-muted-foreground text-sm">
          It may take a minute. You can continue working.
        </p>
      </div>
    </div>
  );
}
