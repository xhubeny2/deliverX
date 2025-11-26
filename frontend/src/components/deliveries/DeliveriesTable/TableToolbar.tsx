'use client';

import { Table } from '@tanstack/react-table';
import { useQueryState } from 'nuqs';
import { IconLayoutColumns, IconPlus } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DeliveriesTableToolbarProps<TData> {
  table: Table<TData>;
  dataLength: number;
}

export function TableToolbar<TData>({ table, dataLength }: DeliveriesTableToolbarProps<TData>) {
  const [, setIsCreate] = useQueryState('create');

  const handleCreateClick = () => {
    setIsCreate('new');
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Deliveries</h2>
        <Badge variant="secondary">{dataLength}</Badge>
      </div>

      <div className="flex items-center gap-2">
        {/* Columns Visibility Dropdown */}
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

        {/* Create Button */}
        <Button onClick={handleCreateClick}>
          <IconPlus className="size-4" />
          <div className="hidden sm:inline-flex sm:ml-2">New Delivery</div>
        </Button>
      </div>
    </div>
  );
}
