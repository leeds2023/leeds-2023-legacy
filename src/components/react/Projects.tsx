import { useDebounce } from '@/lib/hooks/useDebounce';
import type { ProjectsStoryblok } from '@/lib/storyblok/types';
import type { Project as ProjectType, ProjectsApiResponse } from '@/pages/projects/data.json';
import Project from './Project';
import { useEffect, useState } from 'react';
import { Input } from './ui/Input';
import Fuse from 'fuse.js';
type ProjectsProps = {
	initialProjectData: ProjectsApiResponse;
	blok: ProjectsStoryblok;
};

export default function Projects({ initialProjectData, blok }: ProjectsProps) {
	const stages = {
		all: {
			text: 'All',
			link: '/projects',
		},
		awakening: {
			text: 'Awakening',
			link: '/projects/awakening',
		},
		playing: {
			text: 'Playing',
			link: '/projects/playing',
		},
		dreaming: {
			text: 'Dreaming',
			link: '/projects/dreaming',
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

	return (
		<div className="py-[5rem]">
			<div className="mb-12 bg-white py-6">
				<div className="mx-auto px-4 lg:max-w-[950px] lg:px-2 xl:max-w-[1150px] 2xl:max-w-[1250px] 3xl:max-w-[1350px] 4xl:max-w-[1500px]">
					<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
						<h2 className="w-full font-display text-2xl lg:w-5/12">Programme</h2>
						<div className="flex w-full flex-col justify-end gap-6 lg:w-7/12 lg:flex-row lg:items-center">
							<div className="text-display flex gap-4 text-base">
								{(Object.keys(stages) as (keyof typeof stages)[]).map((stage, index) => (
									<a key={index} href={stages[stage].link}>
										{stages[stage].text}
									</a>
								))}
							</div>
							<Input
								placeholder="Search"
								className="w-full focus-visible:ring-brandDarkGreen-100 focus-visible:ring-opacity-50"
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="mx-auto px-4 lg:max-w-[950px] lg:px-2 xl:max-w-[1150px] 2xl:max-w-[1250px] 3xl:max-w-[1350px] 4xl:max-w-[1500px]">
				<div className="flex flex-col gap-10">
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
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
						{results.map((project) => (
							<Project key={project.uuid} project={project} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
