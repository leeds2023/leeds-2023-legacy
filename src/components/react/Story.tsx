import type { StoryStoryblok } from '@/lib/storyblok/types';
import { cn } from '@/lib/utils';
import { Image } from '@unpic/react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/Dialog';
import FullWidthVideo from './FullWidthVideo';
import { extractDimensions } from '@/lib/storyblok/helpers';
import { ScrollArea } from './ui/ScrollArea';
import { renderRichText, storyblokInit } from '@storyblok/react';

type StoryProps = {
	blok: StoryStoryblok;
};

export default function Story({ blok }: StoryProps) {
	storyblokInit({
		accessToken: import.meta.env.STORYBLOK_TOKEN,
	});
	const dimensions = extractDimensions(blok.portraitImage.filename, 2000);

	return (
		<Dialog>
			<DialogTrigger className="">
				<div className="relative flex w-full flex-col gap-4 text-left">
					<div className="overflow-hidden rounded-xl">
						<Image
							width={300}
							height={411}
							background="auto"
							src={blok.portraitImage.filename}
							alt={blok.title}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<h3 className={cn('font-display text-3xl underline')}>{blok.title}</h3>
						<h4 className="text-sm">{blok.subtitle}</h4>
					</div>
					<div className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md bg-brandMagenta-100 p-1 text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="15 3 21 3 21 9" />
							<polyline points="9 21 3 21 3 15" />
							<line x1="21" x2="14" y1="3" y2="10" />
							<line x1="3" x2="10" y1="21" y2="14" />
						</svg>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent className="w-[50rem] max-w-[90vw] overflow-hidden rounded-md border-0 bg-white px-0 pt-0">
				<ScrollArea type="always">
					<div className="max-h-[70vh] tall:max-h-[80vh]">
						{blok.youtubeId && blok.youtubeId !== '' && (
							<FullWidthVideo
								blok={{
									youtubeId: blok.youtubeId,
									coverImage: blok.videoLandscapeThumbnail,
								}}
								isModal
							/>
						)}

						{blok.videoLandscapeThumbnail.filename &&
							(!blok.youtubeId || blok.youtubeId === '') && (
								<div className="h-32 mediumHeight:h-64 tall:h-96">
									{dimensions ? (
										<Image
											src={blok.videoLandscapeThumbnail.filename}
											className="h-full !max-h-none !max-w-none object-cover"
											alt={blok.title ? blok.title : ''}
											background="auto"
											width={dimensions.width}
											height={dimensions.height}
										/>
									) : (
										<Image
											src={blok.videoLandscapeThumbnail.filename}
											className="h-full !max-h-none !max-w-none object-cover"
											alt={blok.title ? blok.title : ''}
											background="auto"
											layout="fullWidth"
										/>
									)}
								</div>
							)}
						<DialogHeader className="flex flex-col gap-1.5 px-6 pt-6">
							<DialogTitle className="text-left font-display text-4xl font-normal">
								{blok.title}
							</DialogTitle>
							<DialogDescription className="text-left">{blok.subtitle}</DialogDescription>
						</DialogHeader>

						<div
							className="prose px-6 py-2"
							dangerouslySetInnerHTML={{
								__html: renderRichText(blok.body),
							}}
						/>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
