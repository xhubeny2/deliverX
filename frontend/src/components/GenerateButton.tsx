'use client';

import { Button } from '@/components/ui/button';
import { IconSparkles } from '@tabler/icons-react';
import React from 'react';
import { useQueryState } from 'nuqs';

export function GenerateButton() {
  const [action, setAction] = useQueryState('action');

  const handleClick = () => {
    setAction(action === 'generate' ? null : 'generate');
  };

  return (
    <Button size="lg" onClick={handleClick}>
      <IconSparkles className="mr-2 size-5" />
      AI Generate Rides
    </Button>
  );
}
