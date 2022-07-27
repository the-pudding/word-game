<script>
	import List from "$components/Play.Guesses.List.svelte";
	import Score from "$components/Play.Guesses.Score.svelte";
	import { guesses, round, wod, wodInfo, totalScore } from "$stores/misc.js";
	import mq from "$stores/mq.js";
	const takenCode = 0;
	const displayFilter = (d) => d.reason === undefined || d.reason === takenCode;
	const threshold = 0.75;

	let containerHeight = 0;
	let liHeight = 0;

	$: userGuesses = [].concat(...$guesses.user).filter(displayFilter);
	$: wodGuesses = [].concat(...$guesses.wod).filter(displayFilter);
	$: ulHeight = $totalScore.user * liHeight;
	$: thresholdHeight = containerHeight * threshold;
	$: distPastThreshold = ulHeight - thresholdHeight;
	$: startOffset =
		(containerHeight - thresholdHeight + Math.min(0, distPastThreshold) * -1) *
		-1;
	$: offsetY = `${Math.max(0, distPastThreshold)}px`;
	$: liHeight = $mq["40rem"] ? 28 : 20;
</script>

<div id="play-guesses" bind:clientHeight={containerHeight}>
	<Score name="you" points={0} />
	<List guesses={userGuesses} --offsetY={offsetY} {liHeight} {startOffset} />
	{#if !$wod}
		<List guesses={wodGuesses} --offsetY={offsetY} wod={true} {liHeight} />
		<Score name={$wodInfo.name} points={0} />
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
