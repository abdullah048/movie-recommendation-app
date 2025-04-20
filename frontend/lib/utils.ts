import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertPriceToMillion(budget: number) {
  return `$${(budget / 1_000_000).toFixed(1)} million`;
}
