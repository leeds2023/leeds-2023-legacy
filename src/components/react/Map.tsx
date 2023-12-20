/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { MapStoryblok } from '@/lib/storyblok/types';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import Tooltip from './Tooltip';

type MapProps = {
	blok: MapStoryblok;
};

export default function Map({ blok }: MapProps) {
	return (
		<div>
			<ComposableMap>
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
	);
}
