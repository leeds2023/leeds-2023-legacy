import type { Asset } from '@/lib/storyblok/types';
import { getPixels } from '@unpic/pixels';
import type { APIRoute } from 'astro';
import { encode } from 'blurhash';
export const prerender = false;

type Request = {
	asset: Asset;
};

export const POST: APIRoute = async ({ request }) => {
	async function generateBlurhash(imageUrl: string) {
		const pixels = await getPixels(imageUrl);
		const data = Uint8ClampedArray.from(pixels.data);
		const { width, height } = pixels;
		const blurhash = encode(data, width, height, 4, 4);
		return blurhash;
	}

	const body = (await request.json()) as Request;
	const { filename, id } = body.asset;
	if (filename.includes('svg')) return new Response(JSON.stringify({ message: 'This was a SVG!' }));
	try {
		const blurhash = await generateBlurhash(filename);
		return new Response(JSON.stringify({ message: 'This was a POST!', blurhash, id }));
	} catch (error) {
		console.error(error);
	}
	return new Response(
		JSON.stringify({
			message: 'This was a POST!',
		})
	);
};
