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
	$: className = wod ? "combo-wod" : "combo-user";
</script>

<li
	in:fly={{ y: startOffset, duration: 1000, easing: quartIn }}
	class:wod
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
		padding: 0 4px;
		font-size: var(--16px);
		border: 2px solid var(--color-user-border);
		transform: translateY(-2px);
		margin-bottom: -2px;
		align-items: center;
	}

	li.wod {
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
