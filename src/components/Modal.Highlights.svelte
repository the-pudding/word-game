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
	import Chunk from "$components/helpers/Chunk.svelte";

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

	$: commonText = $wod ? "you didn't get" : "neither of you got";
</script>

<p>
	<Chunk
		text="in round {$round +
			1} there were <em>{count}</em> possible words that satisfied the clue."
		className="combo-default"
		max="15"
	/>
</p>
{#if wodWords.length}
	<p>
		<Chunk
			text="some words that {$wodInfo.name} got that you didn't"
			max="15"
			className="combo-wod"
		/>
	</p>
	<p><Chunk text={wodWords} max="1" className="combo-default" /></p>
{/if}

<p>
	<Chunk
		text="some common words that {commonText}"
		max="15"
		className="combo-wod"
	/>
</p>
<p>
	<Chunk text={commonWords} max="1" className="combo-default" />
</p>

<style>
</style>
