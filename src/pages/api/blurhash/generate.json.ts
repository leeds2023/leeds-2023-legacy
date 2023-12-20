import { generateBlurhash } from '@/lib/storyblok/helpers';
import type { Asset } from '@/lib/storyblok/types';
import type { APIRoute } from 'astro';
export const prerender = false;

type Request = {
	asset: Asset;
};

export const POST: APIRoute = async ({ request }) => {
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
