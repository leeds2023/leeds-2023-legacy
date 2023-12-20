/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { MapStoryblok } from '@/lib/storyblok/types';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import Tooltip from './Tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/Accordion';
import Button from './ui/Button';

type MapProps = {
	blok: MapStoryblok;
};

export default function Map({ blok }: MapProps) {
	return (
		<div>
			<div className="hidden lg:block">
				<ComposableMap
					projectionConfig={{
						center: [15, 12],
					}}
					width={800}
					height={450}
				>
					<Geographies geography="/map.json">
						{({ geographies }) =>
							geographies.map((geo) => (
								<Geography
									key={geo.rsmKey}
									geography={geo}
									fill="#B9CAAF"
									stroke="#DEF0C8"
									strokeWidth={0.5}
								/>
							))
						}
					</Geographies>
					{blok.items.map((item) => (
						<Tooltip key={item._uid} blok={item} />
					))}
				</ComposableMap>
			</div>
			<div className="grid grid-cols-1 gap-6 px-8 pt-12 lg:hidden">
				{blok.items.map((item) => (
					<Accordion
						key={item._uid}
						type="single"
						collapsible
						className="rounded-md border-[1.3px] border-[#EE3796] bg-white px-6 shadow-md"
					>
						<AccordionItem value="item-1">
							<AccordionTrigger className="font-display text-2xl">{item.name}</AccordionTrigger>
							<AccordionContent>
								{item.tooltipItems.map((tooltipItem, index) => (
									<div key={tooltipItem._uid} className="flex flex-col gap-3">
										<div className="flex flex-col gap-2">
											<div className="pb-1.5 pt-3  font-display text-xl">{tooltipItem.title}</div>
											<div className="text-base text-[#2A545C] opacity-80">
												{tooltipItem.description}
											</div>
										</div>
										{tooltipItem.link && tooltipItem.linkText && (
											<Button
												sbLink={tooltipItem.link}
												linkText={tooltipItem.linkText}
												color={'primary'}
												style={'ghost'}
												className="w-fit justify-start pl-0 text-left"
											/>
										)}
										{index !== item.tooltipItems.length - 1 && (
											<hr className="my-3 border-slate-300" />
										)}
									</div>
								))}
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				))}
			</div>
		</div>
	);
}
