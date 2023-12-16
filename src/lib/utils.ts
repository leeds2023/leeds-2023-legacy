import type { Link } from '@/lib/storyblok/helpers';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function handleLink(link: Link) {
	// to-do handle internal and external links from storyblok
	console.log(link);
	return true;
}
