import type { Project } from '@/pages/programme/data.json';
import { Image } from '@unpic/react';
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
import { extractDimensions, parseStoryblokLink } from '@/lib/storyblok/helpers';

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

	const dimensions = extractDimensions(project.content.image.filename, 1000, 'width');

	return (
		<Dialog>
			<DialogTrigger>
				<div className="flex h-full flex-col overflow-hidden rounded-md bg-white text-left shadow">
					<div className="h-36">
						<Image
							src={project.content.image.filename}
							alt={project.content.title}
							width={954}
							height={407.25}
							background={project.blurhash ? project.blurhash.css : 'auto'}
							priority={index < 7}
							className="h-full object-cover"
						/>
					</div>
					<div className="relative flex h-full flex-col justify-between gap-2 p-4">
						<span
							className={cn(
								'absolute right-4 top-4 h-6 w-6 flex-shrink-0 rounded-full',
								project.content.associatedStage === 'awakening'
									? 'bg-[#EE3796]'
									: project.content.associatedStage === 'playing'
									? 'bg-brandTeal-100'
									: 'bg-[#FCDB14]'
							)}
						/>
						<div>
							<div className="flex flex-col gap-1 pb-2">
								<h2 className="max-w-[calc(100%-2rem)] font-display text-xl">
									{project.content.title}
								</h2>
								<span className="pb-1.5 text-sm">{project.content.subtitle}</span>
							</div>
							<TagsList
								stage={project.content.associatedStage}
								tags={project.content.tags ? project.content.tags : []}
								disableThreshold
							/>
							<p className="py-4 text-sm">{project.content.smallDescription}</p>
						</div>
						<button className="w-full rounded-sm border border-brandDarkGreen-100 py-1.5 font-display text-sm text-brandDarkGreen-100 hover:border-brandDarkGreen-80 focus:ring-2 focus:ring-brandDarkGreen-40">
							Read more
						</button>
					</div>
				</div>
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
								blurhashCss={project.blurhash ? project.blurhash.css : undefined}
								isModal
							/>
						)}

						{project.content.image.filename &&
							(!project.content.youtubeId || project.content.youtubeId === '') && (
								<div className="relative h-32 mediumHeight:h-64 tall:h-96">
									{dimensions ? (
										<Image
											src={project.content.image.filename}
											className="h-full !max-h-none !max-w-none object-cover"
											alt={project.content.title ? project.content.title : ''}
											background={project.blurhash ? project.blurhash.css : 'auto'}
											width={dimensions.width}
											height={dimensions.height}
										/>
									) : (
										<Image
											src={project.content.image.filename}
											className="h-full !max-h-none !max-w-none object-cover"
											alt={project.content.title ? project.content.title : ''}
											background={project.blurhash ? project.blurhash.css : 'auto'}
											layout="fullWidth"
										/>
									)}
									{project.content.image.copyright && project.content.image.copyright !== '' && (
										<figcaption className="absolute bottom-0 right-0 z-20 flex items-center justify-center bg-brandDarkGreen-100 px-4 py-2 text-[14px] text-white">
											{project.content.image.copyright}
										</figcaption>
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
						{project.content.links && project.content.links.length > 0 && (
							<div className="px-6 py-2">
								<div className="flex flex-col items-center gap-2 bg-brandMint-100 p-6">
									<ul className="flex gap-8">
										{project.content.links.map((link, index) => (
											<li key={index}>
												<a
													href={parseStoryblokLink(link.link)}
													rel="noreferrer"
													target="_blank"
													className="flex items-center gap-4 font-display font-medium"
												>
													{link.image && (
														<div className="flex h-14 w-14 items-center justify-center rounded-full bg-white p-4">
															<Image
																src={link.image.filename}
																width={24}
																height={24}
																className="h-full w-full object-contain"
															/>
														</div>
													)}
													{link.linkText || 'Link'}
												</a>
											</li>
										))}
									</ul>
								</div>
							</div>
						)}
						{project.content.credits && project.content.credits.length > 0 && (
							<div className="px-6 py-2">
								<div className="flex flex-col gap-2 bg-brandCream-60 p-6">
									<h3 className="font-display text-2xl">Credits</h3>
									{project.content.credits.map((creditCategory, index) => (
										<div key={index} className="flex flex-wrap items-center gap-2">
											<h4 className="font-display text-lg">{creditCategory.title}</h4>
											<ul className="flex list-none flex-wrap gap-2">
												{creditCategory.credits.map((creditItem, index) => {
													return (
														<>
															{creditItem.creditLink && creditItem.creditLink.cached_url !== '' ? (
																<li key={index} className="text-buttonRed-default underline">
																	<a
																		href={parseStoryblokLink(creditItem.creditLink)}
																		rel="noreferrer"
																		target="_blank"
																	>
																		{creditItem.creditText}
																	</a>
																</li>
															) : (
																<li key={index}>{creditItem.creditText}</li>
															)}
														</>
													);
												})}
											</ul>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
