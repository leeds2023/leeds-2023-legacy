import { useStoryblokApi } from '@storyblok/astro';
import type {
	DataSourceResponse,
	StoryWithNavAndFooter,
	StoryWithLegacyPage,
	LegacyPageStories,
	Link,
	StoryWithProjectPage,
} from './types';

const storyblokApi = useStoryblokApi();

export async function fetchStory<T = StoryWithLegacyPage>(storyId?: string): Promise<T> {
	const {
		data: { story },
	} = await storyblokApi.get(`cdn/stories/legacy/${storyId ? storyId : ''}`, {
		version: import.meta.env.STORYBLOK_ENV
			? import.meta.env.STORYBLOK_ENV
			: import.meta.env.DEV
			? 'draft'
			: 'published',
		token: import.meta.env.STORYBLOK_TOKEN,
		resolve_links: '1',
	});
	return story;
}

export async function fetchStories<T = StoryWithLegacyPage>(
	storyIds: string[]
): Promise<LegacyPageStories<T>> {
	const { data } = await storyblokApi.get(`cdn/stories`, {
		version: import.meta.env.STORYBLOK_ENV
			? import.meta.env.STORYBLOK_ENV
			: import.meta.env.DEV
			? 'draft'
			: 'published',
		by_uuids: storyIds.join(','),
		resolve_links: '1',
	});

	return data;
}

export async function fetchAllProjects<T = StoryWithProjectPage>(): Promise<T[]> {
	const {
		data: { stories },
	} = await storyblokApi.get(`cdn/stories`, {
		version: import.meta.env.STORYBLOK_ENV
			? import.meta.env.STORYBLOK_ENV
			: import.meta.env.DEV
			? 'draft'
			: 'published',
		starts_with: 'legacy/projects/',
		resolve_links: '1',
	});

	return stories;
}

export async function fetchNavAndFooter(): Promise<StoryWithNavAndFooter> {
	const {
		data: { story },
	} = await storyblokApi.get(`cdn/stories/legacy/globals/footer-and-navigation`, {
		version: import.meta.env.STORYBLOK_ENV
			? import.meta.env.STORYBLOK_ENV
			: import.meta.env.DEV
			? 'draft'
			: 'published',
		resolve_links: '1',
	});

	return story;
}

export async function fetchDataSources(dataSourceId: string): Promise<DataSourceResponse> {
	const { data } = await storyblokApi.get(`cdn/datasource_entries`, {
		datasource: dataSourceId,
		version: import.meta.env.STORYBLOK_ENV
			? import.meta.env.STORYBLOK_ENV
			: import.meta.env.DEV
			? 'draft'
			: 'published',
	});

	return data;
}

export async function fetchCategoryTags(): Promise<DataSourceResponse> {
	const data = await fetchDataSources('category-tags');
	return data;
}

function isValidUrl(link: Link) {
	return !!(
		link.url !== null ||
		link.email !== null ||
		link.cached_url !== null ||
		isValidFullSlug(link)
	);
}

function isValidFullSlug(link: Link) {
	return typeof link === 'string' && link[0] !== '/';
}

export function extractDimensions(url: string): { width: number; height: number } | null {
	// takes a cdn url and returns the width and height
	const regex = /\/(\d+)x(\d+)\//;
	const match = url.match(regex);

	if (match && match.length === 3) {
		const width = parseInt(match[1], 10);
		const height = parseInt(match[2], 10);

		return { width, height };
	}

	return null;
}

export function parseStoryblokLink(link: Link): string {
	const NULL_LINK = '#';

	if (!isValidUrl(link)) {
		return NULL_LINK;
	}

	if (link.story) {
		if (link.anchor) {
			return `/${link.story?.url ?? ''}#${link.anchor ?? ''}`.replaceAll('//', '/');
		}
		if (link.story.slug === 'projects-root') {
			return '/projects/';
		}
		if (link.story.slug && link.story.slug !== 'legacy') {
			return `/${link.story.slug ?? ''}`.replaceAll('//', '/');
		}
		if (link.story.slug === 'legacy') {
			return '/';
		}

		return `/${link.story?.url || ''}`.replaceAll('//', '/');
	}

	if (link.url) {
		if (link.anchor !== null) {
			return `${link.url}#${link.anchor ?? ''}`;
		}
		return link.url;
	}

	if (link.email) {
		return `mailto:${link.email ?? ''}`;
	}

	if (link.cached_url) {
		if (link.anchor) {
			return `/${link.cached_url ?? ''}#${link.anchor ?? ''}`;
		} else {
			return `/${link.cached_url ?? ''}`;
		}
	}

	return '/';
}
