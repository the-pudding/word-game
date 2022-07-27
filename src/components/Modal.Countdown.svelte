<script>
	import { tweened } from "svelte/motion";
	import { onMount, createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	const start = 1;
	const end = -1;
	const duration = start * 1000;
	const countdown = tweened(start, { duration });

	$: display = $countdown < 0 ? "Begin!" : Math.floor($countdown) + 1;

	countdown.set(end).then(() => {
		dispatch("end");
	});
</script>

<p>{display}</p>

<style>
	p {
		text-align: center;
		font-size: 3em;
	}
</style>
