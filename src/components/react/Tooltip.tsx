import { Popover, PopoverContent, PopoverTrigger } from '@/components/react/ui/Popover';
import { Marker } from 'react-simple-maps';
import { useRef, useState } from 'react';
import type { MapTooltipStoryblok } from '@/lib/storyblok/types';
import Button from './ui/Button';

type TooltipProps = {
	blok: MapTooltipStoryblok;
};

export default function Tooltip({ blok }: TooltipProps) {
	const [popoverOpen, setPopoverOpen] = useState(false);
	const popoverTriggerRef = useRef<HTMLButtonElement>(null);

	return (
		<Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
			<PopoverTrigger asChild ref={popoverTriggerRef}>
				<Marker
					coordinates={[parseFloat(blok.lon), parseFloat(blok.lat)]}
					style={{ default: { marginTop: '-200px' } }}
					onClick={() => setPopoverOpen(true)}
				>
					<svg
						width="10"
						height="10"
						viewBox="0 0 10 10"
						aria-label="Tooltip"
						className="cursor-pointer"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g className="animate-pulseCoordinate">
							<rect
								x="0.307692"
								y="0.307692"
								width="8"
								height="8"
								rx="7.69231"
								stroke="#EE3796"
								strokeWidth="0.615385"
							/>
						</g>
						<circle cx="4.5" cy="4.5" r="2" fill="#EE3796" />
					</svg>
				</Marker>
			</PopoverTrigger>
			<PopoverContent
				sideOffset={20}
				className="w-80 rounded-md border-2 border-[#EE3796] bg-white shadow-md"
			>
				<div className="flex flex-col gap-4">
					{blok.tooltipItems.map((item, index) => (
						<div key={item._uid} className="flex flex-col gap-3">
							<div className="flex flex-col gap-2">
								<div className="py-1.5 font-display text-xl">{item.title}</div>
								<div className="text-base text-[#2A545C] opacity-80">{item.description}</div>
							</div>
							{item.link && item.linkText && (
								<Button
									sbLink={item.link}
									linkText={item.linkText}
									color={'primary'}
									style={'ghost'}
									className="w-fit justify-start pl-0 text-left"
								/>
							)}
							{index !== blok.tooltipItems.length - 1 && <hr className="mt-1.5 border-slate-300" />}
						</div>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}
