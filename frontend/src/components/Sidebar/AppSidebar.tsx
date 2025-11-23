'use client';

import * as React from 'react';

import { MainNavigation } from '@/components/Sidebar/MainNavigation';
import { NavSecondary } from '@/components/Sidebar/nav-secondary';
import { NavUser } from '@/components/Sidebar/nav-user';
import { Sidebar, SidebarContent, SidebarFooter } from '@/components/ui/sidebar';
import Logo from '@/components/Sidebar/Logo';
import data from '@/components/Sidebar/sidebarItems';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <Logo />
      <SidebarContent>
        <MainNavigation items={data.navMain} />
        {/*<NavDocuments items={data.documents} />*/}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
