import { useDebounce } from '@/lib/hooks/useDebounce';
import type { ProjectsStoryblok } from '@/lib/storyblok/types';
import type { Project as ProjectType, ProjectsApiResponse } from '@/pages/programme/data.json';
import Project from './Project';
import { useEffect, useState } from 'react';
import { Input } from './ui/Input';
import Fuse from 'fuse.js';
import { cn } from '@/lib/utils';
import { navigate } from 'astro:transitions/client';
type ProjectsProps = {
	initialProjectData: ProjectsApiResponse;
	blok: ProjectsStoryblok;
};

export default function Projects({ initialProjectData, blok }: ProjectsProps) {
	const stages = {
		all: {
			text: 'All',
			link: '/programme/',
		},
		awakening: {
			text: 'Awakening',
			link: '/programme/awakening',
		},
		playing: {
			text: 'Playing',
			link: '/programme/playing',
		},
		dreaming: {
			text: 'Dreaming',
			link: '/programme/dreaming',
		},
	};

	const [searchQuery, setSearchQuery] = useState('');
	const [results, setResults] = useState(initialProjectData);
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	const searchOptions = {
		includeScore: true,
		includeMatches: true,
		threshold: 0.2,
		keys: ['title', 'tags', 'category'],
	};

	const fuse = new Fuse<ProjectType>(initialProjectData, searchOptions);

	useEffect(() => {
		if (debouncedSearchQuery === '') {
			setResults(initialProjectData);
		} else {
			const fuseResults = fuse.search(debouncedSearchQuery);
			const results = fuseResults.map((result): ProjectType => {
				return result.item;
			});
			setResults(results);
		}
	}, [debouncedSearchQuery]);

	function handlePressInput() {
		if (window.location.pathname !== '/programme/') {
			navigate('/programme/');
		}
	}
	return (
		<div className="pb-16 lg:pb-24">
			<div
				className={cn(
					'mb-12 bg-white py-6',
					blok.showProjects !== 'all' &&
						'fixed left-0 top-16 z-[101] w-full border-b-2 border-slate-200 shadow-sm'
				)}
			>
				<div className="mx-auto px-4 lg:max-w-[950px] lg:px-2 xl:max-w-[1150px] 2xl:max-w-[1250px] 3xl:max-w-[1350px] 4xl:max-w-[1500px]">
					<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
						<h2 className="hidden w-full font-display text-2xl lg:block lg:w-5/12">Programme</h2>
						<div className="flex w-full flex-col justify-end gap-6 lg:w-7/12 lg:flex-row lg:items-center">
							<div className="text-display flex gap-4 text-base">
								{(Object.keys(stages) as (keyof typeof stages)[]).map((stage, index) => (
									<a
										key={index}
										href={stages[stage].link}
										className={cn(
											'flex items-center justify-center rounded-full border-2 border-slate-200 px-4 py-1 font-display text-sm font-medium',
											stages[stage].text === 'All' && '',
											stages[stage].text === 'All' &&
												blok.showProjects === 'all' &&
												' border-slate-200 bg-slate-200',
											stages[stage].text === 'Awakening' && 'border-brandMagenta-40',
											stages[stage].text === 'Awakening' &&
												blok.showProjects === 'awakening' &&
												'border-[#ee3796] bg-[#EE3796] text-white',
											stages[stage].text === 'Playing' && 'border-brandTeal-20',
											stages[stage].text === 'Playing' &&
												blok.showProjects === 'playing' &&
												'border-brandTeal-100 bg-brandTeal-100',
											stages[stage].text === 'Dreaming' && 'border-brandRose-60',
											stages[stage].text === 'Dreaming' &&
												blok.showProjects === 'dreaming' &&
												'border-brandRose-100 bg-brandRose-100'
										)}
									>
										{stages[stage].text}
									</a>
								))}
							</div>
							<Input
								placeholder="Search"
								className="w-full focus-visible:ring-brandDarkGreen-100 focus-visible:ring-opacity-50"
								onChange={(e) => setSearchQuery(e.target.value)}
								onClick={handlePressInput}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="mx-auto min-h-[50vh] px-4 lg:max-w-[1000px] lg:px-2 xl:max-w-[1200px] 2xl:max-w-[1250px] 3xl:max-w-[1350px] 4xl:max-w-[1500px]">
				<div className="flex flex-col gap-10">
					{blok.showProjects === 'all' && (
						<h1 className="font-display text-2xl lg:text-4xl">
							{(!debouncedSearchQuery || debouncedSearchQuery === '') &&
								blok.mainTitle &&
								blok.mainTitle}
							{debouncedSearchQuery && debouncedSearchQuery !== '' && (
								<>
									Search results for <span className="underline">{debouncedSearchQuery}</span>
								</>
							)}
						</h1>
					)}
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
						{results.map((project, index) => (
							<Project key={project.uuid} project={project} index={index} />
						))}
					</div>
					{results.length === 0 && (
						<div className="flex flex-col items-center justify-center gap-2">
							<h3 className="font-display text-2xl">No results found</h3>
							<p className="text-center">
								Please try a different search term or clear your search query
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
