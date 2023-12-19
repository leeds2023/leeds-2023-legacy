import type { StoriesStoryblok } from '@/lib/storyblok/types';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel-react';
import { useCallback } from 'react';
import Story from './Story';

type StoriesProps = {
	blok: StoriesStoryblok;
};

export default function Stories({ blok }: StoriesProps) {
	const OPTIONS: EmblaOptionsType = {
		slidesToScroll: 'auto',
		containScroll: 'trimSnaps',
	};

	const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	return (
		<div className="embla relative">
			<div className="embla__viewport" ref={emblaRef}>
				<div className="embla__container">
					{blok.stories.map((item) => (
						<div className="embla__slide" key={item._uid}>
							<Story blok={item} />
						</div>
					))}
				</div>
			</div>
			<div className="absolute -top-8 right-8 flex gap-4">
				<button
					className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-darkText-10"
					onClick={scrollPrev}
				>
					<img src="/images/icons/arrow.svg" className="" alt="Previous" />
				</button>
				<button
					className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-darkText-10"
					onClick={scrollNext}
				>
					<img src="/images/icons/arrow.svg" className="rotate-180" alt="Next" />
				</button>
			</div>
		</div>
	);
}
