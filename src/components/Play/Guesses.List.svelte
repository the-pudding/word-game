<script>
	import { active } from "$stores/misc.js";
	import Item from "$components/Play/Guesses.Item.svelte";
	export let guesses;
	export let wod = false;
	export let liHeight;
	export let startOffset = 0;
	export let review;
</script>

<ul class:wod class:active={$active} class:review>
	{#each guesses as { valid, text, points } (text)}
		<Item {wod} {text} {points} {liHeight} {startOffset} {review} />
	{/each}
</ul>

<style>
	ul {
		width: calc(50%);
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-start;
		align-items: flex-start;
		transition: transform 0.5s ease-out, opacity 0.2s;
		transform: translate(0, var(--offsetY));
		padding: 0;
		opacity: 0.2;
	}

	.active {
		opacity: 1;
	}

	.review {
		opacity: 1;
	}

	.wod {
		align-items: flex-end;
	}
</style>
