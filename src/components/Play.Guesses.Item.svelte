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
	<span>{text}</span>
</li>

<style>
	li {
		font-weight: bold;
		list-style-type: none;
		text-align: center;
		display: inline-flex;
		position: relative;
		height: var(--height);
		line-height: 1;
		padding: 0 4px;
		font-size: var(--16px);
		color: var(--color-user-fg);
		background-color: var(--color-user-bg);
		border: 2px solid var(--color-user-border);
		transform: translateY(-2px);
		margin-bottom: -2px;
		align-items: center;
	}

	li.wod {
		color: var(--color-wod-bg);
		background-color: var(--color-wod-bg);
		border: 2px solid var(--color-wod-border);
	}

	span {
		display: inline-block;
	}

	@media screen and (min-width: 40rem) {
		li {
			font-size: var(--20px);
		}
	}
</style>
