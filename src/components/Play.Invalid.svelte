<script>
	import { guesses, round } from "$stores/misc.js";

	const duration = 2500;
	let timeout;
	let visible = false;
	let prevGuessCount = 0;

	const reasons = [
		"(or a variation) was played by opponent",
		"is too short",
		"contains non-letters",
		"is not in the word list",
		"was already entered"
	];

	$: recent = $guesses.user[$round][$guesses.user[$round].length - 1];
	$: if (recent && $guesses.user[$round].length !== prevGuessCount) update();
	$: if (!$guesses.user[$round].length) prevGuessCount = 0;

	const update = () => {
		prevGuessCount = $guesses.user[$round].length;
		clearTimeout(timeout);

		if (!recent.valid) {
			visible = true;
			timeout = setTimeout(() => (visible = false), duration);
		} else visible = false;
	};
</script>

<div id="play-invalid">
	{#if visible}
		<p>
			<strong>{recent.text}</strong>
			{reasons[recent.reason]}
		</p>
	{/if}
</div>

<style>
	div {
		width: 50%;
		position: relative;
		padding-top: 8px;
	}

	p {
		position: absolute;
	}
</style>
