import type { RichtextStoryblok } from '@/lib/storyblok/types';
import { Dialog, DialogContent, DialogTrigger } from './ui/Dialog';
import { ScrollArea } from './ui/ScrollArea';
import { renderRichText, storyblokInit } from '@storyblok/react';

type Props = {
	modalContent: RichtextStoryblok;
	modalBtnText?: string;
};

export default function ModalButton({ modalBtnText = 'Read more', modalContent }: Props) {
	storyblokInit({
		accessToken: import.meta.env.STORYBLOK_TOKEN,
	});
	return (
		<Dialog>
			<DialogTrigger className="w-full rounded-sm border border-brandDarkGreen-100 py-1.5 font-display text-sm text-brandDarkGreen-100 hover:border-brandDarkGreen-80 focus:ring-2 focus:ring-brandDarkGreen-40">
				{modalBtnText}
			</DialogTrigger>
			<DialogContent className="w-[50rem] max-w-[90vw] overflow-hidden rounded-md border-0 bg-white px-0 pt-0">
				<ScrollArea type="always">
					<div className="max-h-[70vh] tall:max-h-[80vh]">
						<div
							className="prose max-w-full p-8"
							dangerouslySetInnerHTML={{
								__html: renderRichText(modalContent),
							}}
						/>
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
