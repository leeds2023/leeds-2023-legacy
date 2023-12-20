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
					onClick={() => setPopoverOpen(true)}
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						aria-label="Tooltip"
						className="cursor-pointer"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g className="animate-pulseCoordinate">
							<rect
								x="0.307692"
								y="0.307692"
								width="15.3846"
								height="15.3846"
								rx="7.69231"
								stroke="#EE3796"
								strokeWidth="0.615385"
							/>
						</g>
						<circle cx="8.00008" cy="7.99983" r="4.30769" fill="#EE3796" />
					</svg>
				</Marker>
			</PopoverTrigger>
			<PopoverContent
				sideOffset={20}
				className="w-80 rounded-none border-2 border-[#EE3796] bg-white shadow"
			>
				<div className="flex flex-col gap-4">
					{blok.tooltipItems.map((item) => (
						<div key={item._uid} className="flex flex-col gap-3">
							<div className="flex flex-col gap-2">
								<div className="font-display text-2xl">{item.title}</div>
								<div className="text-base text-[#2A545C] opacity-80">{item.description}</div>
							</div>
							{item.link && item.linkText && (
								<Button
									sbLink={item.link}
									linkText={item.linkText}
									color={'primary'}
									style={'ghost'}
									className="justify-start pl-0 text-left"
								/>
							)}
						</div>
					))}
				</div>
			</PopoverContent>
		</Popover>
	);
}
