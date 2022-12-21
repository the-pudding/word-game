<script>
	import { browser } from "$app/env";
	import viewport from "$stores/viewport.js";
	import Game from "$components/Game.svelte";
	import Rules from "$components/Rules.svelte";
	import About from "$components/About.svelte";
	import Stats from "$components/Stats.svelte";
	import Archive from "$components/Archive.svelte";
	import { gameId, allGames } from "$stores/misc.js";

	$: vh = `${$viewport.height * 0.01}px`;
	$: if (browser) document.documentElement.style.setProperty("--vh", vh);
</script>

<article>
	<Game />
	<Rules />
	<About />

	{#if $allGames}
		<Stats />
		<Archive />
	{/if}
</article>

<style>
	article {
		position: relative;
		flex-grow: 1;
		margin: 0 4px;
	}
</style>
