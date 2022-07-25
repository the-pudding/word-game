<script>
	import { overlay } from "$stores/misc.js";

	const close = () => {
		$overlay = undefined;
	};
</script>

<section on:click={close} class:visible={$overlay === "rules"}>
	<div>
		<h3>How to Play</h3>
		<ul>
			<li>
				<strong>Goal:</strong> score more points than the Word Opponent of the Day
				(WOD).
			</li>
			<li><strong>Duration:</strong> Four one-minute rounds.</li>
			<li>
				<strong>Gameplay:</strong> Enter as many words as possible that satisfy
				a clue.
				<ul>
					<li>
						<strong>Sample clue</strong>:
						<em>words that start with <strong>A</strong></em>
						. Answers: <em>apple</em>, <em>awesome</em>, <em>activate</em>, etc.
					</li>
					<li>
						<strong>Blocking!</strong> Whoever gets a word first gets points. If
						the WOD entered the word before you, you get no points. If you enter
						a word before the WOD, she gets no points.
					</li>
					<li>
						<strong>The more obscure the better!</strong> You get more points for
						less commonly used words.
					</li>
				</ul>
			</li>
		</ul>

		<h3>Rules</h3>
		<ul>
			<li>4+ letter words</li>
			<li>No proper nouns</li>
			<li>No hyphenated words</li>
			<li>No variations (e.g. plurals) of a played word</li>
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
</style>
