<script>
	import { timer, elapsed } from "$stores/timer.js";
	import { active, inModal } from "$stores/misc.js";

	const MS = 1000;
	const target = 60 * MS;

	$: update($active);
	$: inverse = target - $elapsed;
	$: width = `${(inverse / target) * 100}%`;
	$: secondsLeft = Math.ceil((target - $elapsed) / MS);
	$: if (secondsLeft <= 0) {
		$active = false;
		$inModal = true;
	}

	const update = (isActive) => {
		if (isActive) timer.start();
		else {
			timer.stop();
			timer.reset();
		}
	};
</script>

<div id="play-clock">
	<div class="margin">
		<span class="progress combo-mark" style:width />
	</div>
	<!-- <p><strong>{secondsLeft}</strong></p> -->
</div>

<style>
	div#play-clock {
		position: relative;
		width: 100%;
		margin: 4px 0;
		padding: 4px;
		height: 2rem;
		border: 1px solid var(--color-fg);
		background-color: var(--color-bg-binary);
	}

	.margin {
		position: relative;
		display: flex;
		justify-content: flex-end;
		width: 100%;
		height: 100%;
	}

	.progress {
		display: block;
		width: 100%;
		height: 100%;
	}

	/* p {
		position: absolute;
		top: 2px;
		left: 8px;
		font-size: var(--18px);
		opacity: 0;
	} */
</style>
