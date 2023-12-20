import { useState } from 'react';
import { cn } from '@/lib/utils';

type ReadMoreRichTextProps = {
	content: string;
	truncateChars?: number;
};

export default function ReadMoreRichText({ content, truncateChars = 140 }: ReadMoreRichTextProps) {
	const [isTruncated, setIsTruncated] = useState(true);

	return (
		<div>
			{isTruncated ? (
				<div>
					<div dangerouslySetInnerHTML={{ __html: content.substring(0, truncateChars) }} />
					<button
						className={cn(
							'border-2 border-brandDarkGreen-100 bg-brandDarkGreen-100 text-white hover:border-brandDarkGreen-80 hover:bg-brandDarkGreen-80 focus:ring-2 focus:ring-brandDarkGreen-80',
							'bg-transparent text-darkText-10 hover:bg-transparent hover:opacity-80',
							'w-full px-4 py-2 transition-colors duration-300 ease-in-out',
							'mt-8 flex items-center justify-center gap-2 rounded-sm'
						)}
						onClick={() => setIsTruncated(false)}
					>
						<span>Read More</span>
						<div className="h-6 w-6">
							<img src="/images/icons/chevron.svg" className="h-full w-full" alt="" />
						</div>
					</button>
				</div>
			) : (
				<div>
					<div dangerouslySetInnerHTML={{ __html: content }} />
					<button
						className={cn(
							'border-2 border-brandDarkGreen-100 bg-brandDarkGreen-100 text-white hover:border-brandDarkGreen-80 hover:bg-brandDarkGreen-80 focus:ring-2 focus:ring-brandDarkGreen-80',
							'bg-transparent text-darkText-10 hover:bg-transparent hover:opacity-80',
							'w-full px-4 py-2 transition-colors duration-300 ease-in-out',
							'mt-8 flex items-center justify-center gap-2 rounded-sm'
						)}
						onClick={() => setIsTruncated(true)}
					>
						<span>Read Less</span>
						<div className="h-6 w-6">
							<img src="/images/icons/chevron.svg" className="h-full w-full rotate-180" alt="" />
						</div>
					</button>
				</div>
			)}
		</div>
	);
}
