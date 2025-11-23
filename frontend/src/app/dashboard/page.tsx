import { IconSparkles } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { DashboardHeader } from '@/components/DashboardHeader/DashboardHeader';
import Cards from '@/components/DashboardCards/Cards';
import Drivers from '@/components/DashboardDrivers/Drivers';

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 pt-2">
      <DashboardHeader
        heading="Dashboard"
        text={`Today’s Operations Overview - ${new Date().toLocaleDateString()}`}
      >
        <Button size="lg">
          <IconSparkles className="mr-2 size-5" />
          AI Generate Rides
        </Button>
      </DashboardHeader>

      {/* Overview (KPI) */}
      <Cards />

      {/* LIVE FLEET STATUS */}
      <Drivers />
    </div>
  );
}
