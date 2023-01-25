<script>
	import "$styles/app.css";
	import Header from "$components/Header.svelte";
	import { gameState } from "$stores/misc.js";

	$: showBanner = $gameState === "pre";
</script>

<main id="content">
	{#if showBanner}
		<a href="https://youtu.be/LO72Mc4yS00" target="_blank"
			>🎥 watch the tournament of champions live 🎥</a
		>
	{/if}

	<Header />
	<slot />
</main>

<style>
	a {
		height: 4em;
		background: var(--color-mark-bg);
		color: var(--color-mark-fg);
		border: none;
		margin-bottom: -4px;
		margin-left: 4px;
		margin-right: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 0 1em;
		transition: all 100ms ease-in;
	}
	a:hover {
		background: var(--color-tan-200);
	}
</style>
