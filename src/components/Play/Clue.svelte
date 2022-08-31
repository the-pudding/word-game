<script>
	import { range } from "d3";
	import { fade } from "svelte/transition";
	import { inModal, active, guessesHeight, round } from "$stores/misc.js";

	export let clue;
	export let release;

	const margin = 8;
	const ghosts = range(3).map((d) => ({ small: null, large: null }));
	let widths;

	const updateMargin = () => {
		widths = ghosts.map(({ small, large }) => {
			if (!small) return;
			const diff =
				large.getBoundingClientRect().width -
				small.getBoundingClientRect().width;
			const newMargin = Math.floor(diff / 2 + margin);
			return newMargin;
		});
	};

	$: ghosts, updateMargin();
	$: chunks = clue.split("|");
	$: top = `--top: ${$guessesHeight / 2}px;`;
	$: console.log(widths);
</script>

<div id="play-clue" class:in-modal={$inModal} style={top}>
	{#if !release}
		<p out:fade={{ duration: 100 }}>
			<span class="chunk combo-user">round {$round + 1} clue</span>
		</p>
	{/if}
	<ul>
		{#each chunks as chunk, i}
			<li bind:this={ghosts[i].small} class:active={true} class="ghost">
				{@html chunk}
			</li>

			<li bind:this={ghosts[i].large} class:active={false} class="ghost">
				{@html chunk}
			</li>

			<li
				class:active={release}
				style:margin={`0 ${release ? margin : widths[i]}px`}
			>
				{@html chunk}
			</li>
		{/each}
	</ul>
</div>

<style>
	div {
		padding: 8px;
		background: var(--color-bg-binary);
		border: 1px solid var(--color-fg);
		position: relative;
		z-index: 1;
	}

	.ghost {
		position: absolute;
		visibility: hidden;
	}

	.in-modal {
		opacity: 0.1;
	}

	p {
		position: absolute;
		top: calc(var(--top) - 32px);
		left: 50%;
		transform: translate(-50%, 0);
	}

	p span {
		padding: 0 4px;
	}

	ul {
		display: flex;
		justify-content: center;
		padding: 0;
	}

	li {
		list-style-type: none;
		background: var(--color-bg-binary);
		padding: 4px;
		line-height: 1;
		border: 1px solid var(--color-fg);
		font-size: var(--16px);
		transform: translate(0, var(--top)) scale(1.5);
	}

	.active {
		transform: translate(0, 0) scale(1);
		transition: all 600ms ease-out;
	}

	:global(#play-clue li span) {
		font-weight: var(--bold);
		font-style: italic;
	}
</style>
