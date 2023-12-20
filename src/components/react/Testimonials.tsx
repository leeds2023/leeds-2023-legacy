import type { TestimonialsStoryblok } from '@/lib/storyblok/types';
import { renderRichText, storyblokInit } from '@storyblok/react';
import { useState } from 'react';

type TestimonialsProps = {
	blok: TestimonialsStoryblok;
};

export default function Testimonials({ blok }: TestimonialsProps) {
	const [slide, setSlide] = useState(0);
	storyblokInit({
		accessToken: import.meta.env.STORYBLOK_TOKEN,
	});

	function handleDecreaseSlide() {
		if (slide === 0) {
			setSlide(blok.item.length - 1);
			return;
		}
		setSlide(slide - 1);
	}

	function handleIncreaseSlide() {
		console.log('hi');
		if (slide === blok.item.length - 1) {
			setSlide(0);
			return;
		}
		setSlide(slide + 1);
	}

	console.log(blok.item);
	console.log(slide);

	return (
		<div className="mx-auto flex flex-col items-center justify-center gap-4 bg-brandMint-100 p-12 text-center text-darkText-30 lg:w-fit">
			<div className="flex flex-col gap-2">
				<h2 className="font-display text-2xl lg:text-3xl">{blok.item[slide].title}</h2>
				{blok.item[slide].subtitle && (
					<h3 className="font-display text-lg lg:text-xl">{blok.item[slide].subtitle}</h3>
				)}
			</div>
			<div
				className="prose"
				dangerouslySetInnerHTML={{
					__html: renderRichText(blok.item[slide].description),
				}}
			/>
			<div className="flex gap-5 pt-4">
				<button
					onClick={handleDecreaseSlide}
					className="flex items-center justify-center rounded-full border-2 border-darkText-30 p-3"
				>
					<span className="sr-only">Previous</span>
					<img src="images/icons/arrow.svg" alt="" />
				</button>
				<button
					onClick={handleIncreaseSlide}
					className="flex items-center justify-center rounded-full border-2 border-darkText-30 p-3"
				>
					<span className="sr-only">Next</span>
					<img src="images/icons/arrow.svg" alt="" className="rotate-180" />
				</button>
			</div>
		</div>
	);
}
