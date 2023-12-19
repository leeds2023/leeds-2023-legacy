import type { StoryStoryblok } from '@/lib/storyblok/types';
import { cn } from '@/lib/utils';
import { Image } from '@unpic/react';
import { useState } from 'react';
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
	const [isHovered, setIsHovered] = useState(false);
	const dimensions = extractDimensions(blok.portraitImage.filename, 2000);

	return (
		<Dialog>
			<DialogTrigger className="">
				<div
					className="flex w-full flex-col gap-4 text-left"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
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
						<h3 className={cn('font-display text-3xl', isHovered && 'underline')}>{blok.title}</h3>
						<h4 className="text-sm">{blok.subtitle}</h4>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent className="w-[50rem] max-w-[90vw] overflow-hidden rounded-md border-0 bg-white px-0 pt-0">
				{blok.youtubeId && blok.youtubeId !== '' && (
					<FullWidthVideo
						blok={{
							youtubeId: blok.youtubeId,
							coverImage: blok.videoLandscapeThumbnail,
						}}
						isModal
					/>
				)}

				{blok.videoLandscapeThumbnail.filename && (!blok.youtubeId || blok.youtubeId === '') && (
					<div className="mediumHeight:h-64 tall:h-96 h-32">
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
				<ScrollArea type="always">
					<div
						className="prose max-h-[20vh] px-6 py-2"
						dangerouslySetInnerHTML={{
							__html: renderRichText(blok.body),
						}}
					/>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
