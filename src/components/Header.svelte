<script>
	import Menu from "$components/Menu.svelte";
	import wordmark from "$svg/wordmark.svg";
</script>

<header>
	<Menu />
	<!-- <div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
	</div> -->
</header>

<style>
	header {
		background-color: var(--color-fg);
		position: relative;
	}

	/* .wordmark {
		max-width: 10em;
		margin: 0 auto;
		padding: 1em 0;
	}

	.wordmark a {
		border: none;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}

	:global(.wordmark svg path) {
		fill: currentColor;
	} */
</style>
