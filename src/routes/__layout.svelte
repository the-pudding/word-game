<script>
	import "$styles/app.css";
	import Header from "$components/Header.svelte";
	import { gameState } from "$stores/misc.js";

	$: showBanner = $gameState === "pre";
</script>

<main id="content">
	{#if showBanner}
		<div>
			🎥 <a href="https://youtu.be/LO72Mc4yS00" target="_blank"
				>watch the tournament of champions</a
			> live, thursday at 4pm est 🎥
		</div>
	{/if}

	<Header />
	<slot />
</main>

<style>
	div {
		background: var(--color-mark-bg);
		color: var(--color-mark-fg);
		margin-bottom: -4px;
		margin-left: 4px;
		margin-right: 4px;
		text-align: center;
		padding: 8px;
		transition: all 100ms ease-in;
	}

	a {
		padding: 0 6px;
		text-decoration: underline;
		border: none;
		line-height: 1.4;
	}
</style>
