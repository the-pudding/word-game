<script>
	export let points;
	export let name;
	export let y = 0;

	$: wod = name !== "you";
	$: bottom = `${y}px`;
	$: below = y <= 0;
	$: triple = points > 99;
</script>

<div class="wrapper" class:wod>
	<div class="pill combo-mark" style:bottom class:triple class:below>
		<span class="points">{points}</span>
	</div>
</div>

<style>
	.wrapper {
		--gutter-width: 36px;
		width: var(--gutter-width);
	}

	.wod {
		padding-left: 4px;
	}

	.pill {
		position: absolute;
		left: 0;
		transform-origin: 0;
		transform: translate(0, calc(100% + 2px));
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
	}

	span {
		vertical-align: middle;
		display: inline-block;
		line-height: 1;
	}
</style>
