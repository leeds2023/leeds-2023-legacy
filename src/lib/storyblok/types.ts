/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ISbStory, ISbStoryData } from '@storyblok/astro';

export type Asset = AssetStoryblok;
export type Link = Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
export type RichText = RichtextStoryblok;

export type Seo = {
	_uid: string;
	title: string;
	plugin: 'seo_metatags';
	description: string;
	og_image: Asset;
	og_title?: string;
	og_description?: string;
	twitter_title?: string;
	twitter_description?: string;
	twitter_image?: Asset;
};

export interface ILinkURLObject {
	id: number;
	name: string;
	slug: string;
	full_slug: string;
	url: string;
	uuid: string;
}

export interface LegacyPageStories<T = StoryWithLegacyPage> {
	data: {
		cv: number;
		links: (ISbStoryData<T> | ILinkURLObject)[];
		rels: ISbStoryData<T>[];
		stories: ISbStoryData<T>[];
	};
	perPage: number;
	total: number;
	headers: any;
}

export type StoryResponse = ISbStory;
export type StoryData<T> = ISbStoryData<T>;
export type StoryWithLegacyPage = ISbStoryData<LegacyPageStoryblok>;
export type StoryWithNavAndFooter = ISbStoryData<NavAndFooterStoryblok>;

export type DataSource = {
	id: number;
	name: string;
	value: string;
	dimension_value: string | null;
};

export type DataSourceResponse = {
	datasource_entries: DataSource[];
};

export interface AssetStoryblok {
	alt?: string;
	copyright?: string;
	id: number;
	filename: string;
	name: string;
	title?: string;
	focus?: string;
	[k: string]: any;
}

export type MultilinkStoryblok =
	| {
			id?: string;
			cached_url?: string;
			anchor?: string;
			linktype?: 'story';
			story?: {
				name: string;
				created_at?: string;
				published_at?: string;
				id: number;
				uuid: string;
				content?: {
					[k: string]: any;
				};
				slug: string;
				full_slug: string;
				sort_by_date?: null | string;
				position?: number;
				tag_list?: string[];
				is_startpage?: boolean;
				parent_id?: null | number;
				meta_data?: null | {
					[k: string]: any;
				};
				group_id?: string;
				first_published_at?: string;
				release_id?: null | number;
				lang?: string;
				path?: null | string;
				alternates?: any[];
				default_full_slug?: null | string;
				translated_slugs?: null | any[];
				[k: string]: any;
			};
			[k: string]: any;
	  }
	| {
			url?: string;
			cached_url?: string;
			anchor?: string;
			linktype?: 'asset' | 'url';
			[k: string]: any;
	  }
	| {
			email?: string;
			linktype?: 'email';
			[k: string]: any;
	  };

export interface AltHeroStoryblok {
	title: string;
	image: AssetStoryblok;
	description?: string;
	ctaLinkTextOne?: string;
	ctaLinkOne?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	ctaLinkTextTwo?: string;
	ctaLinkTwo?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	_uid: string;
	component: 'altHero';
	[k: string]: any;
}

export interface AltHeroTwoStoryblok {
	title: string;
	label: string;
	blurb: string;
	_uid: string;
	component: 'altHeroTwo';
	[k: string]: any;
}

export interface AltStatsStoryblok {
	mainNumber: string;
	mainSubtitle: string;
	secondaryNumberOne: string;
	secondarySubtitleOne: string;
	secondaryNumberTwo: string;
	secondarySubtitleTwo: string;
	secondaryNumberThree: string;
	secondarySubtitleThree: string;
	_uid: string;
	component: 'altStats';
	[k: string]: any;
}

export interface BigStatStoryblok {
	title: string;
	description: string;
	value: string;
	reverse?: boolean;
	_uid: string;
	component: 'bigStat';
	[k: string]: any;
}

export interface RichtextStoryblok {
	type: string;
	content?: RichtextStoryblok[];
	marks?: RichtextStoryblok[];
	attrs?: any;
	text?: string;
	[k: string]: any;
}

export interface CardStoryblok {
	label: string;
	title: string;
	description: RichtextStoryblok;
	_uid: string;
	component: 'card';
	[k: string]: any;
}

export interface CardsStoryblok {
	title?: string;
	description?: string;
	cards: CardStoryblok[];
	_uid: string;
	component: 'cards';
	[k: string]: any;
}

export interface ColumnBarStoryblok {
	fullWidth?: boolean;
	columns: ColumnBlockStoryblok[];
	bgColor?: '' | 'white' | 'mint' | 'transparent';
	negativeMargin?: boolean;
	_uid: string;
	component: 'columnBar';
	[k: string]: any;
}

