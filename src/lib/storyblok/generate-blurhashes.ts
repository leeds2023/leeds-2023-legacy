import StoryblokClient from 'storyblok-js-client';
import type { Asset, AssetStoryblok, SectionBlock, StoryWithProjectPage } from './types';
import { encode } from 'blurhash';
import { blurhashToCssGradientString } from '@unpic/placeholder';
import sharp from 'sharp';

declare module 'storyblok-js-client' {
	interface ISbStoriesParams {
		in_folder?: number;
	}
}

async function main() {
	const storyblokApi = new StoryblokClient({
		accessToken: process.env.STORYBLOK_TOKEN,
	});

	async function fetchAllProjects<T = StoryWithProjectPage>(): Promise<T[]> {
		const {
			data: { stories },
		} = await storyblokApi.get(`cdn/stories`, {
			version: 'draft',
			starts_with: 'legacy/projects/',
			resolve_links: '1',
		});

		return stories;
	}

	async function fetchAllProjectsTransformed(): Promise<AssetStoryblok[]> {
		const data = await fetchAllProjects();
		const assets = data.map(
			(project) =>
				project.content.blocks[0].blocks.find((blok: SectionBlock) => blok.component === 'project')
					.image
		);

		return assets;
	}

	async function fetchImage(url: string): Promise<Uint8Array> {
		const response = await fetch(url, {
			headers: { Accept: 'image/jpeg,image/png,*/*' },
		});
		const data = await response.arrayBuffer();
		return new Uint8Array(data);
	}

	async function loadImage(src: string): Promise<{ data: Buffer; width: number; height: number }> {
		const imageBuffer = await fetchImage(src);
		const image = sharp(imageBuffer).raw().ensureAlpha();
		const metadata = await image.metadata();
		const buffer = await image.raw().toBuffer(); // Get raw image data
		return {
			data: buffer,
			width: metadata.width!,
			height: metadata.height!,
		};
	}

	async function generateBlurhash(imageUrl: string): Promise<string> {
		const { data, width, height } = await loadImage(imageUrl);
		const blurhash = encode(Uint8ClampedArray.from(data), width, height, 4, 4);
		return blurhash;
	}

	async function generateBlurhashHandler(asset: Asset) {
		const { filename, id } = asset;
		if (filename.includes('svg')) throw Error('This was a SVG!');
		if (!filename.includes('jpg') && !filename.includes('jpeg') && !filename.includes('png')) {
			throw Error('This was not a valid image!');
		}
		const transformedFilename =
			filename.replace('https://a', 'https://a2') + '/m/1200x0/filters:format(png)';
		const blurhashValue = await generateBlurhash(transformedFilename);
		const blurhash = {
			value: blurhashValue,
			css: blurhashToCssGradientString(blurhashValue),
		};
		const name = filename.split('/').pop();
		return { blurhash, id, name };
	}

	const assetsData = await fetchAllProjectsTransformed();
	const ids: number[] = [];
	const items = [];
	for (const item of assetsData) {
		if (ids.includes(item.id)) continue;
		const blurhash = await generateBlurhashHandler(item);
		ids.push(item.id);
		items.push(blurhash);
	}
}

main();
