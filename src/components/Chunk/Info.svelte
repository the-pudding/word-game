<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	import { wodInfo, gameId } from "$stores/misc.js";

	export let loaded;

	// const noGameText = "there is no active game right now. check back later!";
	const noGameText = "there is no active game right now. launching sep. 23!";
	const loadingText = "loading today's game...";

	$: pronounObject = $wodInfo ? $wodInfo.pronoun.split("/")[1] : undefined;
</script>

<p id="chunk-info">
	{#if loaded}
		{#if $gameId}
			<Chunk text="today that" className="combo-wod-light a" />
			<Chunk text="person is" className="combo-wod-light b" />
			<Chunk max="12" text={$wodInfo?.name} className="combo-wod c big" />
			<Chunk text="from" className="combo-wod-light d" />
			<Chunk
				max="12"
				text="{$wodInfo?.location}."
				className="combo-wod-light e"
			/>

			<span class="bio">
				<Chunk text="{$wodInfo?.bio}." max="12" className="combo-wod-light f" />
			</span>

			<Chunk text="can you" className="combo-wod-light g" />
			<Chunk text={`beat ${pronounObject}?`} className="combo-wod-light h" />
		{:else}
			<span class="no-game">
				<Chunk text={noGameText} max="12" className="combo-wod-light" />
			</span>
		{/if}
	{:else}
		<span class="loading">
			<Chunk text={loadingText} max="12" className="combo-wod-light" />
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
		/* animation: hinge 1s 2s alternate-reverse infinite; */
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
	/* todo target each .f and compound translate y */
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

	/* beat {pronoun} */
	:global(#chunk-info .h) {
		transform: translate(25%, -2px);
		z-index: 9;
	}

	/* loading */
	:global(#chunk-info .loading .chunk:nth-of-type(1)) {
		transform: translate(0%, 0);
		z-index: 8;
	}

	:global(#chunk-info .loading .chunk:nth-of-type(2)) {
		transform: translate(-10%, -2px);
		z-index: 7;
	}

	:global(#chunk-info .loading .chunk:nth-of-type(3)) {
		transform: translate(10%, -4px);
		z-index: 6;
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

	:global(#chunk-info .g) {
		display: inline-block;
	}

	:global(#chunk-info .h) {
		display: inline-block;
	}

	@keyframes hinge {
		0% {
			transform: rotate(4deg);
		}

		100% {
			transform: rotate(-2deg);
		}
	}
	@media only screen and (min-height: 600px) {
		:global(#chunk-info .g) {
			display: inline-block;
		}

		:global(#chunk-info .h) {
			display: inline-block;
		}
	}
</style>
