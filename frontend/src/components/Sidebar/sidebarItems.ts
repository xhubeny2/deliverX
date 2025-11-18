import {
  IconCamera,
  IconDashboard,
  IconFileAi,
  IconFileDescription,
  IconPackage,
  IconSettings,
} from '@tabler/icons-react';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard,
    },
    {
      title: 'Deliveries',
      url: '/dashboard/deliveries',
      icon: IconPackage,
    },
    // {
    //   title: 'Analytics',
    //   url: '#',
    //   icon: IconChartBar,
    // },
    // {
    //   title: 'Projects',
    //   url: '#',
    //   icon: IconFolder,
    // },
    // {
    //   title: 'Team',
    //   url: '#',
    //   icon: IconUsers,
    // },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: IconCamera,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: IconFileDescription,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: IconFileAi,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: IconSettings,
    },
    // {
    //   title: 'Get Help',
    //   url: '#',
    //   icon: IconHelp,
    // },
    // {
    //   title: 'Search',
    //   url: '#',
    //   icon: IconSearch,
    // },
  ],
  // documents: [
  //   {
  //     name: 'Data Library',
  //     url: '#',
  //     icon: IconDatabase,
  //   },
  //   {
  //     name: 'Reports',
  //     url: '#',
  //     icon: IconReport,
  //   },
  //   {
  //     name: 'Word Assistant',
  //     url: '#',
  //     icon: IconFileWord,
  //   },
  // ],
};

export default data;
