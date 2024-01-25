import { parseStoryblokLink } from '@/lib/storyblok/helpers';
import type { Asset, Link } from '@/lib/storyblok/types';
import { cn } from '@/lib/utils';

export default function OtherLink({
	sbLink,
	linkText,
	textColor = 'white',
	icon,
}: {
	sbLink: Link;
	linkText: string;
	textColor?: 'white' | 'darkText';
	icon: Asset | null;
}) {
	const link = parseStoryblokLink(sbLink);
	const isExternal = link.startsWith('http');
	const htmlAttributes = isExternal
		? {
				target: '_blank',
				rel: 'noopener noreferrer',
				id: sbLink.id,
		  }
		: {
				id: sbLink.id,
		  };

	return (
		<a
			className={cn(
				'flex flex-col items-center gap-2 text-center font-display text-sm font-medium transition-colors duration-300 ease-in-out hover:text-opacity-70 focus:ring-opacity-50 lg:gap-4 lg:text-base',
				{
					'text-white': textColor === 'white',
					'text-darkText-10': textColor === 'darkText',
				}
			)}
			href={link}
			{...htmlAttributes}
		>
			{icon ? (
				<div className="rounded-full bg-white p-2">
					<img aria-labelledby={sbLink.id} src={icon.filename} alt="" className="h-6 w-6" />
				</div>
			) : (
				<div className="rounded-full bg-white p-2">
					<img
						aria-labelledby={sbLink.id}
						src={'/images/icons/arrow.svg'}
						alt=""
						className="h-6 w-6"
					/>
				</div>
			)}
			{linkText}
		</a>
	);
}
