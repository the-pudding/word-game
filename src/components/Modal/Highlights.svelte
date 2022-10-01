<script>
	import { format, shuffle } from "d3";
	import {
		possibleAnswers,
		guesses,
		round,
		lemmasPlayed,
		wod,
		wodInfo,
		inModal,
		active
	} from "$stores/misc.js";
	import Possible from "$components/chunk/Possible.svelte";
	import WodWordsInfo from "$components/chunk/WodWordsInfo.svelte";
	import WodWordsList from "$components/chunk/WodWordsList.svelte";
	import CommonWordsInfo from "$components/chunk/CommonWordsInfo.svelte";
	import CommonWordsList from "$components/chunk/CommonWordsList.svelte";

	let allCommonWords = [];
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

	$: commonWords = allCommonWords
		.slice(0, MAX_WORDS)
		.map((d) => d.word)
		.join(" ");

	$: if ($inModal && !$active)
		allCommonWords = shuffle(
			$possibleAnswers.filter((d) => +d.points === 1).filter(lemmasNotInPlayed)
		);
	$: commonText = $wod ? "you didn't get:" : "nobody got";
	$: answersText = `there were <em>${count}</em> possible words.`;
	$: suffix = blockCount === 1 ? "" : "s";
	$: blockText =
		blockCount > 0
			? `<br>you blocked ${$wodInfo?.name} ${blockCount} time${suffix}.`
			: "";
</script>

<Possible text="{answersText}{blockText}" />
<div class="words-wrapper">
	<div class="words common-words">
		<CommonWordsInfo lines={["common", "words that", `${commonText}`]} />
		<CommonWordsList text={commonWords} />
	</div>

	{#if wodWords.length}
		<div class="words wod-words">
			<WodWordsInfo lines={["some words", `${$wodInfo.name}`, "played"]} />
			<WodWordsList text={wodWords} />
		</div>
	{/if}
</div>

<style>
	.words-wrapper {
		margin: 16px auto;
		display: flex;
		justify-content: space-evenly;
	}

	.words {
		width: 9.375rem;
		padding: 0 16px;
	}

	@media (min-height: 720px) {
		.words-wrapper {
			margin: 32px auto 64px auto;
		}
	}
</style>
