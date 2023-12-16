import type { FullWidthVideoStoryblok } from '@/lib/storyblok/types';
import { useEffect, useState } from 'react';
import type { YouTubeProps, YouTubePlayer } from 'react-youtube';
import YouTube from 'react-youtube';

type Props = {
	blok: FullWidthVideoStoryblok;
};

let videoElement: YouTubePlayer | null = null;

export default function FullWidthVideo({ blok }: Props) {
	const [isPaused, setIsPaused] = useState(false);

	const togglePause = () => {
		setIsPaused(!isPaused);
	};

	useEffect(() => {
		if (videoElement) {
			if (isPaused) {
				videoElement.pauseVideo();
			} else {
				videoElement.playVideo();
			}
		}
	}, [isPaused, videoElement]);

	const onPlayerReady: YouTubeProps['onReady'] = (event) => {
		videoElement = event.target;
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
	console.log(blok);

	return (
		<div className="overflow-hidden">
			<YouTube
				videoId="LXb3EKWsInQ"
				opts={opts}
				iframeClassName={'w-full h-full absolute top-0 left-0'}
				onReady={onPlayerReady}
				className={'relative mb-[50px] h-[0] w-full overflow-hidden pb-[56.25%]'}
			/>
		</div>
	);
}