export interface ColumnBlockStoryblok {
	image: AssetStoryblok;
	text: string;
	ctaLink?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	_uid: string;
	component: 'columnBlock';
	[k: string]: any;
}

export interface EmbedStoryblok {
	scriptTag: string;
	_uid: string;
	component: 'embed';
	[k: string]: any;
}

export interface EventStoryblok {
	vertical?: boolean;
	title: string;
	description: RichtextStoryblok;
	ctaLink?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	ctaText?: string;
	_uid: string;
	component: 'event';
	[k: string]: any;
}

export interface ExploreStoryblok {
	title: string;
	description: string;
	ctaLink: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	ctaText: string;
	items: ExploreItemStoryblok[];
	_uid: string;
	component: 'explore';
	[k: string]: any;
}

export interface ExploreItemStoryblok {
	image: AssetStoryblok;
	label: string;
	title: string;
	ctaLink: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	ctaText: string;
	_uid: string;
	component: 'exploreItem';
	[k: string]: any;
}

export interface FooterContentStoryblok {
	links: NavFooterLinkStoryblok[];
	copyrightText: string;
	prependDateText: string;
	_uid: string;
	component: 'footerContent';
	[k: string]: any;
}

export interface FullWidthVideoStoryblok {
	videoAsset?: AssetStoryblok;
	youtubeUrl?: string;
	coverImage: AssetStoryblok;
	useVideoAsset?: boolean;
	_uid: string;
	component: 'fullWidthVideo';
	[k: string]: any;
}

export interface HeroStoryblok {
	title: string;
	subtitle: string;
	mainTitle: string;
	_uid: string;
	component: 'hero';
	[k: string]: any;
}

export interface ImageTextWithQuoteStoryblok {
	quote: string;
	description: RichtextStoryblok;
	title: string;
	subtitle?: string;
	media: AssetStoryblok;
	_uid: string;
	component: 'imageTextWithQuote';
	[k: string]: any;
}

export interface InteractiveStageStoryblok {
	label: string;
	stageName: string;
	blurb: string;
	ctaLinkTextOne?: string;
	ctaLinkOne?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	ctaLinkTextTwo?: string;
	ctaLinkTwo?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	ctaLinkTextThree?: string;
	ctaLinkThree?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	ctaLinkTextFour?: string;
	ctaLinkFour?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	otherLinks?: LinkStoryblok[];
	stats?: StatStoryblok[];
	bgColor: '' | 'pink' | 'mint' | 'rose';
	slideOneImage: AssetStoryblok;
	slideTwoImage: AssetStoryblok;
	slideThreeImage: AssetStoryblok;
	_uid: string;
	component: 'interactiveStage';
	[k: string]: any;
}

export interface InteractiveStagesStoryblok {
	stages?: InteractiveStageStoryblok[];
	_uid: string;
	component: 'interactiveStages';
	[k: string]: any;
}

export interface LegacyGlobalStoryblok {
	blocks: (NavContentStoryblok | FooterContentStoryblok)[];
	_uid: string;
	component: 'legacyGlobal';
	[k: string]: any;
}

export interface LegacyPageStoryblok {
	seo: Seo;
	blocks: SectionStoryblok[];
	_uid: string;
	component: 'legacyPage';
	[k: string]: any;
}

export interface LegacySpacerStoryblok {
	size?: '' | 'small' | 'medium' | 'large';
	_uid: string;
	component: 'legacySpacer';
	[k: string]: any;
}

export interface LinkStoryblok {
	link: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	linkText?: string;
	linkTitle?: string;
	image?: AssetStoryblok;
	_uid: string;
	component: 'link';
	[k: string]: any;
}

export interface MapStoryblok {
	title: string;
	description: string;
	items: MapItemStoryblok[];
	_uid: string;
	component: 'map';
	[k: string]: any;
}

export interface MapItemStoryblok {
	country: string;
	continent:
		| ''
		| 'asia'
		| 'africa'
		| 'north-america'
		| 'south-america'
		| 'antarctica'
		| 'europe'
		| 'australia';
	description: string;
	ctaLink: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	ctaText: string;
	_uid: string;
	component: 'mapItem';
	[k: string]: any;
}

export interface MediaLinkStoryblok {
	image: AssetStoryblok;
	title?: string;
	link: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	linkText: string;
	_uid: string;
	component: 'mediaLink';
	[k: string]: any;
}

export interface MediaLinksStoryblok {
	links: MediaLinkStoryblok[];
	_uid: string;
	component: 'mediaLinks';
	[k: string]: any;
}

