<script>
	export let text = "";
	export let max = text.length;
	export let space = true;
	export let tag = "span";

	$: regex = new RegExp(`[\\s\\S]{1,${max}}(?!\\S)`, "g");
	$: chunks = text
		.replace(regex, "$&\n")
		.split("\n")
		.map((d) => d.trim())
		.filter((d) => d);
</script>

{#each chunks as chunk}
	<svelte:element this={tag} class="chunk">{@html chunk}</svelte:element>
{/each}

<style>
	.chunk {
		display: inline-block;
		color: var(--color, black);
		background: var(--background, white);
		border: var(--border, 1px solid black);
		padding: 0 var(--padding, 4px);
	}
</style>
