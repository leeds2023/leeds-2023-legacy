import { parseStoryblokLink } from '@/lib/storyblok/helpers';
import type { Link } from '@/lib/storyblok/types';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

export default function Button({
	sbLink,
	linkText,
	color,
	style = 'filled',
	className,
}: {
	sbLink: Link;
	linkText: string;
	color: 'white' | 'darkGreen';
	style?: 'outline' | 'filled';
	className?: string;
}) {
	const button = cva(
		'button flex gap-2 justify-center items-center text-center font-display font-semibold text-white focus:ring-opacity-50 px-4 py-2 transition-colors duration-300 ease-in-out',
		{
			variants: {
				color: {
					white:
						'bg-white hover:bg-gray-200 hover:text-opacity-80 border-2 border-white hover:border-bg-gray-200 focus:ring-2 focus:ring-white',
					darkGreen:
						'bg-brandDarkGreen-100 hover:bg-brandDarkGreen-80 text-white border-2 border-brandDarkGreen-100 hover:border-brandDarkGreen-80 focus:ring-2 focus:ring-brandDarkGreen-80',
				},
				style: {
					filled: '',
					outline: 'bg-transparent hover:bg-transparent text-darkText-10 hover:text-opacity-80',
				},
			},
			defaultVariants: {
				color: 'white',
				style: 'filled',
			},
		}
	);

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
				button({
					color,
					style,
				}),
				className
			)}
			href={link}
			{...htmlAttributes}
		>
			{linkText}
			{isExternal && (
				<svg
					aria-labelledby={sbLink.id}
					width="25"
					height="24"
					viewBox="0 0 25 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13.1184 5.40606L13.0584 5.38419L13.0133 5.42929L11.7817 6.66098L11.6724 6.77027L11.8168 6.82517C12.9199 7.24432 14.5699 7.41418 15.9295 7.30054L11.5075 11.7229L11.4368 11.7936L11.5075 11.8643L12.5417 12.8985L12.6124 12.9692L12.6831 12.8985L17.1192 8.46191C17.0188 9.81642 17.2187 11.4942 17.6271 12.543L17.6827 12.6857L17.791 12.5774L18.9763 11.3922L19.0211 11.3474L18.9997 11.2877C18.4616 9.788 18.4015 8.05271 18.8181 5.69168L18.8431 5.55009L18.7017 5.57593C16.2948 6.01564 14.5598 5.93232 13.1184 5.40606Z"
						fill="currentColor"
						stroke="currentColor"
						strokeWidth="0.2"
					/>
					<path d="M9.35085 7.5H6.07812V17.5H18.0781V15" stroke="currentColor" strokeWidth="2" />
				</svg>
			)}
		</a>
	);
}
