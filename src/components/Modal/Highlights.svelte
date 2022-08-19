<script>
	import { format, shuffle } from "d3";
	import {
		possibleAnswers,
		guesses,
		round,
		lemmasPlayed,
		wod,
		wodInfo
	} from "$stores/misc.js";
	import Possible from "$components/Chunk/Possible.svelte";
	import WodWordsInfo from "$components/Chunk/WodWordsInfo.svelte";
	import WodWordsList from "$components/Chunk/WodWordsList.svelte";
	import CommonWordsInfo from "$components/Chunk/CommonWordsInfo.svelte";
	import CommonWordsList from "$components/Chunk/CommonWordsList.svelte";

	$: count = format(",")($possibleAnswers.length);
	$: wodWords = $guesses.wod[$round]
		.filter((d) => d.valid && !d.guessedByUserLate)
		.slice(0, 5)
		.map((d) => d.text)
		.join(" ");
	$: commonWords = $possibleAnswers
		.filter((d) => +d.points === 1)
		.filter((d) => !$lemmasPlayed.includes((d) => d.text))
		.slice(0, 5)
		.map((d) => d.word)
		.join(" ");

	$: commonText = $wod ? "you didn't get" : "nobody got";
</script>

<Possible
	text="in round {$round +
		1} there were <em>{count}</em> possible words that satisfied the clue."
/>
<div class="words-wrapper">
	{#if wodWords.length}
		<div class="words wod-words">
			<WodWordsInfo
				lines={["some words", `${$wodInfo.name} got`, "that you didn't"]}
			/>
			<WodWordsList text={wodWords} />
		</div>
	{/if}

	<div class="words common-words">
		<CommonWordsInfo lines={["common", "words that", `${commonText}`]} />
		<CommonWordsList text={commonWords} />
	</div>
</div>

<style>
	.words-wrapper {
		width: 300px;
		margin: 16px auto;
		display: flex;
		justify-content: space-evenly;
	}

	.words {
		width: 50%;
		padding: 0 16px;
	}
</style>
