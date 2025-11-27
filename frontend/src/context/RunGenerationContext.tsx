'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { generateOptimizedRun } from '@/lib/actions/generate-run';
import { Delivery } from '@/prisma/generated/client';

interface RunGenerationContextType {
  isGenerating: boolean;
  startGeneration: (
    driverId: string,
    deliveries: Pick<Delivery, 'id' | 'address' | 'deliveryDate'>[],
  ) => Promise<void>;
  lastUpdate: number;
}

const RunGenerationContext = createContext<RunGenerationContextType | undefined>(undefined);

export function RunGenerationProvider({ children }: { children: React.ReactNode }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const router = useRouter();

  const startGeneration = useCallback(
    async (driverId: string, deliveries: Pick<Delivery, 'id' | 'address' | 'deliveryDate'>[]) => {
      // Prevent multiple triggers
      if (isGenerating) return;

      setIsGenerating(true);

      // Create the promise that will handle data fetching and validation
      const generationPromise = generateOptimizedRun(driverId, deliveries).then((result) => {
        if (!result.success) {
          // Throwing an error here triggers the 'error' state of toast.promise
          throw new Error(result.message || 'An unexpected error occurred.');
        }
        return result;
      });

      // Ensure state is reset regardless of outcome
      generationPromise.finally(() => {
        setIsGenerating(false);
      });

      // Use toast.promise to handle UI states automatically
      toast.promise(generationPromise, {
        loading: 'AI generation started. Routes are being optimized in the background...',
        success: (result) => {
          setLastUpdate(Date.now());
          // Refresh data to show new runs
          router.refresh();
          return `Optimization Complete! Successfully assigned ${result.count} parcels.`;
        },
        error: (error) => {
          return error.message || 'System Error: Could not connect to AI service.';
        },
      });
    },
    [isGenerating, router],
  );

  return (
    <RunGenerationContext.Provider value={{ isGenerating, startGeneration, lastUpdate }}>
      {children}
    </RunGenerationContext.Provider>
  );
}

export function useRideGeneration() {
  const context = useContext(RunGenerationContext);
  if (context === undefined) {
    throw new Error('useRideGeneration must be used within a RideGenerationProvider');
  }
  return context;
}
