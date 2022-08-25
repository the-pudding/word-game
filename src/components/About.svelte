<script>
	import { overlay } from "$stores/misc.js";
	import { getContext } from "svelte";

	const { byline, source, other } = getContext("copy");

	const close = () => {
		$overlay = undefined;
	};
</script>

<section on:click={close} class:visible={$overlay === "about"}>
	<div>
		<h3><span class="chunk combo-user">about the game</span></h3>
		<p>
			{@html byline}
		</p>
		<p>
			{@html source}
		</p>

		<p>
			{@html other}
		</p>
		<p class="close"><button on:click={close}>close</button></p>
	</div>
</section>

<style>
	section {
		display: none;
		z-index: var(--z-overlay);
		background: var(--color-bg);
		padding: 0 8px;
		overflow-y: auto;
	}

	.visible {
		display: block;
	}

	h3 {
		margin: 16px auto;
		transform: rotate(-2deg);
	}

	.chunk {
		padding: 0 4px;
	}

	p {
		margin: 16px auto;
		line-height: 1.4;
	}

	p.close {
		border-top: 1px solid currentColor;
		padding-top: 16px;
	}

	button {
		font-size: var(--32px);
	}
</style>
