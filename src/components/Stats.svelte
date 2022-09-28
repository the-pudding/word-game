<script>
	import { getContext } from "svelte";
	import { overlay } from "$stores/misc.js";
	import History from "$components/History.svelte";

	const close = () => {
		$overlay = undefined;
	};
	$: disable = $overlay !== "stats";
</script>

<section class:visible={$overlay === "stats"}>
	<div>
		<h3><span class="chunk combo-user">your stats</span></h3>
		<History />
		<p class="close"><button class="close" on:click={close}>close</button></p>
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
		text-align: center;
	}

	p:first-of-type {
		margin-top: 32px;
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
		text-align: center;
	}

	button.rules {
		background-color: var(--color-mark-bg);
		color: var(--color-mark-fg);
	}

	button.close {
		font-size: var(--32px);
	}

	:global(section div .stats p) {
		text-align: center;
	}
</style>
