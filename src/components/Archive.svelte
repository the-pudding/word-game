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
			{#each $allGames as { id, gameIndex, name, location }}
				<li class="game">
					<button on:click={() => onClick(id)}
						>#{gameIndex} {name} {location ? `from ${location}` : ""}</button
					>
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
	}

	ul.inner {
		padding-left: 16px;
	}

	li {
		line-height: 1.4;
		list-style: none;
		margin-bottom: 8px;
	}

	p {
		/* margin: 16px auto; */
		line-height: 1.4;
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
