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

	onMount(() => {
		inputEl.focus();
	});
</script>

<div id="play-input">
	<form on:submit={onInput}>
		<input maxlength="15" bind:value bind:this={inputEl} />
		<button type="submit">&rarr;</button>
	</form>
</div>

<style>
	div {
		margin: 4px 0 0 0;
	}

	form {
		width: 100%;
		display: block;
		position: relative;
		/* display: flex; */
	}

	input {
		background-color: var(--color-white);
		outline: 2px solid transparent;
		border: 1px solid var(--color-fg);
		flex: 1;
		width: 100%;
		border-radius: 0;
		font-size: var(--24px);
	}

	input:focus {
		outline: 2px solid var(--color-focus);
	}

	button {
		position: absolute;
		top: 50%;
		right: 8px;
		transform: translate(0, -50%);
		padding: 4px;
	}

	@media (hover: hover) and (pointer: fine) {
		div {
			display: block;
		}
	}
</style>
