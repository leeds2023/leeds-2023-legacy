/// <reference types="astro/client" />

interface ImportMetaEnv {
	GREENSOCK_TOKEN: string;
	STORYBLOK_TOKEN: string;
	STORYBLOK_ENV: 'draft' | 'published';
	OUTPUT_STRATEGY: 'hybrid' | 'static' | 'server';
	SITE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
