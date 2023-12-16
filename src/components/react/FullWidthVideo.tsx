import type { FullWidthVideoStoryblok } from '@/lib/storyblok/types';
import { useState } from 'react';
import type { YouTubeProps, YouTubePlayer } from 'react-youtube';
import { Image } from '@unpic/react';
import YouTube from 'react-youtube';

type Props = {
	blok: FullWidthVideoStoryblok;
};

let videoElement: YouTubePlayer | null = null;

export default function FullWidthVideo({ blok }: Props) {
	const [active, setIsActive] = useState(false);

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
			modestbranding: 1,
			rel: 0,
		},
	};

	return (
		<>
			{active ? (
				<div className="overflow-hidden">
					<YouTube
						videoId="LXb3EKWsInQ"
						opts={opts}
						iframeClassName={'w-full h-full absolute top-0 left-0'}
						onReady={onPlayerReady}
						className={'relative mb-[50px] h-[0] w-full overflow-hidden pb-[56.25%]'}
					/>
				</div>
			) : (
				<div className={'m-h-[20rem] relative h-[65vh] w-full'}>
					<Image
						src={blok.coverImage.filename}
						alt={blok.coverImage.alt}
						layout="fullWidth"
						className="absolute left-0 top-0 h-full w-full"
					/>
					<button
						onClick={() => setIsActive(true)}
						className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-4 rounded-md  px-4 py-2 text-white"
					>
						<div className="flex h-20 w-20 items-center justify-center rounded-full bg-brandMagenta-100 pl-[5px]">
							<svg
								width="32"
								height="32"
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
						<span className="text-2xl">Play Video</span>
					</button>
				</div>
			)}
		</>
	);
}
