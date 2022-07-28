<script>
	import copy from "$data/copy.json";
	import Menu from "$components/Menu.svelte";
	import wordmark from "$svg/wordmark.svg";
</script>

<header>
	<h1>{copy.title}</h1>
	<Menu />
	<!-- <div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding">{@html wordmark}</a>
	</div> -->
</header>

<style>
	header {
		background-color: var(--color-fg);
		position: relative;
		margin: 4px;
		padding: 4px;
	}

	h1 {
		color: var(--color-bg-binary);
		font-size: var(--18px);
		text-align: center;
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
