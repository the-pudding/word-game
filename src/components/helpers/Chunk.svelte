<script>
	import santaHat from "$svg/santa-hat.svg";

	export let text = "";
	export let max = text.length;
	export let space = false;
	export let tag = "span";
	export let className = "";
	export let wearsHat = false;

	$: regex = new RegExp(`[\\s\\S]{1,${max}}(?!\\S)`, "g");
	$: chunks = text
		.replace(regex, "$&\n")
		.split("\n")
		.map((d) => d.trim())
		.filter((d) => d)
		.map((d, i) => `${i > 0 && space ? "&nbsp;" : ""}${d}`);
	$: isChristmas = text === "#94";
</script>

{#each chunks as chunk}
	<svelte:element this={tag} class="chunk {className}"
		>{@html chunk}

		{#if wearsHat && isChristmas}
			<span class="hat">{@html santaHat}</span>
		{/if}
	</svelte:element>
{/each}

<style>
	.chunk {
		display: inline-block;
		position: relative;
		padding: 0.06em 0.12em 0.12em 0.12em;
		line-height: 1;
		white-space: nowrap;
	}
	.hat {
		position: absolute;
		top: 0;
		left: -3px;
		transform: translate(-50%, -50%);
		height: 40px;
		width: 40px;
	}
</style>
