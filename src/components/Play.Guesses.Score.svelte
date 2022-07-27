<script>
	export let points;
	export let name;
	export let offset;

	$: wod = name !== "you";
</script>

<div class="wrapper" class:wod>
	<div class="pill combo-mark">
		<span class="name">{name}:</span>
		<span class="points">{points}</span>
	</div>
</div>

<style>
	.wrapper {
		--gutter-width: 28px;
		width: var(--gutter-width);
	}

	.wod {
		padding-left: 4px;
	}

	.pill {
		transform-origin: 0 0;
		transform: rotate(-90deg) translate(-100%, 0);
		width: fit-content;
		white-space: nowrap;
		height: calc(var(--gutter-width) - 4px);
		border-radius: calc(var(--gutter-width) - 4px);
		text-transform: uppercase;
		font-size: var(--14px);
		font-weight: var(--bold);
		padding: 0 8px;
	}

	span {
		vertical-align: middle;
		display: inline-block;
		white-space: nowrap;
		line-height: 1;
	}
</style>
