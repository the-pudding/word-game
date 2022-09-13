<script>
	import { onMount } from "svelte";
	import Game from "$components/Game.svelte";
	import Rules from "$components/Rules.svelte";
	import About from "$components/About.svelte";

	let vh;

	const onResize = () => {
		vh = `${window.innerHeight * 0.01}px`;
	};

	onMount(() => {
		window.addEventListener("resize", onResize);
		onResize();
	});
</script>

<article style="--vh={vh};">
	<Game />
	<Rules />
	<About />
</article>

<style>
	article {
		position: relative;
		flex-grow: 1;
		margin: 0 4px;
	}
</style>
