import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
