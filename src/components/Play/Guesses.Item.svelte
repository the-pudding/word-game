<script>
	import { tweened } from "svelte/motion";
	import { fly } from "svelte/transition";
	import { quartIn } from "svelte/easing";
	import { wordDuration } from "$stores/misc.js";

	export let wod;
	export let text;
	export let points;
	export let liHeight;
	export let startOffset;
	export let review;

	const timer = tweened(0, { duration: $wordDuration });

	let timerVisible = true;
	timer.set(1).then(() => {
		timerVisible = false;
	});

	$: height = points * liHeight;
	$: className = wod ? "combo-wod" : "combo-user";
</script>

<li
	in:fly={{
		y: startOffset,
		duration: $wordDuration * (wod ? 0.5 : 1),
		easing: quartIn
	}}
	class:wod
	class:review
	class={className}
	style={`--height: ${height}px`}
>
	<span>{text}</span>
</li>

<style>
	li {
		list-style-type: none;
		text-align: center;
		display: inline-flex;
		position: relative;
		height: var(--height);
		line-height: 1;
		padding: 0 6px;
		font-size: var(--16px);
		margin-top: -2px;
		border: 2px solid var(--color-user-border);
		align-items: center;
		flex-shrink: 0;
	}

	li.wod {
		border: 2px solid var(--color-wod-border);
	}

	span {
		display: inline-block;
	}

	.wod span {
		visibility: hidden;
	}

	.wod.review span {
		visibility: visible;
	}

	@media screen and (min-width: 640px) and (min-height: 720px) {
		li {
			font-size: var(--20px);
			padding: 0 10px;
		}
	}

	@media screen and (min-width: 960px) and (min-height: 800px) {
		li {
			font-size: var(--24px);
			padding: 0 16px;
		}
	}
</style>
