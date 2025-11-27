import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function DriversSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card className="relative overflow-hidden" key={i}>
          <Skeleton className="absolute top-0 left-0 w-full h-1" />

          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />

              <div className="space-y-1.5">
                <Skeleton className="h-5 w-[140px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </div>

            <Skeleton className="h-5 w-[70px] rounded-full" />
          </CardHeader>

          <CardContent className="mt-auto space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-[90px]" />
                <Skeleton className="h-3 w-[30px]" />
              </div>
              <Skeleton className="h-2 w-full rounded-full" />
            </div>
            <div className="border border-dashed rounded-md p-3 flex items-start gap-3">
              <Skeleton className="h-5 w-5 shrink-0 rounded-sm" />

              <div className="w-full space-y-2">
                <Skeleton className="h-3 w-[60px]" />
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
