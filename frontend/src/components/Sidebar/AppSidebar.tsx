'use client';

import * as React from 'react';
import { MainNavigation } from '@/components/Sidebar/MainNavigation';
import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import Logo from '@/components/Sidebar/Logo';
import data from '@/components/Sidebar/sidebarItems';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <Logo />
      <SidebarContent>
        <MainNavigation items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
