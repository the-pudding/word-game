<script>
	import { timer, elapsed } from "$stores/timer.js";
	import { active, inModal, inCountdown } from "$stores/misc.js";
	import { createEventDispatcher } from "svelte";

	const MS = 1000;
	const target = 60 * MS;
	const WARNING_THRESHOLD = 5.1;
	const dispatch = createEventDispatcher();

	let warning = false;

	$: if ($inModal && !$active) timer.stop();
	$: if ($inCountdown) timer.reset();
	$: if ($active) timer.start();
	$: width = `${Math.max(0, (target - $elapsed) / target) * 100}%`;
	$: secondsLeft = Math.ceil((target - $elapsed) / MS);
	$: if ($elapsed >= target) {
		$active = false;
		$inModal = true;
	}
	$: warning = (target - $elapsed) / MS <= WARNING_THRESHOLD;
	$: if (warning) dispatch("beforeend");
</script>

<div id="play-clock" class:in-modal={$inModal}>
	<div class="margin">
		<span class="progress combo-mark" style:width />
	</div>
	{#if !$inModal}
		<p><strong>{secondsLeft}</strong></p>
	{/if}
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

	p {
		position: absolute;
		top: 50%;
		right: 8px;
		transform: translate(0, -50%);
		font-size: var(--14px);
		color: var(--color-mark-fg-dark);
	}
</style>
