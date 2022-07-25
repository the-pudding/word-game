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
	<div class="margin">
		<div class="progress" style:width />
	</div>
	<p><strong>{secondsLeft}</strong></p>
</div>

<style>
	div#play-clock {
		position: relative;
		width: 100%;
		margin: 4px 0;
		height: 2rem;
		border: 1px solid var(--color-fg);
		background-color: var(--color-white);
	}

	.margin {
		position: relative;
		width: calc(100% - 8px);
		height: 100%;
	}

	.progress {
		position: absolute;
		top: 4px;
		left: 4px;
		width: 100%;
		background: var(--color-red-100);
		height: calc(100% - 8px);
	}

	p {
		position: absolute;
		top: 2px;
		left: 8px;
		font-size: var(--18px);
		color: var(--color-red-700);
		opacity: 0;
	}
</style>
