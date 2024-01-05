import { capitaliseFirstLetter, cn } from '@/lib/utils';
import type { Stage } from '../Project';

type TagsListProps = {
	stage: Stage;
	tags: string[];
	threshold?: number;
	disableThreshold?: boolean;
};

export default function TagsList({ tags, threshold = 2, disableThreshold }: TagsListProps) {
	const displayedTags = disableThreshold ? tags : tags.slice(0, threshold);

	return (
		<div className={cn('flex items-center gap-4', disableThreshold && '')}>
			<div
				className={cn('flex flex-wrap  gap-2 md:flex-nowrap', disableThreshold && 'md:flex-wrap')}
			>
				{displayedTags.map((tag, index) => (
					<div
						key={index}
						className={cn(
							'flex items-center justify-center rounded-full border-2 border-slate-200 px-3 py-1.5 font-display text-[11px] font-medium xl:text-[13px]'
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
