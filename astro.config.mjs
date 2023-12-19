import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
const { STORYBLOK_TOKEN, OUTPUT_STRATEGY } = loadEnv('', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
	output: OUTPUT_STRATEGY ? OUTPUT_STRATEGY : 'hybrid',
	integrations: [
		tailwind(),
		react(),
		storyblok({
			accessToken: STORYBLOK_TOKEN,
			components: {
				legacyPage: 'components/layouts/Page',
				modal: 'components/content/Modal',
				section: 'components/nestable/Section',
				hero: 'components/nestable/Hero',
				fullWidthVideo: 'components/nestable/FullWidthVideoWrapper',
				titleTextCta: 'components/nestable/TitleTextCta',
				interactiveStages: 'components/nestable/InteractiveStagesWrapper',
				textWithImage: 'components/nestable/TextWithImage',
				columnBar: 'components/nestable/ColumnBar',
				mediaLinks: 'components/nestable/MediaLinks',
				projects: 'components/nestable/ProjectsWrapper',
				anotherOne: 'components/nestable/AltStats',
				legacySpacer: 'components/nestable/Spacer',
				altHeroTwo: 'components/nestable/AltHeroTwo',
				stories: 'components/nestable/StoriesWrapper',
				explore: 'components/nestable/Explore',
				cards: 'components/nestable/Cards',
				textWithImageAlt: 'components/nestable/TextWithImageAlt',
				stats: 'components/nestable/Stats',
				bigStat: 'components/nestable/BigStat',
				bentoStats: 'components/nestable/BentoStats',
			},
			apiOptions: {
				region: 'eu',
			},
			enableFallbackComponent: true,
		}),
	],
	adapter: vercel(),
});
