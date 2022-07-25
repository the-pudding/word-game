<script>
	import { tweened } from "svelte/motion";
	import { fly } from "svelte/transition";
	import { quartIn } from "svelte/easing";

	export let wod;
	export let text;
	export let points;
	export let liHeight;
	export let startOffset;

	const timer = tweened(0, { duration: 1000 });

	let timerVisible = true;
	timer.set(1).then(() => {
		timerVisible = false;
	});

	$: height = points * liHeight;
</script>

<li
	in:fly={{ y: startOffset, duration: 1000, easing: quartIn }}
	class:wod
	style={`--height: ${height}px`}
>
	{text}
</li>

<style>
	li {
		color: var(--color-green);
		font-weight: bold;
		list-style-type: none;
		text-align: center;
		display: inline-flex;
		position: relative;
		height: var(--height);
		line-height: var(--height);
		border: 1px solid black;
	}

	li.wod {
		color: blue;
	}

	span {
		position: absolute;
		display: block;
		top: 0;
		right: 0;
		padding-left: 0.5rem;
		transform: translate(100%, 0);
	}
</style>
