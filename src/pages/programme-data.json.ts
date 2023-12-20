export const prerender = true;

import { fetchAllProjects } from '@/lib/storyblok/helpers';
import type { ProjectStoryblok, SectionBlock } from '@/lib/storyblok/types';
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
	const data = await fetchAllProjects();
	const mappedData = data.map((project) => {
		return {
			uuid: project.uuid,
			content:
				project.content.blocks[0].blocks.find(
					(blok: SectionBlock) => blok.component === 'project'
				) ?? {},
			slug: project.slug,
			tags:
				project.content.blocks[0].blocks.find((blok: SectionBlock) => blok.component === 'project')
					.tags ?? {},
			category:
				project.content.blocks[0].blocks.find((blok: SectionBlock) => blok.component === 'project')
					.associatedStage ?? '',
			title:
				project.content.blocks[0].blocks.find((blok: SectionBlock) => blok.component === 'project')
					.title ?? '',
		};
	});

	return new Response(JSON.stringify(mappedData), {
		status: 200,
		headers: {
			'content-type': 'application/json',
		},
	});
};
