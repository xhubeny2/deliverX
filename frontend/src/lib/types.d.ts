import type { Icon } from '@tabler/icons-react';

export type MainNavigationProps = {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
};

export interface RunEditData {
  drivers: Driver[];
  deliveries: Delivery[];
}
