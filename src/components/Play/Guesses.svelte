<script>
	import List from "$components/Play/Guesses.List.svelte";
	import Score from "$components/Play/Guesses.Score.svelte";
	import { guesses, round, wod, wodInfo, totalScore } from "$stores/misc.js";
	import mq from "$stores/mq.js";
	const takenCode = 0;
	const displayFilter = (d) => d.reason === undefined;
	const threshold = 0.75;
	const borderH = 2;

	let containerHeight = 0;

	$: liHeight = $mq["40rem"] ? 32 : 24;

	$: userGuesses = [].concat(...$guesses.user).filter(displayFilter);
	$: wodGuesses = [].concat(...$guesses.wod).filter(displayFilter);

	$: borderOffset = userGuesses.length * borderH;
	$: borderOffsetWod = wodGuesses.length * borderH;

	$: ulHeight = $totalScore.user * liHeight - borderOffset; // total stack height
	$: ulHeightWod = $totalScore.wod * liHeight - borderOffsetWod; // total stack height
	$: ulHeightDiff = ulHeightWod - ulHeight;

	$: thresholdHeight = containerHeight * threshold;

	$: distAboveThreshold = ulHeight - thresholdHeight; // how far from our threshold we are (pos or neg)
	$: distAboveThresholdClamped = Math.max(0, distAboveThreshold);

	$: offsetY = `${distAboveThresholdClamped}px`;

	$: startOffset =
		(containerHeight - thresholdHeight + Math.min(0, distAboveThreshold) * -1) *
		-1;

	$: userScoreY = distAboveThresholdClamped > 0 ? thresholdHeight : ulHeight;
	$: wodScoreY = Math.min(
		containerHeight,
		Math.max(0, ulHeightDiff + userScoreY)
	);
	$: above = wodScoreY === containerHeight;
	$: userFlipName = userScoreY >= containerHeight / 2;
	$: wodFlipName = wodScoreY >= containerHeight / 2;
</script>

<div id="play-guesses" bind:clientHeight={containerHeight}>
	<Score
		name="you"
		points={$totalScore.user}
		y={userScoreY}
		flipName={userFlipName}
	/>
	<List guesses={userGuesses} --offsetY={offsetY} {liHeight} {startOffset} />
	{#if !$wod}
		<List guesses={wodGuesses} --offsetY={offsetY} wod={true} {liHeight} />
		<Score
			name={$wodInfo.name}
			points={$totalScore.wod}
			y={wodScoreY}
			{above}
			flipName={wodFlipName}
		/>
	{/if}
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		overflow: hidden;
		flex: 1;
	}
</style>
