<script>
	import { overlay } from "$stores/misc.js";

	const close = () => {
		$overlay = undefined;
	};
</script>

<section class:visible={$overlay === "rules"}>
	<div>
		<h3><span class="chunk combo-user">how to play</span></h3>
		<ul>
			<li>
				<h4><span class="chunk combo-wod">goal</span></h4>
				score more points than the stranger in four, one-minute rounds.
			</li>
			<li>
				<h4><span class="chunk combo-wod">gameplay</span></h4>
				enter as many words as possible that satisfy a clue.
				<details>
					<summary>more details</summary>
					<ul class="inner">
						<li>
							<h5>sample clue</h5>
							:
							<em class="clue"
								>starts with <h5>A</h5></em
							>
							answers: <em>apple</em>, <em>awesome</em>, <em>activate</em>, etc.
						</li>
						<li>
							<h5>blocking</h5>
							whoever gets a word first gets points. If the stranger enters the word
							before you, you get no points, and vice versa.
						</li>
						<li>
							<h5>obscure = more points</h5>
							you get more points for less commonly used words.
						</li>
					</ul>
				</details>
			</li>
			<li>
				<h4><span class="chunk combo-wod">other rules</span></h4>
				no proper nouns, hyphenated words, or varations (e.g., plurals) of a played
				word.
			</li>
		</ul>
		<p><button on:click={close}>CLOSE</button></p>
	</div>
</section>

<style>
	section {
		display: none;
		z-index: var(--z-overlay);
		background: var(--color-bg);
		padding: 0 8px;
	}

	.visible {
		display: block;
	}

	h3 {
		margin: 16px auto;
	}

	h4 {
		margin: 8px 0;
	}

	.chunk {
		padding: 0 4px;
	}

	.clue {
		background-color: var(--color-white);
		border: 2px solid currentColor;
		padding: 0 8px;
	}

	ul {
		padding: 0;
	}

	ul.inner {
		padding-left: 16px;
	}

	li {
		line-height: 1.4;
		list-style: none;
	}

	p {
		margin-top: 32px;
		padding-top: 16px;
		line-height: 1.4;
		border-top: 1px solid currentColor;
	}

	button {
		font-size: var(--32px);
	}

	section {
		overflow-y: auto;
	}
</style>
