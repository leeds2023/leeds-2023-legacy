import { useState } from 'react';

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
					<button onClick={() => setIsTruncated(false)}>Read More</button>
				</div>
			) : (
				<div>
					<div dangerouslySetInnerHTML={{ __html: content }} />
					<button onClick={() => setIsTruncated(true)}>Read Less</button>
				</div>
			)}
		</div>
	);
}
