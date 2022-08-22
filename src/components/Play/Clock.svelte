<script>
	import { timer, elapsed } from "$stores/timer.js";
	import { active, inModal } from "$stores/misc.js";

	const MS = 1000;
	const target = 6 * MS;

	$: update($active);
	$: inverse = target - $elapsed;
	$: width = `${(inverse / target) * 100}%`;
	$: secondsLeft = Math.ceil((target - $elapsed) / MS);
	$: if (secondsLeft <= 0) {
		$active = false;
		$inModal = true;
	}

	const update = (isActive) => {
		if (isActive) {
			timer.reset();
			timer.start();
		} else {
			timer.stop();
		}
	};
</script>

<div id="play-clock" class:in-modal={$inModal}>
	<div class="margin">
		<span class="progress combo-mark" style:width />
	</div>
	<!-- <p><strong>{secondsLeft}</strong></p> -->
</div>

<style>
	#play-clock {
		position: relative;
		width: 100%;
		margin: 4px 0;
		padding: 4px;
		height: 2rem;
		border: 1px solid var(--color-fg);
		background-color: var(--color-bg-binary);
	}

	#play-clock.in-modal {
		opacity: 0.1;
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
</style>
