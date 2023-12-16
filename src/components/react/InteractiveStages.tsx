import type { InteractiveStagesStoryblok } from '@/lib/storyblok/types';

type Props = {
	blok: InteractiveStagesStoryblok;
};

export default function InteractiveStages({ blok }: Props) {
	return <p>{JSON.stringify(blok.component)}</p>;
}
