import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function DeliveriesTableSkeleton() {
  return (
    <div className="w-full space-y-4">
      {/* 1. Toolbar Skeleton */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          {/* Title "Deliveries" */}
          <Skeleton className="h-8 w-32" />
          {/* Badge count */}
          <Skeleton className="h-6 w-8 rounded-full" />
        </div>
        <div className="flex items-center gap-2">
          {/* Columns button */}
          <Skeleton className="h-9 w-24" />
          {/* New Delivery button */}
          <Skeleton className="h-9 w-36" />
        </div>
      </div>

      {/* 2. Table Skeleton */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {/* Mimic columns count (7 columns) */}
              {/* Checkbox column */}
              <TableHead className="w-[50px]">
                <Skeleton className="h-4 w-4" />
              </TableHead>
              {/* Other headers */}
              {Array.from({ length: 6 }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="h-4 w-full max-w-[100px]" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Render 10 rows as placeholders */}
            {Array.from({ length: 10 }).map((_, i) => (
              <TableRow key={i}>
                {/* Checkbox */}
                <TableCell>
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                {/* Order No (Button style) */}
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                {/* Recipient */}
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                {/* Address */}
                <TableCell>
                  <Skeleton className="h-4 w-48" />
                </TableCell>
                {/* Date */}
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                {/* Status (Badge style) */}
                <TableCell>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </TableCell>
                {/* Actions (Icon button) */}
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 3. Pagination Skeleton */}
      <div className="flex items-center justify-end space-x-2 py-4 px-2">
        {/* Page info text */}
        <Skeleton className="h-4 w-48" />
        {/* Previous/Next buttons */}
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}
