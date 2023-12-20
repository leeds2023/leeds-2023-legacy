import type { Project } from '@/pages/programme/data.json';
import { Image } from '@unpic/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import TagsList from './ui/TagsList';
import { renderRichText, storyblokInit } from '@storyblok/react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/react/ui/Dialog';
import FullWidthVideo from './FullWidthVideo';
import { ScrollArea } from './ui/ScrollArea';
import { extractDimensions } from '@/lib/storyblok/helpers';
import useScreenSize from '@/lib/hooks/useScreenSize';

type ProjectProps = {
	project: Project;
	index: number;
};

const stages = {
	awakening: 'Awakening',
	playing: 'Playing',
	dreaming: 'Dreaming',
} as const;

export type Stage = keyof typeof stages;

export default function Project({ project, index }: ProjectProps) {
	storyblokInit({
		accessToken: import.meta.env.STORYBLOK_TOKEN,
	});

	const [expanded, setExpanded] = useState(false);
	const dimensions = extractDimensions(project.content.image.filename, 1000, 'width');
	const screenSize = useScreenSize();

	return (
		<div className="flex flex-col overflow-hidden rounded-md bg-white shadow">
			<div className="h-36 bg-slate-300">
				<Image
					src={project.content.image.filename}
					alt={project.content.title}
					width={954}
					height={407.25}
					background="auto"
					priority={
						screenSize.width < 1280 && index < 5
							? true
							: screenSize.width < 768 && index < 3
							? true
							: screenSize.width >= 1280 && index < 7
							? true
							: false
					}
					className="h-full object-cover"
				/>
			</div>
			<div className="relative flex flex-col gap-2 p-4">
				<div className="flex flex-col gap-1 pb-2">
					<h2 className="font-display text-xl">{project.content.title}</h2>
					<span className="text-sm">{project.content.subtitle}</span>
				</div>
				<TagsList
					stage={project.content.associatedStage}
					tags={project.content.tags ? project.content.tags : []}
				/>
				{expanded && (
					<div>
						<p className="py-4 text-sm">{project.content.smallDescription}</p>
						<Dialog>
							<DialogTrigger className="w-full rounded-sm border border-brandDarkGreen-100 py-1.5 font-display text-sm text-brandDarkGreen-100 hover:border-brandDarkGreen-80 focus:ring-2 focus:ring-brandDarkGreen-40">
								Read More
							</DialogTrigger>
							<DialogContent className="w-[50rem] max-w-[90vw] overflow-hidden rounded-md border-0 bg-white px-0 pt-0">
								<ScrollArea type="always">
									<div className="max-h-[70vh] tall:max-h-[80vh]">
										{project.content.youtubeId && project.content.youtubeId !== '' && (
											<FullWidthVideo
												blok={{
													youtubeId: project.content.youtubeId,
													coverImage: project.content.image,
												}}
												isModal
											/>
										)}

										{project.content.image.filename &&
											(!project.content.youtubeId || project.content.youtubeId === '') && (
												<div className="h-32 mediumHeight:h-64 tall:h-96">
													{dimensions ? (
														<Image
															src={project.content.image.filename}
															className="h-full !max-h-none !max-w-none object-cover"
															alt={project.content.title ? project.content.title : ''}
															background="auto"
															width={dimensions.width}
															height={dimensions.height}
														/>
													) : (
														<Image
															src={project.content.image.filename}
															className="h-full !max-h-none !max-w-none object-cover"
															alt={project.content.title ? project.content.title : ''}
															background="auto"
															layout="fullWidth"
														/>
													)}
												</div>
											)}
										<DialogHeader className="flex flex-col gap-1.5 px-6 pt-6">
											<TagsList
												stage={project.content.associatedStage}
												tags={project.content.tags ? project.content.tags : []}
												disableThreshold
											/>
											<DialogTitle className="text-left font-display text-4xl font-normal">
												{project.content.title}
											</DialogTitle>
											<DialogDescription className="text-left">
												{project.content.subtitle}
											</DialogDescription>
										</DialogHeader>
										<div
											className="prose px-6 py-2"
											dangerouslySetInnerHTML={{
												__html: renderRichText(project.content.description),
											}}
										/>
									</div>
								</ScrollArea>
							</DialogContent>
						</Dialog>
					</div>
				)}

				<button
					className={cn('absolute right-4 top-4', expanded ? 'rotate-180 transform' : '')}
					onClick={() => setExpanded(!expanded)}
					aria-labelledby={project.uuid + '-expand'}
				>
					<span id={project.uuid + '-expand'} className="sr-only">
						Expand
					</span>
					<Image src="/images/icons/chevron.svg" alt="" height={30} background="auto" width={30} />
				</button>
			</div>
		</div>
	);
}
