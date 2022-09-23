<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	import { wodInfo } from "$stores/misc.js";
	export let text;

	$: plug = $wodInfo?.name ? `${$wodInfo?.name} says:` : "shameless plug:";
</script>

<p id="chunk-recap-plug">
	<Chunk className="combo-user" text={plug} />
	<Chunk {text} max="28" className="combo-wod" />
</p>

<style>
	p {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 32px;
	}

	:global(#chunk-recap-plug .chunk:nth-of-type(1)) {
		transform: translate(-75%, 0) rotate(-5deg);
		z-index: 3;
	}

	:global(#chunk-recap-plug .chunk:nth-of-type(2)) {
		font-size: var(--24px);
		transform: translate(0, -4px);
		z-index: 2;
	}

	:global(#chunk-recap-plug .chunk:nth-of-type(3)) {
		font-size: var(--24px);
		transform: translate(5%, -6px);
		z-index: 1;
	}
</style>
