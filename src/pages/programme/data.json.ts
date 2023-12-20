export const prerender = true;

import { fetchAllProjectsTransformed } from '@/lib/storyblok/helpers';
import type { ProjectStoryblok } from '@/lib/storyblok/types';
import type { APIRoute } from 'astro';

export type Project = {
	uuid: string;
	content: ProjectStoryblok;
	slug: string;
	tags: string[];
	category: string;
	title: string;
};

export type ProjectsApiResponse = Project[];

export const GET: APIRoute = async () => {
	const data = await fetchAllProjectsTransformed();

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			'content-type': 'application/json',
		},
	});
};
