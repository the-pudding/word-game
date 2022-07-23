<script>
	import { onMount } from "svelte";
	import { timer, elapsed } from "$stores/timer.js";
	import { active } from "$stores/misc.js";

	const MS = 1000;
	const target = 60 * MS;

	$: update($active);
	$: secondsLeft = Math.floor((target - $elapsed) / MS);
	$: if (secondsLeft <= 0) $active = false;

	const update = (isActive) => {
		if (isActive) {
			timer.start();
		} else {
			timer.stop();
			timer.reset();
		}
	};
</script>

<p>{secondsLeft}</p>

<style>
	p {
		font-size: 2em;
		text-align: center;
	}
	@media (min-width: 768px) {
		p {
			position: absolute;
			top: 0;
			left: 0;
			font-size: 4em;
			margin: 0;
			padding: 0;
			line-height: 1;
		}
	}
</style>
