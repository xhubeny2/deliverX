'use client';

import * as React from 'react';
import { Delivery } from '../../../generated/prisma/client';
import {
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLayoutColumns,
  IconTruck,
  IconPackage,
  IconAlertTriangle,
  IconPlus,
} from '@tabler/icons-react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import EditDeliveryDrawer from '@/components/DeliveriesTable/EditDeliveryDrawer';
import Pagination from '@/components/DeliveriesTable/Pagination';

const columns: ColumnDef<Delivery>[] = [
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
    cell: ({ row }) => {
      return (
        <EditDeliveryDrawer item={row.original}>
          <Button
            variant="link"
            className="text-foreground w-fit px-0 text-left font-bold underline decoration-dotted"
          >
            {row.original.orderNumber}
          </Button>
        </EditDeliveryDrawer>
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
    cell: () => (
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
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Add driver</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function DeliveriesTable({ data: initialData }: { data: Delivery[] }) {
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id, // Prisma ID je string, to je v pořádku
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <div className="w-full space-y-4">
      {/* Top bar with controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Deliveries</h2>
          <Badge variant="secondary">{data.length}</Badge>
        </div>

        <div className="flex items-center gap-2">
          {/* Controls */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <IconLayoutColumns className="size-4" />
                <div className="hidden sm:inline-flex sm:ml-2">Columns</div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((c) => c.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <EditDeliveryDrawer>
            <Button>
              <IconPlus className="size-4" />
              <div className="hidden sm:inline-flex sm:ml-2">New Delivery</div>
            </Button>
          </EditDeliveryDrawer>
        </div>
      </div>

      {/* Table itself */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No deliveries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        canPreviousPage={table.getCanPreviousPage()}
        canNextPage={table.getCanNextPage()}
        previousPage={table.previousPage}
        nextPage={table.nextPage}
        pageIndex={table.getState().pagination.pageIndex}
        pageCount={table.getPageCount()}
      />
    </div>
  );
}
