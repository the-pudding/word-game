<script>
	import { onMount } from "svelte";
	import { timer, elapsed } from "$stores/timer.js";
	import { active } from "$stores/misc.js";

	const MS = 1000;
	const target = 6000 * MS;

	$: update($active);
	$: inverse = target - $elapsed;
	$: width = `${(inverse / target) * 100}%`;
	$: secondsLeft = Math.ceil((target - $elapsed) / MS);
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

<div id="play-clock">
	<div class="progress" style:width />
	<p><strong>{secondsLeft}</strong></p>
</div>

<style>
	div {
		position: relative;
		width: 100%;
	}

	.progress {
		position: absolute;
		top: 0;
		left: 0;
		background: var(--color-red-100);
		width: 100%;
		height: 2rem;
	}

	p {
		position: relative;
		line-height: 2rem;
		margin: 0;
		padding: 0 8px;
		font-size: var(--20px);
		color: var(--color-red-700);
	}
</style>
