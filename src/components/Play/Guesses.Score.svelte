<script>
	import { inModal, wordDuration } from "$stores/misc.js";
	export let points;
	export let name;
	export let y = 0;
	export let above;
	export let flipName;

	const gutterWidth = 36;

	$: wod = name !== "you";
	$: below = wod ? y <= gutterWidth : y <= 0;
	$: hasArrowBelow = wod && below && points > 1;
	$: bottom = `${wod && below ? 0 : y}px`;
	$: triple = points > 99;
</script>

<div
	class="wrapper"
	class:wod
	style="--delay: {$wordDuration}ms; --gutter-width: {gutterWidth}px;"
	class:in-modal={$inModal}
>
	<div
		class="pill"
		style:bottom
		class:triple
		class:above
		class:below
		class:hasArrowBelow
	>
		<p class="name" class:flip={flipName}>{name}</p>
		<span class="circle combo-mark" />
		<span class="points combo-mark">{points}</span>
	</div>
</div>

<style>
	.wrapper {
		width: var(--gutter-width);
	}

	.wod {
		padding-left: 4px;
	}

	.name {
		position: absolute;
		top: 4px;
		left: 50%;
		padding-left: 24px;
		transform-origin: 0 50%;
		transform: rotate(-90deg);
		font-size: var(--18px);
		font-weight: var(--bold);
		color: var(--color-fg-light);
		transition: transform 2500ms;
		z-index: 0;
	}

	.wod .name {
		padding-right: 24px;
		transform: rotate(90deg) translate(-100%, 0);
	}

	.name.flip {
		transform: rotate(-90deg) translate(calc(-100% - 24px), 0);
	}

	.wod .name.flip {
		transform: rotate(90deg) translate(0, 0);
	}

	.pill {
		position: absolute;
		left: 0;
		transform-origin: 0;
		transform: translate(0, 100%);
		width: calc(var(--gutter-width) - 8px);
		height: calc(var(--gutter-width) - 8px);
		white-space: nowrap;
		font-size: var(--14px);
		font-weight: var(--bold);
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: bottom 500ms var(--delay) ease-in-out;
	}

	.circle {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: calc(var(--gutter-width) - 8px);
		display: block;
	}

	.points {
		position: relative;
		display: inline-block;
	}

	.pill.below {
		transform: translate(0, 0);
	}

	.pill.triple {
		font-size: var(--12px);
	}

	.wod .pill {
		left: auto;
		right: 0;
		transition: bottom 500ms ease-in-out;
	}

	.wod .pill.above {
		transform: translate(0, 170%);
	}

	.wod .pill.hasArrowBelow {
		transform: translate(0, -75%);
	}

	.wod .pill.above:before {
		display: block;
		content: "▴";
		font-size: 2rem;
		line-height: 1;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -100%);
		color: var(--color-mark-bg);
	}

	.wod .pill.hasArrowBelow:after {
		display: block;
		content: "▾";
		font-size: 2rem;
		line-height: 1;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, 75%);
		color: var(--color-mark-bg);
	}

	span {
		vertical-align: middle;
		display: inline-block;
		line-height: 1;
	}

	.in-modal .pill {
		opacity: 0.5;
	}

	.in-modal .name {
		opacity: 0.5;
	}
</style>
