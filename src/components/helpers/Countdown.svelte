<script>
	import { onMount } from "svelte";
	import { tweened } from "svelte/motion";
	import { fly } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	import { guessesHeight } from "$stores/misc.js";

	export let start = 5;
	export let text = "";

	let complete;

	const dispatch = createEventDispatcher();
	const end = text ? -1 : 0;
	const duration = start * 1000;
	const countdown = tweened(start, { duration });

	$: showingText = $countdown < 0;
	$: display = showingText ? text : Math.floor($countdown) + 1;
	$: if (showingText) dispatch("beforeend");

	$: height = `${$guessesHeight}px`;

	onMount(() => {
		complete = false;
		countdown.set(end).then(() => {
			complete = true;
			dispatch("end");
		});
	});
</script>

<div class="countdown">
	<div class="inner" style:height>
		{#key display}
			<p
				in:fly={{ duration: 250, y: 32 }}
				out:fly={{ duration: complete ? 0 : 250, y: -32 }}
			>
				{display}
			</p>
		{/key}
	</div>
</div>

<style>
	.countdown {
		background: red;
		position: relative;
	}

	.inner {
		position: absolute;
		top: 4px;
		left: 0;
		width: 100%;
	}

	p {
		font-size: var(--64px);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: var(--color, currentColor);
		line-height: 1;
		opacity: 0.75;
	}
</style>
