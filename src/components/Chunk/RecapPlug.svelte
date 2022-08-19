<script>
	import Chunk from "$components/helpers/Chunk.svelte";
	export let text;
</script>

<p id="chunk-recap-plug">
	<Chunk {text} max="15" className="combo-user" />
</p>
