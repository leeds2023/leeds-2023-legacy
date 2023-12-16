import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
const { STORYBLOK_TOKEN, OUTPUT_STRATEGY } = loadEnv('', process.cwd());

export default defineConfig({
	output: OUTPUT_STRATEGY ? OUTPUT_STRATEGY : 'hybrid',
	integrations: [
		tailwind(),
		react(),
		storyblok({
			accessToken: STORYBLOK_TOKEN,
			components: {
				legacyPage: 'components/content/Page',
				modal: 'components/content/Modal',
				section: 'components/nestable/Section',
				hero: 'components/nestable/Hero',
				fullWidthVideo: 'components/nestable/FullWidthVideo',
				titleTextCta: 'components/nestable/TitleTextCta',
				interactiveStages: 'components/nestable/InteractiveStagesWrapper',
				textWithImage: 'components/nestable/TextWithImage',
				columnBar: 'components/nestable/ColumnBar',
				mediaLinks: 'components/nestable/MediaLinks',
				partners: 'components/nestable/Partners',
				anotherOne: 'components/nestable/AltStats',
			},
			apiOptions: {
				region: 'eu',
			},
			enableFallbackComponent: true,
		}),
	],
	adapter: vercel(),
});
