<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	import { wodInfo, gameId } from "$stores/misc.js";

	export let loaded;

	const noGameText =
		"there is no active game right now. check back later or sign up below to get notified.";
	const loadingText = "loading today's game...";

	$: pronounObject = $wodInfo ? $wodInfo.pronoun.split("/")[1] : undefined;
</script>

<p id="chunk-bio">
	{#if loaded}
		<Chunk text="today that" className="combo-wod a" />
		<Chunk text="person is" className="combo-wod b" />
		<Chunk max="12" text={$wodInfo?.name} className="combo-wod c big" />
		<Chunk text="from" className="combo-wod d" />
		<Chunk max="12" text="{$wodInfo?.location}." className="combo-wod e" />
		<Chunk text="{$wodInfo?.bio}." max="12" className="combo-wod f" />
		<Chunk text="can you" className="combo-wod g" />
		<Chunk text={`beat ${pronounObject}?`} className="combo-wod h" />
	{:else if !$gameId}
		<Chunk text={noGameText} max="12" className="combo-wod i" />
	{:else}
		<Chunk text={loadingText} max="12" className="combo-wod j" />
	{/if}
</p>

<style>
	p {
		width: 150px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	:global(#chunk-bio .big) {
		font-size: 1.5em;
		font-weight: var(--bold);
	}

	/* today that */
	:global(#chunk-bio .a) {
		transform: translate(-10%, 0);
	}

	/* person is */
	:global(#chunk-bio .b) {
		transform: translate(0, -2px);
	}

	/* {name} */
	:global(#chunk-bio .c) {
		margin-top: 4px;
		/* margin-bottom: 8px; */
		transform: rotate(-5deg);
	}

	/* from */
	:global(#chunk-bio .d) {
	}

	/* {location} */
	:global(#chunk-bio .e) {
		transform: translate(0, -2px);
		margin-bottom: 6px;
	}

	/* {bio} */
	/* todo target each .f and compound translate y */
	:global(#chunk-bio .f) {
		transform: translate(0, -2px);
	}

	/* can you */
	:global(#chunk-bio .g) {
		margin-top: 4px;
	}

	/* beat {pronoun} */
	:global(#chunk-bio .h) {
		transform: translate(25%, -2px);
	}

	/* no game */
	:global(#chunk-bio .i) {
	}

	/* loading */
	:global(#chunk-bio .j) {
	}
</style>
