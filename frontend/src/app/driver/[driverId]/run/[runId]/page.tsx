import { notFound } from 'next/navigation';
import DriverRunView from '@/components/driver/DriverRunView';
import { getRunByDriverIdAndRunId } from '@/lib/data';
import { format } from 'date-fns';

interface PageProps {
  params: Promise<{
    driverId: string;
    runId: string;
  }>;
}

export default async function DriverRunPage({ params }: PageProps) {
  const { driverId, runId } = await params;

  const run = await getRunByDriverIdAndRunId(driverId, runId);

  if (!run) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-neutral-900 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex justify-between items-baseline pb-1">
          <h1 className="text-lg font-bold">Run #{run.id.slice(-4)}</h1>
          <h3>{format(run.date, 'PPP')}</h3>
        </div>
        <p className="text-xs text-slate-400">Driver: {run.driver.name}</p>
      </div>

      <div className="p-4">
        <DriverRunView run={run} />
      </div>
    </main>
  );
}
