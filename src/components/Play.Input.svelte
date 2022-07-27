<script>
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher();

	let inputEl;
	let value = "";

	const submit = () => {
		if (value) dispatch("submit", value);
		value = "";
	};

	const onKeydown = (e) => {
		if (e.detail === "Enter") submit();
		else if (e.detail === "Backspace")
			value = value.substring(0, value.length - 1);
		else value = `${value}${e.detail}`;
	};

	const onInput = (e) => {
		e.preventDefault();
		value = value.trim().toLowerCase();
		submit();
	};

	$: width = `${value.length * 20}}px`;
	onMount(() => {
		inputEl.focus();
	});
</script>

<div id="play-input">
	<form on:submit={onInput}>
		<div class="box">
			<div class="bg" aria-hidden="true">{value}</div>
			<input
				bind:value
				bind:this={inputEl}
				spellcheck="false"
				maxlength="15"
				placeholder="enter word"
			/>
			<button type="submit">&rarr;</button>
		</div>
	</form>
</div>

<style>
	#play-input {
		margin: 4px 0 0 0;
		user-select: none;
	}

	form {
		width: 100%;
		display: block;
		position: relative;
	}

	.box {
		background-color: var(--color-white);
		width: 100%;
		border: 1px solid var(--color-fg);
		padding: 8px;
		position: relative;
	}

	.bg {
		color: var(--color-user-bg);
		background-color: currentColor;
		position: absolute;
		top: 10px;
		left: 8px;
		padding: 8px;
		font-size: var(--24px);
		font-weight: var(--bold);
		line-height: 1;
	}

	.bg:empty {
		display: none;
	}

	input {
		background-color: transparent;
		outline: 2px solid transparent;
		border-radius: 0;
		font-size: var(--24px);
		border: none;
		position: relative;
		line-height: 1;
		font-weight: var(--bold);
		user-select: none;
		color: var(--color-user-fg);
	}

	input:focus {
		outline: 2px solid var(--color-focus);
	}

	button {
		position: absolute;
		top: 50%;
		right: 8px;
		transform: translate(0, -50%);
	}

	@media (hover: hover) and (pointer: fine) {
		div {
			display: block;
		}
	}
</style>
