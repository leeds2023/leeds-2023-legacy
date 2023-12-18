import { capitaliseFirstLetter, cn } from '@/lib/utils';
import type { Stage } from '../Project';

type TagsListProps = {
	stage: Stage;
	tags: string[];
	threshold?: number;
	disableThreshold?: boolean;
};

export default function TagsList({ stage, tags, threshold = 2, disableThreshold }: TagsListProps) {
	const displayedTags = disableThreshold ? tags : tags.slice(0, threshold);

	console.log(stage, 'stage');

	return (
		<div className="flex items-center gap-2">
			<span
				className={cn(
					'h-6 w-6 flex-shrink-0 rounded-full',
					stage === 'awakening'
						? 'bg-[#EE3796]'
						: stage === 'playing'
						? 'bg-brandTeal-100'
						: 'bg-brandRose-100'
				)}
			/>
			<div className={cn('flex flex-wrap  gap-2 md:flex-nowrap')}>
				{displayedTags.map((tag, index) => (
					<div
						key={index}
						className={cn(
							'flex items-center justify-center rounded-full border-2 border-slate-200 px-3 py-1.5 font-display text-[13px] font-medium'
						)}
					>
						{capitaliseFirstLetter(tag.replace(/_/g, ' '))}
					</div>
				))}
				{!disableThreshold && threshold && tags.length > threshold && (
					<div className=" px-3 py-1.5 text-xs font-medium">+{tags.length - threshold} more</div>
				)}
			</div>
		</div>
	);
}
