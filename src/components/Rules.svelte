<script>
	import { overlay } from "$stores/misc.js";
	import focusTrap from "$actions/focusTrap.js";

	const close = () => {
		$overlay = undefined;
	};
	$: disable = $overlay !== "rules";
</script>

<section class:visible={$overlay === "rules"} use:focusTrap={{ disable }}>
	<div>
		<h3><span class="chunk combo-user">how to play</span></h3>
		<ul>
			<li>
				<h4 class="a"><span class="chunk combo-wod">goal</span></h4>
				<p>score more points than the stranger in four, one-minute rounds.</p>
			</li>
			<li>
				<h4 class="b"><span class="chunk combo-wod">gameplay</span></h4>
				<p>enter as many words as possible that satisfy a clue.</p>
				<details>
					<summary>more details</summary>
					<ul class="inner">
						<li>
							<h5><span class="chunk combo-default">sample clue</span></h5>
							<p>clue: <em class="clue">starts with <strong>a</strong></em></p>
							<p>
								answers: <em>apple</em>, <em>awesome</em>, <em>activate</em>,
								etc.
							</p>
						</li>
						<li>
							<h5><span class="chunk combo-default">blocking</span></h5>
							whoever gets a word first gets points. If the stranger enters the word
							before you, you get no points, and vice versa.
						</li>
						<li>
							<h5>
								<span class="chunk combo-default">obscure = more points</span>
							</h5>
							you get 2x points for less commonly used words.
						</li>
					</ul>
				</details>
			</li>
			<li>
				<h4 class="c"><span class="chunk combo-wod">other rules</span></h4>
				<p>
					no proper nouns, hyphenated words, or varations (e.g., plurals) of a
					played word.
				</p>
			</li>
		</ul>
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
		transform: rotate(1deg);
		text-align: center;
	}

	h4 {
		margin: 16px 0 8px 0;
	}

	h5 {
		margin: 16px 0 8px 0;
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
		/* margin: 16px auto; */
		line-height: 1.4;
	}

	p.close {
		margin-top: 32px;
		padding-top: 16px;
		border-top: 1px solid currentColor;
		text-align: center;
	}

	button {
		font-size: var(--32px);
	}

	summary {
		cursor: pointer;
	}
</style>
