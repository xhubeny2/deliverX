import React from 'react';
import { IconCircleCheck, IconMapPin } from '@tabler/icons-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export enum DriverStatus {
  DELAYED = 'delayed',
  FINISHED = 'finished',
  ON_ROUTE = 'onRoute',
}

export interface DriverCardProps {
  name: string;
  // TODO: enum
  status: DriverStatus;
  progress: number;
  currentStop: string;
  packagesLeft: number;
  avatar: string;
  car: string;
}

export default function DriverCard({
  name,
  status,
  progress,
  currentStop,
  packagesLeft,
  avatar,
  car,
}: DriverCardProps) {
  const isDelayed = status === 'delayed';
  const isFinished = status === 'finished';

  return (
    <Card className={`relative overflow-hidden ${isDelayed ? 'border-red-200' : ''}`}>
      <div
        className={`absolute top-0 left-0 w-full h-1 ${isFinished ? 'bg-green-500' : isDelayed ? 'bg-red-500' : 'bg-blue-500'}`}
      />

      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{avatar}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-base font-medium">{name}</CardTitle>
            <CardDescription className="text-xs">{car}</CardDescription>
          </div>
        </div>
        {isDelayed && <Badge variant="destructive">Delayed</Badge>}
        {isFinished && <Badge className="bg-green-600 text-white">Delivered</Badge>}
        {!isDelayed && !isFinished && (
          <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
            On Route
          </Badge>
        )}
      </CardHeader>

      <CardContent className="mt-4 space-y-4">
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Delivery Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className={`h-2 ${isDelayed ? 'bg-red-100' : ''}`} />
        </div>

        {/* Actual stop */}
        {!isFinished && (
          <div className="bg-muted/50 p-3 rounded-md flex items-start gap-3">
            <IconMapPin
              className={`size-5 mt-0.5 ${isDelayed ? 'text-red-500' : 'text-blue-500'}`}
            />
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">Delivering</p>
              <p className="text-sm font-medium">{currentStop}</p>
              <p className="text-xs text-muted-foreground mt-1">Packages left: {packagesLeft}</p>
            </div>
          </div>
        )}

        {isFinished && (
          <div className="bg-green-50 p-3 rounded-md flex items-center justify-center gap-2 text-green-700">
            <IconCircleCheck className="size-5" />
            <span className="text-sm font-medium">Delivered on time</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t px-6 pt-3 mt-auto">
        <Button variant="ghost" size="sm" className="w-full text-xs h-8">
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}
