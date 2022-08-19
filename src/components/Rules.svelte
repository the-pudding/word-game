<script>
	import { overlay } from "$stores/misc.js";

	const close = () => {
		$overlay = undefined;
	};
</script>

<section on:click={close} class:visible={$overlay === "rules"}>
	<div>
		<h3><span class="chunk combo-wod">how to play</span></h3>
		<ul>
			<li>
				<strong>goal:</strong> score more points than the stranger.
			</li>
			<li><strong>duration:</strong> four one-minute rounds.</li>
			<li>
				<strong>gameplay:</strong> enter as many words as possible that satisfy
				a clue.
				<ul>
					<li>
						<strong>sample clue</strong>:
						<em class="clue">starts with <strong>A</strong></em>
						answers: <em>apple</em>, <em>awesome</em>, <em>activate</em>, etc.
					</li>
					<li>
						<strong>blocking:</strong> whoever gets a word first gets points. If
						the stranger enters the word before you, you get no points, and vice
						versa.
					</li>
					<li>
						<strong>obscure = more points:</strong> you get more points for less
						commonly used words.
					</li>
				</ul>
			</li>
		</ul>

		<h3><span class="chunk combo-wod">rules</span></h3>
		<ul>
			<li>4+ letter words</li>
			<li>no proper nouns</li>
			<li>no hyphenated words</li>
			<li>no variations (e.g. plurals) of a played word</li>
		</ul>
		<p><button on:click={close}>CLOSE</button></p>
	</div>
</section>

<style>
	section {
		display: none;
		z-index: var(--z-overlay);
		background: var(--color-bg);
	}

	.visible {
		display: block;
	}

	h3 {
		margin-top: 32px;
	}

	h3 span {
		padding: 0 8px;
	}

	.clue {
		background-color: var(--color-white);
		border: 2px solid currentColor;
		padding: 0 8px;
	}

	li {
		line-height: 1.6;
	}

	p {
		margin-top: 32px;
	}

	button {
		font-size: var(--36px);
	}
</style>
