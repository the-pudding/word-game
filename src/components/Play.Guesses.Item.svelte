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
		/* outline: 2px solid var(--color-user-border); */
		transform: translateY(-2px);
		margin-top: -2px;
		/* border: 2px solid var(--color-user-border); */
		/* outline: 2px solid var(--color-user-border); */
		box-shadow: 0 0 0 2px var(--color-user-border);
		border-bottom: none;
		align-items: center;
		flex-shrink: 0;
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
