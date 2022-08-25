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

	const MAX_WORDS = 3;

	const lemmasNotInPlayed = ({ word, lemmas }) => {
		const match = !!lemmas.split("|").find((d) => $lemmasPlayed.includes(d));
		return !match;
	};

	$: count = format(",")($possibleAnswers.length);

	$: currentRoundWod = $guesses.wod[$round];

	$: wodWords = currentRoundWod
		.filter((d) => d.valid)
		.slice(0, MAX_WORDS)
		.map((d) => d.text)
		.join(" ");

	$: blockCount = currentRoundWod.filter((d) => !d.valid).length;

	$: allCommonWords = shuffle(
		$possibleAnswers.filter((d) => +d.points === 1).filter(lemmasNotInPlayed)
	);

	$: commonWords = allCommonWords
		.slice(0, MAX_WORDS)
		.map((d) => d.word)
		.join(" ");

	$: commonText = $wod ? "you didn't get:" : "nobody got";
	$: answersText = `there were <em>${count}</em> possible words.`;
	$: blockText =
		blockCount > 0 ? ` you blocked ${$wodInfo?.name} ${blockCount} times.` : "";
</script>

<Possible text="{answersText}{blockText}" />
<div class="words-wrapper">
	<div class="words common-words">
		<CommonWordsInfo lines={["common", "words that", `${commonText}`]} />
		<CommonWordsList text={commonWords} />
	</div>

	{#if wodWords.length}
		<div class="words wod-words">
			<WodWordsInfo
				lines={["some words", `${$wodInfo.name} got`, "that you didn't"]}
			/>
			<WodWordsList text={wodWords} />
		</div>
	{/if}
</div>

<style>
	.words-wrapper {
		/* width: 300px; */
		margin: 16px auto;
		display: flex;
		justify-content: space-evenly;
	}

	.words {
		width: 150px;
		padding: 0 16px;
	}
</style>
