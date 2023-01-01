<script>
	import { allGames, overlay } from "$stores/misc.js";
	import focusTrap from "$actions/focusTrap.js";

	const close = () => {
		$overlay = undefined;
	};

	const onClick = (id) => {
		window.location.replace(`${window.location.href}?override=${id}`);
	};

	$: disable = $overlay !== "archive";
</script>

<section class:visible={$overlay === "archive"} use:focusTrap={{ disable }}>
	<div>
		<h3><span class="chunk combo-user">games archive</span></h3>
		<p>select a game below to play.</p>

		<ul>
			{#each $allGames as { id, gameIndex, name, location, difficulty }}
				<li class="game">
					<span class="difficulty {difficulty}">{difficulty}</span>
					<button on:click={() => onClick(id)}
						>{name} <span>#{gameIndex}</span></button
					>
					<span class="location">{location ? `from ${location}` : ""}</span>
				</li>
			{/each}
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
		max-width: 100%;
	}

	section > div {
		max-width: 40rem;
		margin: 0 auto;
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

	ul {
		padding: 0;
		margin-top: 16px;
		/* display: flex; */
		/* flex-wrap: wrap; */
	}

	ul.inner {
		padding-left: 16px;
	}

	.game {
		line-height: 1.4;
		list-style: none;
		margin-bottom: 16px;
		/* margin-right: 8px; */
	}

	.game button {
		color: var(--color-white-100);
	}

	.game button span {
		color: var(--color-white-500);
	}

	.game .location {
		margin-left: 8px;
	}

	.game .difficulty {
		display: inline-block;
		margin-right: 8px;
		width: 5em;
		font-size: var(--12px);
		text-align: center;
		padding: 4px;
	}

	:global(.game .difficulty.easy) {
		background: var(--color-wod-bg);
		color: var(--color-wod-fg);
	}

	:global(.game .difficulty.medium) {
		background: var(--color-user-bg);
		color: var(--color-user-fg);
	}

	:global(.game .difficulty.hard) {
		background: var(--color-mark-bg);
		color: var(--color-mark-fg);
	}

	p {
		/* margin: 16px auto; */
		line-height: 1.4;
		text-align: center;
	}

	p.close {
		margin-top: 32px;
		padding-top: 16px;
		margin-bottom: 16px;
		border-top: 1px solid currentColor;
		text-align: center;
	}

	.close button {
		font-size: var(--32px);
	}
</style>
