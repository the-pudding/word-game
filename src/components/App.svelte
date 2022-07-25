<script>
	import Game from "$components/Game.svelte";
	import Rules from "$components/Rules.svelte";
	import About from "$components/About.svelte";
</script>

<article>
	<Game />
	<Rules />
	<About />
</article>

<style>
	article {
		position: relative;
		flex-grow: 1;
	}
</style>
