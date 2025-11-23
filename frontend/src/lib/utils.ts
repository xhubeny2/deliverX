import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import prisma from '@/lib/prisma';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function withTryCatch<T>(
  fn: () => Promise<T>,
  errorMessage: string,
  defaultValue: T,
): Promise<T> | T {
  try {
    return fn();
  } catch (error) {
    console.error(errorMessage, error);
    return defaultValue;
  }
}
