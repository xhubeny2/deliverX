import React from 'react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';
import { IconCirclePlusFilled, IconMail } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

const QuickCreateButton = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center gap-2">
        <SidebarMenuButton
          tooltip="Quick Create"
          className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
          asChild
        >
          <Link href="/dashboard/deliveries/create">
            <IconCirclePlusFilled />
            <span>Quick Create</span>
          </Link>
        </SidebarMenuButton>
        <Button
          size="icon"
          className="size-8 group-data-[collapsible=icon]:opacity-0"
          variant="outline"
        >
          <IconMail />
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default QuickCreateButton;
