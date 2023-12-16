import type { InteractiveStageStoryblok } from '@/lib/storyblok/types';

type Props = {
	blok: InteractiveStageStoryblok;
};

export default function InteractiveStage({ blok }: Props) {
	return <p>{JSON.stringify(blok.component)}</p>;
}
