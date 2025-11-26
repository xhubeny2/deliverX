import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function CardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-6 w-6 rounded-md" />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-8 w-[60px]" />
              <Skeleton className="h-4 w-[20px] opacity-50" />
            </div>
            <Skeleton className="h-3 w-[80%] mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
