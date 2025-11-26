import { Skeleton } from '@/components/ui/skeleton';

export function LoginFormSkeleton() {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-10 w-full mt-2" />
    </div>
  );
}