export interface ModalStoryblok {
	seo: {
		_uid?: string;
		title?: string;
		plugin?: string;
		og_image?: string;
		og_title?: string;
		description?: string;
		twitter_image?: string;
		twitter_title?: string;
		og_description?: string;
		twitter_description?: string;
		[k: string]: any;
	};
	blocks: (
		| AltHeroStoryblok
		| AltHeroTwoStoryblok
		| AltStatsStoryblok
		| BigStatStoryblok
		| CardsStoryblok
		| ColumnBarStoryblok
		| ColumnBlockStoryblok
		| EmbedStoryblok
		| EventStoryblok
		| ExploreStoryblok
		| ExploreItemStoryblok
		| FooterContentStoryblok
		| FullWidthVideoStoryblok
		| HeroStoryblok
		| ImageTextWithQuoteStoryblok
		| InteractiveStageStoryblok
		| InteractiveStagesStoryblok
		| LegacyGlobalStoryblok
		| LegacyPageStoryblok
		| LegacySpacerStoryblok
		| LinkStoryblok
		| MapStoryblok
		| MapItemStoryblok
		| MediaLinkStoryblok
		| MediaLinksStoryblok
		| ModalStoryblok
		| NavAndFooterStoryblok
		| NavContentStoryblok
		| NavFooterLinkStoryblok
		| PartnersStoryblok
		| ProjectStoryblok
		| ProjectsStoryblok
		| QuoteOnlyStoryblok
		| SectionStoryblok
		| StatStoryblok
		| StatsStoryblok
		| StoriesStoryblok
		| StoryStoryblok
		| TestimonialsStoryblok
		| TextWithImageStoryblok
		| TextWithImageAltStoryblok
		| ThanksStoryblok
		| ThanksItemStoryblok
		| TitleTextCtaStoryblok
	)[];
	_uid: string;
	component: 'modal';
	[k: string]: any;
}

export interface NavAndFooterStoryblok {
	nav: NavContentStoryblok[];
	footer: FooterContentStoryblok[];
	logo: AssetStoryblok;
	_uid: string;
	component: 'navAndFooter';
	[k: string]: any;
}

export interface NavContentStoryblok {
	links: NavFooterLinkStoryblok[];
	_uid: string;
	component: 'navContent';
	[k: string]: any;
}

export interface NavFooterLinkStoryblok {
	linkText?: string;
	link?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	_uid: string;
	component: 'navFooterLink';
	[k: string]: any;
}

export interface PartnersStoryblok {
	title?: string;
	description: RichtextStoryblok;
	links?: LinkStoryblok[];
	_uid: string;
	component: 'partners';
	[k: string]: any;
}

export interface ProjectStoryblok {
	title: string;
	description: RichtextStoryblok;
	image: AssetStoryblok;
	links?: LinkStoryblok[];
	eventDate?: string;
	subtitle?: string;
	associatedStage?: '' | 'awakening' | 'playing' | 'dreaming';
	tags?: (number | string)[];
	_uid: string;
	component: 'project';
	[k: string]: any;
}

export interface ProjectsStoryblok {
	topBarTitle: string;
	mainTitle: string;
	searchResultsTitleText: string;
	showProjects: '' | 'all' | 'awakening' | 'playing' | 'dreaming';
	_uid: string;
	component: 'projects';
	[k: string]: any;
}

export interface QuoteOnlyStoryblok {
	quote?: string;
	author?: string;
	authorSubtext?: string;
	externalLink?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	_uid: string;
	component: 'quoteOnly';
	[k: string]: any;
}

export type SectionBlockValues =
	| AltHeroStoryblok
	| AltHeroTwoStoryblok
	| AltStatsStoryblok
	| BigStatStoryblok
	| CardsStoryblok
	| ColumnBarStoryblok
	| ColumnBlockStoryblok
	| EmbedStoryblok
	| EventStoryblok
	| ExploreStoryblok
	| ExploreItemStoryblok
	| FooterContentStoryblok
	| FullWidthVideoStoryblok
	| HeroStoryblok
	| ImageTextWithQuoteStoryblok
	| InteractiveStageStoryblok
	| InteractiveStagesStoryblok
	| LegacyGlobalStoryblok
	| LegacyPageStoryblok
	| LegacySpacerStoryblok
	| LinkStoryblok
	| MapStoryblok
	| MapItemStoryblok
	| MediaLinkStoryblok
	| MediaLinksStoryblok
	| ModalStoryblok
	| NavAndFooterStoryblok
	| NavContentStoryblok
	| NavFooterLinkStoryblok
	| PartnersStoryblok
	| ProjectStoryblok
	| ProjectsStoryblok
	| QuoteOnlyStoryblok
	| SectionStoryblok
	| StatStoryblok
	| StatsStoryblok
	| StoriesStoryblok
	| StoryStoryblok
	| TestimonialsStoryblok
	| TextWithImageStoryblok
	| TextWithImageAltStoryblok
	| ThanksStoryblok
	| ThanksItemStoryblok
	| TitleTextCtaStoryblok;

