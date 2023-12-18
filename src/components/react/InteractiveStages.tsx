import type { InteractiveStageStoryblok, InteractiveStagesStoryblok } from '@/lib/storyblok/types';
import { cn, formatWithCommas } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { cva } from 'class-variance-authority';
import Button from '@/components/react/ui/Button';
import OtherLink from '@/components/react/ui/OtherLink';

type Props = {
	blok: InteractiveStagesStoryblok;
};

const stages = {
	awakening: 'Awakening',
	playing: 'Playing',
	dreaming: 'Dreaming',
} as const;

type Stage = (typeof stages)[keyof typeof stages];

export default function InteractiveStages({ blok }: Props) {
	const [stage, setStage] = useState<Stage>('Awakening');
	const [stageData, setStageData] = useState(blok.stages[0]);
	const [step, setStep] = useState(0);

	useEffect(() => {
		const currentStageData = blok.stages.find(
			(item) => item.stageName === stage
		) as InteractiveStageStoryblok;
		setStageData(currentStageData);
	}, [stage]);

	const stageStyles = cva('text-white relative h-[970px] lg:h-[760px] flex flex-col lg:flex-row', {
		variants: {
			bgColor: {
				pink: 'bg-[#EE3796]',
				mint: 'bg-brandTeal-100',
				rose: 'bg-brandRose-100 text-darkText-30',
			},
		},
		defaultVariants: {
			bgColor: 'pink',
		},
	});

	function handleIncreaseStep() {
		if (step < 2) {
			setStep(step + 1);
		} else {
			setStep(0);
		}
	}

	function handleDecreaseStep() {
		if (step > 0) {
			setStep(step - 1);
		} else {
			setStep(2);
		}
	}

	return (
		<div
			className={cn(
				stage === 'Awakening' && stageStyles({ bgColor: 'pink' }),
				stage === 'Playing' && stageStyles({ bgColor: 'mint' }),
				stage === 'Dreaming' && stageStyles({ bgColor: 'rose' })
			)}
		>
			<div
				className={cn(
					'relative z-10 border-b-2 border-opacity-60 lg:border-b-0 lg:border-r-2',
					stage === 'Dreaming' ? 'border-darkText-30' : ' border-white'
				)}
			>
				<div className="flex h-full w-full flex-row-reverse items-center justify-center gap-3 py-4 sm:gap-6 lg:w-24 lg:flex-col-reverse lg:gap-[4.5rem] lg:py-0 ">
					{blok.stages.map((item) => (
						<button
							className={cn(
								'w-fit border-2 border-opacity-100 px-4 py-2 font-display text-sm font-medium sm:text-base lg:origin-center lg:-rotate-90 lg:transform',
								stageData.stageName === 'Dreaming'
									? item.stageName === stageData.stageName
										? 'border-darkText-30 bg-darkText-30 text-white'
										: 'border-darkText-30 bg-transparent text-darkText-30'
									: item.stageName === stageData.stageName
									? 'border-white bg-white text-darkText-30'
									: 'border-white bg-transparent text-white'
							)}
							key={item._uid}
							onClick={() => {
								setStage(item.stageName);
								setStep(0);
							}}
						>
							{item.stageName}
						</button>
					))}
				</div>
			</div>

			<div className="relative flex h-full w-full flex-col overflow-hidden lg:flex-row">
				<div
					className={cn(
						'relative z-10 flex h-full w-full flex-col items-start justify-center gap-6 pl-8 pt-0 lg:w-7/12 lg:pl-20 lg:pt-0 2xl:w-1/2',
						step === 2 && 'w-full justify-start pt-16 lg:w-full lg:justify-center lg:pt-0',
						step === 2 && stageData.stats && stageData.stats.length > 2 && 'justify-center pt-0'
					)}
				>
					<div className="relative z-10 flex flex-col">
						<h3
							className={cn(
								'font-display text-lg uppercase md:text-2xl',
								step === 1 && 'text-sm md:text-lg',
								step === 2 && 'hidden'
							)}
						>
							{stageData.label}
						</h3>
						<h2
							className={cn(
								'pl-6 font-display text-5xl sm:text-7xl md:text-8xl lg:pl-12 lg:text-9xl',
								step === 1 && 'text-3xl md:text-4xl lg:text-5xl',
								step === 2 && 'hidden'
							)}
						>
							{stageData.stageName}
						</h2>
					</div>
					{step === 1 && (
						<div className="relative z-30 flex flex-col gap-6">
							<p className="max-w-[85vw] lg:max-w-xl">{stageData.blurb}</p>

							<div className="flex w-fit flex-col gap-4 lg:flex-row">
								{stageData.ctaLinkOne && stageData.ctaLinkTextOne && (
									<Button
										sbLink={stageData.ctaLinkOne}
										linkText={stageData.ctaLinkTextOne}
										color={stageData.stageName === 'Dreaming' ? 'darkGreen' : 'white'}
										className={
											stageData.stageName === 'Dreaming' ? 'text-white' : 'text-darkText-30'
										}
									/>
								)}
								{stageData.ctaLinkTwo && stageData.ctaLinkTextTwo && (
									<Button
										sbLink={stageData.ctaLinkTwo}
										linkText={stageData.ctaLinkTextTwo}
										color={stageData.stageName === 'Dreaming' ? 'darkGreen' : 'white'}
										style="outline"
										className={
											stageData.stageName === 'Dreaming' ? 'text-darkText-30' : 'text-white'
										}
									/>
								)}
							</div>

							{stageData.otherLinks && stageData.otherLinks.length > 0 && (
								<div className="flex flex-col gap-8 pt-4 xl:flex-row xl:items-center">
									<h4 className="font-display text-base uppercase lg:text-lg">Other links</h4>
									<div className="flex gap-4 lg:flex-row">
										{stageData.otherLinks.map((item) => (
											<OtherLink
												sbLink={item.link}
												linkText={item.linkText ? item.linkText : ''}
												icon={item.image ? item.image : null}
												key={item._uid}
												textColor={stageData.stageName === 'Dreaming' ? 'darkText' : 'white'}
											/>
										))}
									</div>
								</div>
							)}
						</div>
					)}

					{step === 2 && (
						<div className=" relative z-30 flex flex-col gap-4 lg:gap-8">
							<h2 className="font-display text-3xl lg:text-5xl">
								{stageData.stageName} in numbers
							</h2>
							{stageData.stats && stageData.stats.length > 0 && (
								<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
									{stageData.stats.map((item) => (
										<div key={item._uid} className="flex flex-col gap-2">
											<div className="flex gap-4">
												{item.icon && (
													<div className="flex h-10 w-10 items-center justify-center">
														<img src={item.icon.filename} alt="" />
													</div>
												)}
												<span
													aria-describedby={item._uid}
													className={cn(
														'font-display text-4xl font-semibold',
														stageData && stageData.stats && stageData.stats.length > 2
															? 'lg:text-4xl'
															: 'lg:text-6xl'
													)}
												>
													{formatWithCommas(item.statValue)}
												</span>
											</div>
											<h4 id={item._uid}>{item.subtext}</h4>
										</div>
									))}
								</div>
							)}
							<div className="flex w-fit flex-col gap-4 lg:flex-row">
								{stageData.ctaLinkThree && stageData.ctaLinkTextThree && (
									<Button
										sbLink={stageData.ctaLinkThree}
										linkText={stageData.ctaLinkTextThree}
										color={stageData.stageName === 'Dreaming' ? 'darkGreen' : 'white'}
										className={
											stageData.stageName === 'Dreaming' ? 'text-white' : 'text-darkText-30'
										}
									/>
								)}

								{stageData.ctaLinkFour && stageData.ctaLinkTextFour && (
									<Button
										sbLink={stageData.ctaLinkFour}
										linkText={stageData.ctaLinkTextFour}
										color={stageData.stageName === 'Dreaming' ? 'darkGreen' : 'white'}
										style="outline"
										className={
											stageData.stageName === 'Dreaming' ? 'text-darkText-30' : 'text-white'
										}
									/>
								)}
							</div>
						</div>
					)}

					<div className="absolute bottom-4 right-0 z-10 flex flex-col">
						<div className=" -mr-[4rem] inline-block w-[55rem] select-none opacity-5 sm:w-[80rem]  lg:-mr-[6rem] lg:w-[100rem] 2xl:-mr-[8rem] 2xl:w-[110rem]">
							<img src="/images/nowPlaying.svg" width="100%" height="100%" alt="" />
						</div>
					</div>
					<div
						className={cn(
							stage === 'Awakening' && stageStyles({ bgColor: 'pink' }),
							stage === 'Playing' && stageStyles({ bgColor: 'mint' }),
							stage === 'Dreaming' && stageStyles({ bgColor: 'rose' }),
							'absolute right-0 top-0 hidden h-full w-48 skew-x-12 lg:-mr-20 lg:block 2xl:-mr-24'
						)}
					></div>

					<div className="absolute right-6 top-6 z-20 flex items-center gap-4 lg:-right-24 lg:bottom-8 lg:top-auto">
						<button onClick={handleDecreaseStep}>
							<span className="sr-only" id="arrow-back">
								Go back
							</span>
							<div
								className={cn(
									'flex h-8 w-8 items-center justify-center rounded-full border-2  p-1 lg:h-10 lg:w-10 lg:p-2.5',
									stageData.stageName === 'Dreaming' ? 'border-darkText-30' : ' border-white'
								)}
							>
								<svg
									aria-labelledby="arrow-back"
									width="100%"
									height="100%"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M19 12H5M5 12L12 19M5 12L12 5"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</button>
						<div className="w-9 text-center">{step + 1} / 3</div>
						<button onClick={handleIncreaseStep}>
							<span className="sr-only" id="arrow-forward">
								Go forward
							</span>
							<div
								className={cn(
									'flex h-8 w-8 items-center justify-center rounded-full border-2  p-1 lg:h-10 lg:w-10 lg:p-2.5',
									stageData.stageName === 'Dreaming' ? 'border-darkText-30' : ' border-white'
								)}
							>
								<svg
									aria-labelledby="arrow-forward"
									width="100%"
									className="rotate-180 transform"
									height="100%"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M19 12H5M5 12L12 19M5 12L12 5"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</button>
					</div>
				</div>

				{step !== 2 && (
					<div className="relative h-72 w-full lg:h-full lg:w-5/12 2xl:w-1/2">
						<div className="h-full">
							<img
								src={
									step === 0
										? stageData.slideOneImage.filename
										: step === 1
										? stageData.slideTwoImage.filename
										: stageData.slideThreeImage.filename
								}
								alt={
									step === 0
										? stageData.slideOneImage.alt
										: step === 1
										? stageData.slideTwoImage.alt
										: stageData.slideThreeImage.alt
								}
								className="h-full w-full object-cover object-center"
							/>
						</div>
					</div>
				)}

				{step === 2 && (
					<div className="relative hidden h-72 w-full lg:h-full lg:w-5/12 xl:block 2xl:w-1/2">
						<div className="h-full">
							<img
								src={stageData.slideThreeImage.filename}
								alt={stageData.slideThreeImage.alt}
								className="h-full w-full object-cover object-center"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
