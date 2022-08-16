<script>
	import { wordDuration } from "$stores/misc.js";
	export let points;
	export let name;
	export let y = 0;
	export let above;

	const gutterWidth = 36;

	$: wod = name !== "you";
	$: below = wod ? y < gutterWidth : y <= 0;
	$: bottom = `${wod && below ? 0 : y}px`;
	$: triple = points > 99;
</script>

<div
	class="wrapper"
	class:wod
	style="--delay: {$wordDuration}ms; --gutter-width: {gutterWidth}px;"
>
	<div
		class="pill combo-mark"
		style:bottom
		class:triple
		class:above
		class:below
	>
		<span class="points">{points}</span>
	</div>
	<p class="name">{name}</p>
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
		top: 50%;
		transform-origin: 0 50%;
		transform: rotate(-90deg) translate(-50%, calc(100% - 4px));
		text-align: center;
		text-transform: uppercase;
		font-size: var(--18px);
		font-weight: var(--bold);
		color: var(--color-bg-light-text);
	}

	.wod .name {
		transform: rotate(90deg) translate(-50%, calc(-100% + 4px));
	}

	.pill {
		position: absolute;
		left: 0;
		transform-origin: 0;
		transform: translate(0, 100%);
		width: calc(var(--gutter-width) - 8px);
		height: calc(var(--gutter-width) - 8px);
		white-space: nowrap;
		border-radius: calc(var(--gutter-width) - 8px);
		text-transform: uppercase;
		font-size: var(--14px);
		font-weight: var(--bold);
		padding: 0;
		margin: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: bottom 500ms var(--delay) ease-in-out;
		z-index: 1;
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

	.wod .pill.below {
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

	.wod .pill.below:after {
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
</style>
