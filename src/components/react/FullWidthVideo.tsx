/* eslint-disable @typescript-eslint/no-floating-promises */
import type { FullWidthVideoStoryblok } from '@/lib/storyblok/types';
import { useState } from 'react';
import type { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { Image } from '@unpic/react';
import YouTube from 'react-youtube';
import { cn } from '@/lib/utils';
import { extractDimensions } from '@/lib/storyblok/helpers';

type Props = {
	blok: FullWidthVideoStoryblok;
	isModal?: boolean;
	blurhashCss?: string;
};

let videoElement: YouTubePlayer | null = null;

export default function FullWidthVideo({ blok, isModal, blurhashCss }: Props) {
	const [active, setIsActive] = useState(false);
	const dimensions = extractDimensions(blok.coverImage.filename, 1000, 'width');

	const onPlayerReady: YouTubeProps['onReady'] = (event) => {
		videoElement = event.target;
		videoElement.playVideo();
	};

	const opts: YouTubeProps['opts'] = {
		height: '100%',
		width: '100%',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
			controls: 0,
			rel: 0,
		},
	};

	return (
		<>
			{active ? (
				<div className=" relative overflow-hidden">
					<YouTube
						videoId="LXb3EKWsInQ"
						opts={opts}
						iframeClassName={'w-full h-full absolute top-0 left-0'}
						onReady={onPlayerReady}
						className={'relative h-[0] w-full overflow-hidden pb-[56.25%]'}
					></YouTube>
					<div>
						<button
							className="absolute right-0 top-1/2 z-10 flex h-20 w-20 -translate-y-1/2 transform flex-col items-center gap-4 bg-brandMagenta-100 px-4 py-2 text-white hover:bg-brandMagenta-80"
							onClick={() => {
								videoElement?.pauseVideo();
								setIsActive(false);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="100%"
								height="100%"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M18 6 6 18"></path>
								<path d="m6 6 12 12"></path>
							</svg>
						</button>
					</div>
				</div>
			) : (
				<div
					className={cn(
						'm-h-[20rem] relative h-[40vh] w-full sm:h-[80vh]',
						isModal && 'h-32 min-h-0 mediumHeight:h-64 tall:h-96'
					)}
				>
					{dimensions ? (
						<Image
							src={blok.coverImage.filename}
							className="absolute left-0 top-0 h-full !max-h-none w-full !max-w-none object-cover"
							alt={blok.coverImage.alt ? blok.coverImage.alt : ''}
							background={blurhashCss ? blurhashCss : 'auto'}
							width={dimensions.width}
							height={dimensions.height}
						/>
					) : (
						<Image
							src={blok.coverImage.filename}
							className="absolute left-0 top-0 h-full !max-h-none w-full !max-w-none object-cover"
							alt={blok.coverImage.alt ? blok.coverImage.alt : ''}
							background={blurhashCss ? blurhashCss : 'auto'}
							layout="fullWidth"
						/>
					)}
					<button
						onClick={() => setIsActive(true)}
						className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-4 rounded-md  px-4 py-2 text-white"
					>
						<div className="flex h-16 w-16 items-center justify-center rounded-full bg-brandMagenta-100 pl-[5px] hover:bg-brandMagenta-80">
							<svg
								width="25"
								height="25"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M5 4.98963C5 4.01847 5 3.53289 5.20249 3.26522C5.37889 3.03203 5.64852 2.88773 5.9404 2.8703C6.27544 2.8503 6.67946 3.11965 7.48752 3.65835L18.0031 10.6687C18.6708 11.1139 19.0046 11.3364 19.1209 11.6169C19.2227 11.8622 19.2227 12.1378 19.1209 12.3831C19.0046 12.6636 18.6708 12.8862 18.0031 13.3313L7.48752 20.3417C6.67946 20.8804 6.27544 21.1497 5.9404 21.1297C5.64852 21.1123 5.37889 20.968 5.20249 20.7348C5 20.4671 5 19.9815 5 19.0104V4.98963Z"
									stroke="white"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<span className="text-xl">Play video</span>
					</button>
				</div>
			)}
		</>
	);
}
