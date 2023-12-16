import { useStoryblokApi } from '@storyblok/astro';
import type {
	DataSourceResponse,
	StoryWithNavAndFooter,
	StoryWithLegacyPage,
	LegacyPageStories,
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
	});

	return data;
}

export async function fetchNavAndFooter(): Promise<StoryWithNavAndFooter> {
	const { data } = await storyblokApi.get(`cdn/stories/legacy/globals/footer-and-navigation`, {
		version: import.meta.env.STORYBLOK_ENV
			? import.meta.env.STORYBLOK_ENV
			: import.meta.env.DEV
			? 'draft'
			: 'published',
	});

	return data;
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
