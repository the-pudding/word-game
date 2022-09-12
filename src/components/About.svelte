<script>
	import { overlay } from "$stores/misc.js";
	import { getContext } from "svelte";
	import focusTrap from "$actions/focusTrap.js";
	const { info, byline, source, other } = getContext("copy");

	const close = () => {
		$overlay = undefined;
	};
	$: disable = $overlay !== "about";
</script>

<section class:visible={$overlay === "about"} use:focusTrap={{ disable }}>
	<div>
		<h3><span class="chunk combo-user">about the game</span></h3>
		<p>
			<button
				class="rules combo-mark"
				on:click={() => {
					$overlay = "rules";
				}}>read the rules</button
			>
		</p>
		<p>
			{@html info}
		</p>
		<p>
			{@html byline}
		</p>
		<p>
			{@html source}
		</p>

		<p>
			{@html other}
		</p>
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
	}

	button.rules {
		background-color: var(--color-mark-bg);
		color: var(--color-mark-fg);
	}

	button.close {
		font-size: var(--32px);
	}
</style>
