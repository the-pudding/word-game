<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	import { wodInfo, gameId } from "$stores/misc.js";

	export let loaded;

	// const noGameText = "there is no active game right now. check back later!";
	const noGameText = "there is no active game right now. launching sep. 23!";

	$: pronounObject = $wodInfo ? $wodInfo.pronoun.split("/")[1] : undefined;
	$: noLocation = !$wodInfo?.location;
	$: noBio = !$wodInfo?.bio;
	$: bumpBio = noBio && noLocation ? "bump" : "";
</script>

<p id="chunk-info">
	{#if loaded}
		{#if $gameId}
			<Chunk text="today that" className="combo-wod-light a" />
			<Chunk text="person is" className="combo-wod-light b" />
			<Chunk max="12" text={$wodInfo?.name} className="combo-wod c big" />
			{#if $wodInfo?.location}
				<Chunk text={"from"} className="combo-wod-light d" />
				<Chunk
					max="13"
					text="{$wodInfo?.location}."
					className="combo-wod-light e"
				/>
			{/if}

			{#if $wodInfo?.bio}
				<span class="bio" class:bump={noLocation}>
					<Chunk
						text="{$wodInfo?.bio}{$wodInfo?.bio ? '.' : ''}"
						max="12"
						className="combo-wod-light f"
					/>
				</span>
			{/if}

			<span class="beat" class:force-display={noBio || noLocation}>
				<Chunk text="can you" className="combo-wod-light g {bumpBio}" />
				<Chunk text={`beat ${pronounObject}?`} className="combo-wod-light h" />
			</span>
		{:else}
			<span class="no-game">
				<Chunk text={noGameText} max="12" className="combo-wod-light" />
			</span>
		{/if}
	{:else}
		<span class="loading loading-a">
			<Chunk text="loading today's" max="12" className="combo-wod-light" />
		</span>
		<span class="loading loading-b">
			<Chunk text="game" max="1" className="combo-wod-light" />
			<Chunk text="." max="1" className="combo-wod-light" />
			<Chunk text="." max="1" className="combo-wod-light" />
			<Chunk text="." max="1" className="combo-wod-light" />
		</span>
	{/if}
</p>

<style>
	p {
		width: 150px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	span {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
	}

	/* today that */
	:global(#chunk-info .a) {
		transform: translate(-10%, 0);
		z-index: 21;
	}

	/* person is */
	:global(#chunk-info .b) {
		transform: translate(0, -2px);
		z-index: 20;
	}

	/* {name} */
	:global(#chunk-info .c) {
		font-size: 1.5em;
		font-weight: var(--bold);
		margin-top: 6px;
		transform: rotate(4deg);
		z-index: 19;
	}

	/* from */
	:global(#chunk-info .d) {
		margin-top: 6px;
		z-index: 18;
	}

	/* {location} */
	:global(#chunk-info .e) {
		transform: translate(0, -2px);
		margin-bottom: 8px;
		z-index: 17;
	}

	/* {bio} */
	.bio {
		display: none;
	}

	.bio.bump {
		margin-top: 12px;
	}

	:global(#chunk-info .f:nth-of-type(1)) {
		transform: translate(10%, -2px);
		z-index: 16;
	}

	:global(#chunk-info .f:nth-of-type(2)) {
		transform: translate(15%, -4px);
		z-index: 15;
	}

	:global(#chunk-info .f:nth-of-type(3)) {
		transform: translate(-5%, -6px);
		z-index: 14;
	}

	:global(#chunk-info .f:nth-of-type(4)) {
		transform: translate(0, -8px);
		z-index: 13;
	}

	:global(#chunk-info .f:nth-of-type(5)) {
		transform: translate(-10%, -10px);
		z-index: 12;
	}

	:global(#chunk-info .f:nth-of-type(6)) {
		transform: translate(0, -12px);
		z-index: 11;
	}

	/* can you */
	:global(#chunk-info .g) {
		margin-top: 4px;
		z-index: 10;
	}

	:global(#chunk-info .g.bump) {
		margin-top: 12px;
	}

	/* beat {pronoun} */
	:global(#chunk-info .h) {
		transform: translate(25%, -2px);
		z-index: 9;
	}

	/* loading */
	:global(#chunk-info .loading-a .chunk:nth-of-type(1)) {
		transform: translate(0%, 0);
		z-index: 8;
	}

	:global(#chunk-info .loading-a .chunk:nth-of-type(2)) {
		transform: translate(-10%, -2px);
		z-index: 7;
	}

	:global(#chunk-info .loading-b) {
		flex-direction: row;
		margin-top: 4px;
		transform: translate(10%, 0);
		/* justify-content: center; */
	}

	:global(#chunk-info .loading-b .chunk:nth-of-type(1)) {
		transform: translate(0, 0);
		z-index: 6;
	}

	:global(#chunk-info .loading-b .chunk:nth-of-type(2)) {
		--x: -2px;
		transform: translate(-2px, 0);
		z-index: 6;
		animation: wave 0.6s 0s ease-in-out infinite alternate-reverse;
	}

	:global(#chunk-info .loading-b .chunk:nth-of-type(3)) {
		--x: -4px;
		transform: translate(-4px, 0);
		z-index: 6;
		animation: wave 0.6s 0.2s ease-in-out infinite alternate-reverse;
	}

	:global(#chunk-info .loading-b .chunk:nth-of-type(4)) {
		--x: -6px;
		transform: translate(-6px, 0);
		z-index: 6;
		animation: wave 0.6s 0.4s ease-in-out infinite alternate-reverse;
	}

	/* no game */
	:global(#chunk-info .no-game .chunk:nth-of-type(1)) {
		transform: translate(-15%, 0);
		z-index: 5;
	}
	:global(#chunk-info .no-game .chunk:nth-of-type(2)) {
		transform: translate(0, -2px);
		z-index: 4;
	}
	:global(#chunk-info .no-game .chunk:nth-of-type(3)) {
		transform: translate(-15%, -4px);
		margin-bottom: 8px;
		z-index: 3;
	}
	:global(#chunk-info .no-game .chunk:nth-of-type(4)) {
		transform: translate(0, -6px);
		z-index: 2;
	}
	:global(#chunk-info .no-game .chunk:nth-of-type(5)) {
		transform: translate(-20%, -6px) rotate(8deg);
		z-index: 1;
	}

	.beat.force-display {
		display: inline-block;
	}

	@media (min-height: 640px) {
		.bio {
			display: inline-block;
		}
	}

	@keyframes wave {
		0% {
			transform: translate(var(--x), 0);
		}

		100% {
			transform: translate(var(--x), -4px);
		}
	}
</style>
