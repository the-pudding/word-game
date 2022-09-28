<script>
	import { active } from "$stores/misc.js";
	import Item from "$components/play/Guesses.Item.svelte";
	export let guesses;
	export let wod = false;
	export let liHeight;
	export let startOffset = 0;
	export let review;
</script>

<ul class:wod class:active={$active} class:review>
	{#each guesses as { text, points, round } (`${round}-${text}`)}
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
