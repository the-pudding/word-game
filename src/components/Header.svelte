<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { overlay } from "$stores/misc.js";
	import copy from "$data/copy.json";
	import wordmark from "$svg/wordmark.svg";
</script>

<header>
	<div class="about">
		<button
			on:click={() => {
				$overlay = "about";
			}}><Icon name="help-circle" /></button
		>
	</div>

	<h1>{copy.title}</h1>

	<p class="brand">
		a game from <a
			class="wordmark"
			href="https://pudding.cool"
			aria-label="The Pudding">{@html wordmark}</a
		>
	</p>
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

	.about {
		position: absolute;
		top: 50%;
		left: 8px;
		transform: translate(0, -50%);
	}

	.about button {
		padding: 0;
		line-height: 1;
		border: none;
		font-size: 24px;
		color: var(--color-bg-2);
	}

	.about button:hover {
		background: transparent;
		color: var(--color-bg);
	}

	:global(.about svg) {
		vertical-align: top;
	}

	.brand {
		color: var(--color-bg-2);
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: absolute;
		top: 2px;
		right: 16px;
	}

	a.wordmark {
		border: none;
		display: inline-block;
		color: currentColor;
		width: 6em;
		transform: translate(4px, 2px);
	}

	a.wordmark:hover {
		background-color: transparent;
	}

	:global(.wordmark svg path) {
		fill: currentColor;
	}
</style>
