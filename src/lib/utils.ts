import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatWithCommas(number: number | string): string {
	let value = number;
	if (typeof number === 'string') {
		value = Number(number);
	}
	return value.toLocaleString();
}
