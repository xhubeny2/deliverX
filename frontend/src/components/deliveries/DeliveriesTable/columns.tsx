import { ColumnDef } from '@tanstack/react-table';
import { Delivery } from '@/prisma/generated/client';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import {
  IconAlertTriangle,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconPackage,
  IconTruck,
} from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import * as React from 'react';

export const columns: ColumnDef<Delivery>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'orderNumber',
    header: 'Order No.',
    cell: ({ row, table }) => {
      return (
        <Button
          variant="link"
          className="text-foreground w-fit px-0 text-left font-bold underline decoration-dotted"
          onClick={() => table.options.meta?.openEditDrawer(row.original.id)}
        >
          {row.original.orderNumber}
        </Button>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: 'recipientName',
    header: 'Recipient',
    cell: ({ row }) => <div className="font-medium">{row.original.recipientName}</div>,
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => (
      <div className="truncate max-w-[200px]" title={row.original.address}>
        {row.original.address}
      </div>
    ),
  },
  {
    accessorKey: 'deliveryDate',
    header: 'Delivery Date',
    cell: ({ row }) => (
      <div className="truncate max-w-[100px]" title={format(row.original.deliveryDate, 'PPP')}>
        {format(row.original.deliveryDate, 'PP')}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;

      let icon = <IconPackage className="size-3 mr-1" />;
      let colorClass = 'text-muted-foreground';

      if (status === 'DELIVERED') {
        icon = <IconCircleCheckFilled className="size-3 mr-1 fill-green-500 text-green-500" />;
        colorClass = 'text-green-600 border-green-200 bg-green-50';
      } else if (status === 'IN_TRANSIT') {
        icon = <IconTruck className="size-3 mr-1 text-blue-500" />;
        colorClass = 'text-blue-600 border-blue-200 bg-blue-50';
      } else if (status === 'FAILED') {
        icon = <IconAlertTriangle className="size-3 mr-1 text-red-500" />;
        colorClass = 'text-red-600 border-red-200 bg-red-50';
      }

      return (
        <Badge variant="outline" className={`${colorClass} px-2 py-0.5`}>
          {icon}
          {status}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row, table }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onSelect={() => table.options.meta?.openEditDrawer(row.original.id)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>Add driver</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