export interface SectionStoryblok {
	color:
		| 'mint'
		| 'white'
		| 'rose'
		| 'cream'
		| 'lightCream'
		| 'burgundy'
		| 'teal'
		| 'yellow'
		| 'magenta'
		| 'transparent';
	blocks: (
		| AltHeroStoryblok
		| AltHeroTwoStoryblok
		| AltStatsStoryblok
		| BigStatStoryblok
		| CardsStoryblok
		| ColumnBarStoryblok
		| ColumnBlockStoryblok
		| EmbedStoryblok
		| EventStoryblok
		| ExploreStoryblok
		| ExploreItemStoryblok
		| FooterContentStoryblok
		| FullWidthVideoStoryblok
		| HeroStoryblok
		| ImageTextWithQuoteStoryblok
		| InteractiveStageStoryblok
		| InteractiveStagesStoryblok
		| LegacyGlobalStoryblok
		| LegacyPageStoryblok
		| LegacySpacerStoryblok
		| LinkStoryblok
		| MapStoryblok
		| MapItemStoryblok
		| MediaLinkStoryblok
		| MediaLinksStoryblok
		| ModalStoryblok
		| NavAndFooterStoryblok
		| NavContentStoryblok
		| NavFooterLinkStoryblok
		| PartnersStoryblok
		| ProjectStoryblok
		| ProjectsStoryblok
		| QuoteOnlyStoryblok
		| SectionStoryblok
		| StatStoryblok
		| StatsStoryblok
		| StoriesStoryblok
		| StoryStoryblok
		| TestimonialsStoryblok
		| TextWithImageStoryblok
		| TextWithImageAltStoryblok
		| ThanksStoryblok
		| ThanksItemStoryblok
		| TitleTextCtaStoryblok
	)[];
	padding: 'none' | 'small' | 'medium' | 'large' | 'xlarge';
	container: 'none' | 'small' | 'medium' | 'large' | 'xlarge';
	sectionName: string;
	backgroundImage: 'none' | 'ribbonOne' | 'ribbonTwo' | 'ribbonThree' | 'ribbonFour';
	gap: 'none' | 'small' | 'medium' | 'large' | 'xlarge';
	_uid: string;
	component: 'section';
	[k: string]: any;
}

export interface StatStoryblok {
	subtext: string;
	statValue: string;
	icon?: AssetStoryblok;
	_uid: string;
	component: 'stat';
	[k: string]: any;
}

export interface StatsStoryblok {
	stats: StatStoryblok[];
	_uid: string;
	component: 'stats';
	[k: string]: any;
}

export interface StoriesStoryblok {
	stories: StoryStoryblok[];
	_uid: string;
	component: 'stories';
	[k: string]: any;
}

export interface StoryStoryblok {
	coverImage: AssetStoryblok;
	youtubeId: string;
	title: string;
	subtitle: string;
	body: RichtextStoryblok;
	_uid: string;
	component: 'story';
	[k: string]: any;
}

export interface TestimonialStoryblok {
	title: string;
	subtitle?: string;
	description: RichtextStoryblok;
	_uid: string;
	component: 'testimonial';
	[k: string]: any;
}

export interface TestimonialsStoryblok {
	item: TestimonialStoryblok[];
	_uid: string;
	component: 'testimonials';
	[k: string]: any;
}

export interface TextWithImageStoryblok {
	ctas?: LinkStoryblok[];
	title: string;
	description: RichtextStoryblok;
	reverse?: boolean;
	image?: AssetStoryblok;
	truncate?: boolean;
	truncateCharacters?: string;
	_uid: string;
	component: 'textWithImage';
	[k: string]: any;
}

export interface TextWithImageAltStoryblok {
	title?: string;
	body?: RichtextStoryblok;
	image?: AssetStoryblok;
	_uid: string;
	component: 'Text With Image Alt';
	[k: string]: any;
}

export interface ThanksStoryblok {
	items: ThanksItemStoryblok[];
	_uid: string;
	component: 'thanks';
	[k: string]: any;
}

export interface ThanksItemStoryblok {
	image: AssetStoryblok;
	_uid: string;
	component: 'thanksItem';
	[k: string]: any;
}

export interface TitleTextCtaStoryblok {
	title?: string;
	description: RichtextStoryblok;
	ctaLink?: Exclude<MultilinkStoryblok, { linktype?: 'email' } | { linktype?: 'asset' }>;
	ctaText?: string;
	lightText?: boolean;
	whiteBg?: boolean;
	subtitle?: string;
	_uid: string;
	component: 'titleTextCta';
	[k: string]: any;
}
