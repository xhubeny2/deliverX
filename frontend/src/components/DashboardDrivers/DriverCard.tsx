'use client';

import React from 'react';
import { IconCircleCheck, IconMapPin } from '@tabler/icons-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Run, Driver } from '../../../generated/prisma/client';
import Link from 'next/link';
import { getAvatar } from '@/utils/getAvatar';
import { useQueryStates, parseAsString } from 'nuqs';

type RunWithDeliveries = Run & {
  deliveries: {
    status: string;
    address: string;
  }[];
};

export type DriverCardProps = Driver & {
  runs: RunWithDeliveries[];
};

export default function DriverCard({ name, car, runs, id }: DriverCardProps) {
  const [, setParams] = useQueryStates({
    action: parseAsString,
    driverId: parseAsString,
  });

  const currentRun = runs && runs.length > 0 ? runs[0] : null;
  const isWaiting = !currentRun;
  const isFinished = currentRun?.status === 'FINISHED';

  const total = currentRun?.deliveries.length;
  const finishedCount = currentRun?.deliveries.filter((d) => d.status !== 'IN_TRANSIT').length;
  const progress =
    typeof total === 'number' && typeof finishedCount === 'number' && total > 0
      ? Math.round((finishedCount / total) * 100)
      : 0;
  const packagesLeft =
    typeof total === 'number' && typeof finishedCount === 'number' ? total - finishedCount : 0;
  const currentStop = currentRun?.deliveries.find((d) => d.status === 'IN_TRANSIT')?.address;

  const handleOpenRunDrawer = () => {
    setParams({
      action: 'generate',
      driverId: id || null,
    });
  };

  return (
    <Card className="relative overflow-hidden">
      <div
        className={`absolute top-0 left-0 w-full h-1 ${isFinished ? 'bg-green-500' : isWaiting ? 'bg-neutral-400' : 'bg-blue-500'}`}
      />

      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{getAvatar(name)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base font-medium">{name}</CardTitle>
            <CardDescription className="text-xs">{car}</CardDescription>
          </div>
        </div>
        {isWaiting && <Badge variant="outline">Waiting</Badge>}
        {isFinished && <Badge className="bg-green-600 text-white">Finished</Badge>}
        {!isWaiting && !isFinished && (
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            On Route
          </Badge>
        )}
      </CardHeader>

      <CardContent className="mt-auto space-y-4">
        {/* Progress Bar */}
        {!isFinished && !isWaiting && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Delivery Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className={`h-2`} />
          </div>
        )}

        {/* Actual stop */}
        {!isFinished && !isWaiting && (
          <div className="gap-2 flex flex-col">
            <div className="bg-muted/50 p-3 rounded-md flex items-start gap-3">
              <IconMapPin className="size-5 mt-0.5 text-blue-500" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Delivering</p>
                <p className="text-sm font-medium">{currentStop}</p>
                <p className="text-xs text-muted-foreground mt-1">Packages left: {packagesLeft}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full text-xs h-8" asChild>
              <Link
                href={currentRun ? `/driver/${id}/run/${currentRun.id}` : '#'}
                className="w-full"
              >
                View details
              </Link>
            </Button>
          </div>
        )}

        {isWaiting && (
          <div className="bg-muted/50 p-3 rounded-md flex items-start gap-2 flex-col">
            <p className="text-xs font-semibold text-muted-foreground uppercase text-center w-full">
              No current run
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs h-18"
              onClick={handleOpenRunDrawer}
            >
              Add New Run
            </Button>
          </div>
        )}

        {isFinished && (
          <div className="bg-green-50 p-3 rounded-md flex items-center justify-center gap-2 text-green-700 h-30">
            <IconCircleCheck className="size-5" />
            <span className="text-sm font-medium">Delivered on time</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
