<script>
	export let clue;

	$: chunks = clue.split("|");
</script>

<div id="play-clue">
	<ul>
		{#each chunks as chunk, i}
			<!-- {@const suffix = i < chunks.length - 1 ? " +" : ""} -->
			<li>{chunk}</li>
		{/each}
	</ul>
</div>

<style>
	div {
		padding: 8px;
		background: var(--color-bg-binary);
		border: 1px solid var(--color-fg);
	}
	ul {
		display: flex;
		justify-content: center;
		padding: 0;
	}

	li {
		margin: 0;
		list-style-type: none;
		margin-right: 8px;
		background: var(--color-bg-binary);
		padding: 4px;
		line-height: 1;
		border: 1px solid var(--color-fg);
	}
</style>
